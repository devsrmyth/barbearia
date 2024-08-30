import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import FormGroup from 'react-bootstrap/FormGroup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import Alert from 'react-bootstrap/Alert';

import styles from './Listagem.module.css';

import dayjs from 'dayjs';
import { format } from 'date-fns';
import { formatToBRL } from 'brazilian-values';

interface IRegister {
    id: string;
    isIncoming: boolean;
    description: string;
    value: number;
    date: Date;
}

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export const RelatorioRegistro = () => {
    const [registers, setRegisters] = useState<IRegister[]>([]);
    const [dataInicio, setDataInicio] = useState(() => format(dayjs().subtract(2, 'day').toDate(), 'yyyy-MM-dd'));
    const [dataFim, setDataFim] = useState(() => format(dayjs().add(1, 'day').toDate(), 'yyyy-MM-dd'));
    const [totalSaida, setTotalSaida] = useState(0);
    const [totalEntrada, setTotalEntrada] = useState(0);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRegisters = async () => {
            try {
                const response = await fetch(`${apiUrl}/register/${dataInicio}/${dataFim}`);
                if (!response.ok) throw new Error('Erro ao buscar registros');
                const data = await response.json();
                setRegisters(data);
                setTotalSaida(data.filter((r: IRegister) => !r.isIncoming).reduce((sum: number, v: IRegister) => sum + Number(v.value), 0));
                setTotalEntrada(data.filter((r: IRegister) => r.isIncoming).reduce((sum: number, v: IRegister) => sum + Number(v.value), 0));
            } catch (error) {
                setError('Ocorreu um erro ao buscar os registros.');
            }
        };
        fetchRegisters();
    }, [dataInicio, dataFim]);

    const handleOnChangeDataInicio = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDataInicio(e.target.value);
    };

    const handleOnChangeDataFim = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDataFim(e.target.value);
    };

    const badgeIsEntrada = (isIncoming: boolean) => isIncoming ? 'success' : 'danger';

    return (
        <div className={styles.table}>
            {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}
            <FormGroup>
                <h4>Busca por intervalo de Data</h4>
                <FloatingLabel controlId="dataInicioInput" label="De" className="mb-3">
                    <Form.Control
                        type="date"
                        value={dataInicio}
                        onChange={handleOnChangeDataInicio}
                        aria-label="Data de início"
                    />
                </FloatingLabel>

                <FloatingLabel controlId="dataFimInput" label="Até" className="mb-3">
                    <Form.Control
                        type="date"
                        value={dataFim}
                        onChange={handleOnChangeDataFim}
                        aria-label="Data de fim"
                    />
                </FloatingLabel>
            </FormGroup>
            <Table striped bordered hover aria-label="Relatório de registros financeiros">
                <thead>
                    <tr>
                        <th>Categoria</th>
                        <th>Valor</th>
                        <th>Descrição</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {registers.length > 0 ? (
                        registers.map((r: IRegister) => (
                            <tr key={r.id}>
                                <td><Badge pill bg={badgeIsEntrada(r.isIncoming)}>{r.isIncoming ? "Entrada" : "Saída"}</Badge></td>
                                <td>{formatToBRL(r.value)}</td>
                                <td>{r.description}</td>
                                <td>{dayjs(r.date).format('DD/MM/YYYY')}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="text-center">Nenhum registro encontrado.</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <Navbar expand="lg" variant="dark" bg="dark" fixed="bottom" aria-label="Resumo financeiro">
                <Container>
                    <Navbar.Brand href="#">
                        Total registrado de Entradas/Saídas entre {dayjs(dataInicio).format('DD/MM/YYYY')} e {dayjs(dataFim).format('DD/MM/YYYY')}:
                    </Navbar.Brand>
                    <div className={styles.botoes}>
                        <h5>
                            <Badge pill bg="success">
                                Total Entrada: {formatToBRL(totalEntrada)}
                            </Badge>
                        </h5>
                        <h5>
                            <Badge pill bg="danger">
                                Total Saída: {formatToBRL(totalSaida)}
                            </Badge>
                        </h5>
                        <h3>
                            <Badge pill bg="secondary">
                                Total: {formatToBRL(totalEntrada - totalSaida)}
                            </Badge>
                        </h3>
                    </div>
                </Container>
            </Navbar>
        </div>
    );
};
