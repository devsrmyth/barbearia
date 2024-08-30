import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import FormGroup from 'react-bootstrap/FormGroup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import styles from './Listagem.module.css';

import dayjs from 'dayjs';
import { format } from 'date-fns';
import { formatToBRL } from 'brazilian-values';

interface ICustomer {
    name: string;
}

interface IService {
    id: string;
    customer: ICustomer;
    value: number;
    type: string[];
    payment: string[];
    date: Date;
}

const convertBRLToUSD = async (amountInBRL: number): Promise<number | null> => {
    const BASE_URL = 'https://open.er-api.com/v6/latest/USD';

    try {
        const response = await fetch(BASE_URL);
        const data = await response.json();

        if (data.rates && data.rates.BRL) {
            const conversionRate = data.rates.BRL;
            return amountInBRL / conversionRate;
        } else {
            console.error('Error fetching conversion rate:', data);
            return null;
        }
    } catch (error) {
        console.error('Error fetching conversion rate:', error);
        return null;
    }
};

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export const RelatorioServico = () => {
    const [searchCustomerName, setSearchCustomerName] = useState('');
    const [services, setServices] = useState<IService[]>([]);
    const [total, setTotal] = useState(0);
    const [convertedValue, setConvertedValue] = useState<number | null>(null);
    const [rate, setRate] = useState<number | null>(null);

    const today = new Date();
    const end = new Date();
    today.setDate(today.getDate() - 7);
    end.setDate(end.getDate() + 1);
    const formattedDateToday = format(today, 'yyyy-MM-dd');
    const formattedDateEnd = format(end, 'yyyy-MM-dd');

    const [dataInicio, setDataInicio] = useState(formattedDateToday);
    const [dataFim, setDataFim] = useState(formattedDateEnd);

    const handleOnChangeSearchCustomerName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchCustomerName(e.target.value);
    };

    const handleOnChangeDataInicio = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDataInicio(e.target.value);
    };

    const handleOnChangeDataFim = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDataFim(e.target.value);
    };

    useEffect(() => {
        const fetchRate = async () => {
            const currentRate = await convertBRLToUSD(1);
            if (currentRate !== null) {
                setRate(currentRate);
            }
        };
        fetchRate();
    }, []);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch(`${apiUrl}/service?customerName=${searchCustomerName}&start=${dataInicio}&end=${dataFim}`);
                const data = await response.json();
                setServices(data);
                setTotal(data.reduce((sum: number, service: IService) => sum + service.value, 0));
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };
        fetchServices();
    }, [searchCustomerName, dataInicio, dataFim]);

    useEffect(() => {
        if (rate !== null) {
            setConvertedValue(total * rate);
        }
    }, [total, rate]);

    const objStrToStr = (s: string, v: string[]) => {
        return s.replaceAll('"', '').replace('{', '').replace('}', '').split(',').join(', ');
    };

    return (
        <div className={styles.table}>
            <FormGroup>
                <h4>Busca por nome Cliente junto com data Serviço</h4>
                <FloatingLabel controlId="floatingInput" label="Filtragem pelo nome Cliente" className="mb-3">
                    <Form.Control
                        type="text"
                        value={searchCustomerName}
                        onChange={handleOnChangeSearchCustomerName}
                        aria-label="Filtragem pelo nome do cliente"
                    />
                </FloatingLabel>

                <FloatingLabel controlId="floatingInput" label="De" className="mb-3">
                    <Form.Control
                        type="date"
                        value={dataInicio}
                        onChange={handleOnChangeDataInicio}
                        aria-label="Data de início"
                    />
                </FloatingLabel>

                <FloatingLabel controlId="floatingInput" label="Até" className="mb-3">
                    <Form.Control
                        type="date"
                        value={dataFim}
                        onChange={handleOnChangeDataFim}
                        aria-label="Data de fim"
                    />
                </FloatingLabel>
            </FormGroup>
            <Table striped bordered hover aria-label="Relatório de serviços">
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Tipos</th>
                        <th>Forma Pagamento</th>
                        <th>Valor</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {services.length > 0 ? (
                        services.map((s: IService) => (
                            <tr key={s.id}>
                                <td>{s.customer.name}</td>
                                <td>{objStrToStr(s.type.toString(), [])}</td>
                                <td>{objStrToStr(s.payment.toString(), [])}</td>
                                <td>{formatToBRL(s.value)}</td>
                                <td>{dayjs(s.date).format('DD/MM/YYYY')}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="text-center">
                                Nenhum serviço encontrado.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <Navbar expand="lg" variant="dark" bg="dark" fixed="bottom" aria-label="Resumo de serviços">
                <Container>
                    <Navbar.Brand>Total gasto por determinado(s) cliente(s):</Navbar.Brand>
                    <div className={styles.botoes}>
                        <h3>
                            <Badge pill bg="success">
                                Total gasto: {formatToBRL(total)}
                            </Badge>
                            <Badge pill bg="dark">
                                em dólar: {convertedValue !== null ? `$${convertedValue.toFixed(2)}` : 'Carregando...'}
                            </Badge>
                        </h3>
                    </div>
                </Container>
            </Navbar>
        </div>
    );
};
