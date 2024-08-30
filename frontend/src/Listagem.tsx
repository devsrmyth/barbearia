import dayjs from 'dayjs';
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

interface ICustomer {
    id: string;
    name: string;
    phone: string;
    birth: Date;
}

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export const Listagem = () => {
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [searchCustomerName, setSearchCustomerName] = useState('');
    const [customers, setCustomers] = useState<ICustomer[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleClose = () => {
        setShow(false);
        setShowDelete(false);
    };

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetch(`${apiUrl}/customer/${searchCustomerName}`);
                if (!response.ok) throw new Error('Erro ao buscar clientes');
                const data = await response.json();
                setCustomers(data);
            } catch (error) {
                setError('Ocorreu um erro ao buscar os clientes.');
            }
        };
        fetchCustomers();
    }, [searchCustomerName]);

    const handleOnChangeSearchCustomerName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchCustomerName(e.target.value);
    };

    const handleOnClickDelete = async (id: string) => {
        try {
            const response = await fetch(`${apiUrl}/customer/delete/${id}`, { method: 'DELETE' });
            if (response.status === 200) {
                setShowDelete(true);
                const updatedCustomers = customers.filter(customer => customer.id !== id);
                setCustomers(updatedCustomers);
            } else {
                throw new Error('Erro ao excluir cliente');
            }
        } catch (error) {
            setError('Ocorreu um erro ao excluir o cliente.');
        }
    };

    return (
        <div className={styles.table}>
            {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}
            <Modal show={showDelete} onHide={handleClose} aria-labelledby="delete-modal-title">
                <Modal.Header closeButton>
                    <Modal.Title id="delete-modal-title">Cliente excluído com sucesso!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Cliente foi removido da base de dados.</Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleClose} aria-label="Concluir exclusão">
                        Concluir
                    </Button>
                </Modal.Footer>
            </Modal>
            <FormGroup>
                <h4>Nome do Cliente</h4>
                <FloatingLabel controlId="floatingInput" label="Filtragem pelo nome" className="mb-3">
                    <Form.Control
                        type="text"
                        value={searchCustomerName}
                        onChange={handleOnChangeSearchCustomerName}
                        placeholder="Digite o nome do cliente"
                        aria-label="Filtrar clientes por nome"
                    />
                </FloatingLabel>
            </FormGroup>
            <Table striped bordered hover aria-label="Lista de clientes">
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Data de Nascimento</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.length > 0 ? (
                        customers.map((customer) => (
                            <tr key={customer.id}>
                                <td>{customer.name}</td>
                                <td>{dayjs(customer.birth).format('DD/MM/YYYY')}</td>
                                <td>
                                    <div className={styles.icones}>
                                        <Button href={`editar_cliente?id=${customer.id}`} variant="warning" aria-label={`Editar cliente ${customer.name}`}>
                                            Editar <GrEdit size={20} />
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={() => handleOnClickDelete(customer.id)}
                                            aria-label={`Excluir cliente ${customer.name}`}
                                        >
                                            Excluir <AiTwotoneDelete size={20} />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} className="text-center">Nenhum cliente encontrado.</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
};
