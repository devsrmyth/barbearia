import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FormGroup from 'react-bootstrap/FormGroup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import Alert from 'react-bootstrap/Alert';

import styles from './Listagem.module.css';

import { GrEdit } from 'react-icons/gr';
import { AiTwotoneDelete } from 'react-icons/ai';
import dayjs from 'dayjs';
import { formatToBRL } from 'brazilian-values';

interface IRegister {
    id: string;
    isIncoming: boolean;
    description: string;
    value: number;
    date: Date;
}

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export const ListagemRegistro = () => {
    const [showDelete, setShowDelete] = useState(false);
    const [searchRegisterDescription, setSearchRegisterDescription] = useState('');
    const [registers, setRegisters] = useState<IRegister[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleClose = () => setShowDelete(false);

    useEffect(() => {
        const fetchRegisters = async () => {
            try {
                const response = await fetch(`${apiUrl}/register/${searchRegisterDescription}`);
                if (!response.ok) throw new Error('Erro ao buscar registros');
                const data = await response.json();
                setRegisters(data);
            } catch (error) {
                setError('Ocorreu um erro ao buscar os registros.');
            }
        };
        fetchRegisters();
    }, [searchRegisterDescription]);

    const handleOnChangeSearchRegisterDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchRegisterDescription(e.target.value);
    };

    const badgeIsEntrada = (isIncoming: boolean) => (isIncoming ? 'success' : 'danger');

    const handleOnClickDelete = async (id: string) => {
        try {
            const response = await fetch(`${apiUrl}/register/delete/${id}`, { method: 'DELETE' });
            if (response.status === 200) {
                setShowDelete(true);
                setRegisters((prevRegisters) => prevRegisters.filter(register => register.id !== id));
            } else {
                throw new Error('Erro ao excluir registro');
            }
        } catch (error) {
            setError('Ocorreu um erro ao excluir o registro.');
        }
    };

    return (
        <div className={styles.table}>
            {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}
            <Modal show={showDelete} onHide={handleClose} aria-labelledby="delete-modal-title">
                <Modal.Header closeButton>
                    <Modal.Title id="delete-modal-title">Registro excluído com sucesso!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Registro foi removido da base de dados.</Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleClose} aria-label="Concluir exclusão">
                        Concluir
                    </Button>
                </Modal.Footer>
            </Modal>
            <FormGroup>
                <h4>Buscar Registro pela Descrição</h4>
                <FloatingLabel controlId="floatingInput" label="Filtragem pela descrição" className="mb-3">
                    <Form.Control
                        type="text"
                        value={searchRegisterDescription}
                        onChange={handleOnChangeSearchRegisterDescription}
                        placeholder="Digite a descrição do registro"
                        aria-label="Filtrar registros pela descrição"
                    />
                </FloatingLabel>
            </FormGroup>
            <Table striped bordered hover aria-label="Lista de registros">
                <thead>
                    <tr>
                        <th>Categoria</th>
                        <th>Valor</th>
                        <th>Descrição</th>
                        <th>Data</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {registers.length > 0 ? (
                        registers.map((r: IRegister) => (
                            <tr key={r.id}>
                                <td>
                                    <Badge pill bg={badgeIsEntrada(r.isIncoming)} aria-label={r.isIncoming ? 'Entrada' : 'Saída'}>
                                        {r.isIncoming ? 'Entrada' : 'Saída'}
                                    </Badge>{' '}
                                </td>
                                <td>{formatToBRL(r.value)}</td>
                                <td>{r.description}</td>
                                <td>{dayjs(r.date).format('DD/MM/YYYY')}</td>
                                <td>
                                    <div className={styles.icones}>
                                        <Button href={`editar_registro?id=${r.id}`} variant="warning" aria-label={`Editar registro ${r.description}`}>
                                            Editar <GrEdit size={20} />
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={() => handleOnClickDelete(r.id)}
                                            aria-label={`Excluir registro ${r.description}`}
                                        >
                                            Excluir <AiTwotoneDelete size={20} />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="text-center">Nenhum registro encontrado.</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
};
