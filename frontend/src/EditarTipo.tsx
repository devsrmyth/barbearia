import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { FormGroup } from 'react-bootstrap';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import styles from './Cadastro.module.css';

// Define the validation schema
const formValidationSchema = zod.object({
    title: zod.string().min(5, { message: "O título deve ter pelo menos 5 caracteres" }),
    description: zod.string().min(5, { message: "A descrição deve ter pelo menos 5 caracteres" })
});

type NewCycleFormData = zod.infer<typeof formValidationSchema>;

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export const EditarTipo = () => {
    const [show, setShow] = useState(false);
    const [typeId, setTypeId] = useState<string>("");

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const { register, handleSubmit, setValue } = useForm<NewCycleFormData>({
        resolver: zodResolver(formValidationSchema),
        defaultValues: {
            title: '',
            description: ''
        },
    });

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id') || '';
        setTypeId(id);

        fetch(`${apiUrl}/type/id/${id}`)
            .then(response => response.json())
            .then(data => {
                setValue('title', data.title);
                setValue('description', data.description);
            })
            .catch(err => console.error('Error fetching type data:', err));
    }, []);

    const onSubmit = (data: NewCycleFormData) => {
        const updatedData = { ...data, id: typeId };

        fetch(`${apiUrl}/type`, {
            method: 'PUT',
            body: JSON.stringify(updatedData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                handleShow();
            } else {
                console.error('Failed to update type:', response);
            }
        }).catch(err => console.error('Error updating type:', err));
    };

    return (
        <div className={styles.main}>
            <Modal
                show={show}
                onHide={handleClose}
                aria-labelledby="success-modal-title"
                aria-describedby="success-modal-description"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="success-modal-title">Tipo atualizado com sucesso!</Modal.Title>
                </Modal.Header>
                <Modal.Body id="success-modal-description">
                    Agora, caso deseje visualizar todos os Tipos, vá no menu <strong>Tipo - Listar</strong>...
                </Modal.Body>
                <Modal.Footer>
                    <Button href="/listar_tipo" variant="success" onClick={handleClose}>
                        Concluir
                    </Button>
                </Modal.Footer>
            </Modal>

            <Form onSubmit={handleSubmit(onSubmit)} aria-labelledby="form-title">
                <h1 id="form-title">Editar Tipo</h1>
                <FormGroup className={styles.group}>
                    <FloatingLabel controlId="titleInput" label="Título" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Título do Tipo"
                            {...register('title')}
                            aria-required="true"
                            aria-label="Informe o título do tipo"
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="descriptionInput" label="Descrição" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Descrição do Tipo"
                            {...register('description')}
                            aria-required="true"
                            aria-label="Informe a descrição do tipo"
                        />
                    </FloatingLabel>
                </FormGroup>

                <Navbar expand="lg" variant="dark" bg="dark" fixed="bottom" aria-label="Form options">
                    <Container>
                        <Navbar.Brand href="#">Opções do formulário</Navbar.Brand>
                        <div className={styles.botoes}>
                            <Button variant="success" type="submit" aria-label="Salvar as alterações do tipo">Gravar</Button>
                            <Button variant="warning" type="reset" aria-label="Limpar o formulário">Limpar</Button>
                        </div>
                    </Container>
                </Navbar>
            </Form>
        </div>
    );
};
