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

interface IType {
    id: string;
    description: string;
    title: string;
}

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export const ListagemTipo = () => {
    const [showDelete, setShowDelete] = useState(false);
    const [searchTypeTitle, setSearchTypeTitle] = useState('');
    const [types, setTypes] = useState<IType[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleClose = () => setShowDelete(false);

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const response = await fetch(`${apiUrl}/type/${searchTypeTitle}`);
                if (!response.ok) throw new Error('Erro ao buscar tipos');
                const data = await response.json();
                setTypes(data);
            } catch (error) {
                setError('Ocorreu um erro ao buscar os tipos.');
            }
        };
        fetchTypes();
    }, [searchTypeTitle]);

    const handleOnChangeSearchTypeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTypeTitle(e.target.value);
    };

    const handleOnClickDelete = async (id: string) => {
        try {
            const response = await fetch(`${apiUrl}/type/delete/${id}`, { method: 'DELETE' });
            if (response.ok) {
                setShowDelete(true);
                setTypes((prevTypes) => prevTypes.filter(type => type.id !== id));
            } else {
                throw new Error('Erro ao excluir tipo');
            }
        } catch (error) {
            setError('Ocorreu um erro ao excluir o tipo.');
        }
    };

    return (
        <div className={styles.table}>
            {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}
            <Modal show={showDelete} onHide={handleClose} aria-labelledby="delete-modal-title">
                <Modal.Header closeButton>
                    <Modal.Title id="delete-modal-title">Tipo excluído com sucesso!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Tipo foi removido da base de dados.</Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleClose} aria-label="Concluir exclusão">
                        Concluir
                    </Button>
                </Modal.Footer>
            </Modal>
            <FormGroup>
                <h4>Título do Tipo</h4>
                <FloatingLabel controlId="floatingInput" label="Filtragem pelo título" className="mb-3">
                    <Form.Control
                        type="text"
                        value={searchTypeTitle}
                        onChange={handleOnChangeSearchTypeTitle}
                        placeholder="Digite o título do tipo"
                        aria-label="Filtrar tipos pelo título"
                    />
                </FloatingLabel>
            </FormGroup>
            <Table striped bordered hover aria-label="Lista de tipos">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Descrição</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {types.length > 0 ? (
                        types.map((type: IType) => (
                            <tr key={type.id}>
                                <td>{type.title}</td>
                                <td>{type.description}</td>
                                <td>
                                    <div className={styles.icones}>
                                        <Button href={`editar_tipo?id=${type.id}`} variant="warning" aria-label={`Editar tipo ${type.title}`}>
                                            Editar <GrEdit size={20} />
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={() => handleOnClickDelete(type.id)}
                                            aria-label={`Excluir tipo ${type.title}`}
                                        >
                                            Excluir <AiTwotoneDelete size={20} />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} className="text-center">Nenhum tipo encontrado.</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
};
