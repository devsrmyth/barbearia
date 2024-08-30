import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FormGroup from 'react-bootstrap/FormGroup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

import styles from './Listagem.module.css';

import { GrEdit } from 'react-icons/gr';
import { AiTwotoneDelete } from 'react-icons/ai';
import dayjs from 'dayjs';
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

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export const ListagemServico = () => {
    const [showDelete, setShowDelete] = useState(false);
    const [searchCustomerName, setSearchCustomerName] = useState('');
    const [services, setServices] = useState<IService[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleClose = () => {
        setShowDelete(false);
    };

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch(`${apiUrl}/service/${searchCustomerName}`);
                if (!response.ok) throw new Error('Erro ao buscar serviços');
                const data = await response.json();
                setServices(data);
            } catch (error) {
                setError('Ocorreu um erro ao buscar os serviços.');
            }
        };
        fetchServices();
    }, [searchCustomerName]);

    const handleOnChangeSearchTypeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchCustomerName(e.target.value);
    };

    const handleOnClickDelete = async (id: string) => {
        try {
            const response = await fetch(`${apiUrl}/service/delete/${id}`, { method: 'DELETE' });
            if (response.ok) {
                setShowDelete(true);
                setServices((prevServices) => prevServices.filter(service => service.id !== id));
            } else {
                throw new Error('Erro ao excluir serviço');
            }
        } catch (error) {
            setError('Ocorreu um erro ao excluir o serviço.');
        }
    };

    return (
        <div className={styles.table}>
            {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}
            <Modal show={showDelete} onHide={handleClose} aria-labelledby="delete-modal-title">
                <Modal.Header closeButton>
                    <Modal.Title id="delete-modal-title">Serviço excluído com sucesso!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Serviço foi removido da base de dados.</Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleClose} aria-label="Concluir exclusão">
                        Concluir
                    </Button>
                </Modal.Footer>
            </Modal>
            <FormGroup>
                <h4>Busca por nome Cliente</h4>
                <FloatingLabel controlId="floatingInput" label="Filtragem pelo nome Cliente" className="mb-3">
                    <Form.Control
                        type="text"
                        value={searchCustomerName}
                        onChange={handleOnChangeSearchTypeTitle}
                        placeholder="Digite o nome do cliente"
                        aria-label="Filtrar serviços por nome do cliente"
                    />
                </FloatingLabel>
            </FormGroup>
            <Table striped bordered hover aria-label="Lista de serviços">
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Tipos</th>
                        <th>Forma de Pagamento</th>
                        <th>Valor</th>
                        <th>Data</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {services.length > 0 ? (
                        services.map((s: IService) => (
                            <tr key={s.id}>
                                <td>{s.customer.name}</td>
                                <td>{s.type.join(', ')}</td>
                                <td>{s.payment.join(', ')}</td>
                                <td>{formatToBRL(s.value)}</td>
                                <td>{dayjs(s.date).format('DD/MM/YYYY')}</td>
                                <td>
                                    <div className={styles.icones}>
                                        <Button href={`editar_servico?id=${s.id}`} variant="warning" aria-label={`Editar serviço de ${s.customer.name}`}>
                                            Editar <GrEdit size={20} />
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={() => handleOnClickDelete(s.id)}
                                            aria-label={`Excluir serviço de ${s.customer.name}`}
                                        >
                                            Excluir <AiTwotoneDelete size={20} />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="text-center">Nenhum serviço encontrado.</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
};
