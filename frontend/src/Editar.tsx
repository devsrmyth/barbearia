import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { FormGroup } from 'react-bootstrap';
import * as zod from 'zod';
import { parseISO } from 'date-fns';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import styles from './Cadastro.module.css';

// Define the schema for form validation
const formValidationSchema = zod.object({
    name: zod.string().min(5, { message: 'O nome deve ter pelo menos 5 caracteres' }),
    phone: zod.string().min(8, { message: 'O telefone deve ter pelo menos 8 caracteres' }),
    birth: zod.string().nonempty({ message: 'A data de nascimento é obrigatória' })
});

// Extend the form data type with an optional 'id' field
type NewCycleFormData = zod.infer<typeof formValidationSchema> & { id?: string };

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export const Editar = () => {
    const [show, setShow] = useState(false);
    const [customerId, setCustomerId] = useState<string>("");

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const { register, handleSubmit, setValue } = useForm<NewCycleFormData>({
        resolver: zodResolver(formValidationSchema),
        defaultValues: {
            name: '',
            phone: '',
            birth: ''
        },
    });

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id');
        setCustomerId(String(id));

        fetch(`${apiUrl}/customer/id/${id}`)
            .then(response => response.json())
            .then(data => {
                setValue('name', data.name);
                setValue('birth', dayjs(data.birth).format('YYYY-MM-DD'));
                setValue('phone', data.phone);
            })
            .catch(err => console.error('Error fetching customer data:', err));
    }, []);

    const onSubmit = (data: NewCycleFormData) => {
        // Convert the 'birth' field from string to Date object
        const date = parseISO(data.birth);

        const updatedData = {
            ...data,
            id: customerId,
            birth: date,
        };

        fetch(`${apiUrl}/customer`, {
            method: 'PUT',
            body: JSON.stringify(updatedData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    handleShow();
                } else {
                    console.error('Failed to update customer data:', response);
                }
            })
            .catch(err => console.error('Error:', err));
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
                    <Modal.Title id="success-modal-title">Cliente atualizado com sucesso!</Modal.Title>
                </Modal.Header>
                <Modal.Body id="success-modal-description">
                    Agora, caso deseje visualizar todos os Clientes, vá no menu <strong>Cliente - Listar</strong>...
                </Modal.Body>
                <Modal.Footer>
                    <Button href="/listar_cliente" variant="success" onClick={handleClose}>
                        Concluir
                    </Button>
                </Modal.Footer>
            </Modal>

            <Form onSubmit={handleSubmit(onSubmit)} aria-labelledby="form-title">
                <h1 id="form-title">Editar Cliente</h1>
                <FormGroup className={styles.group}>
                    <FloatingLabel controlId="nameInput" label="Nome" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Nome do Cliente"
                            {...register('name')}
                            aria-required="true"
                            aria-label="Informe o nome do cliente"
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId="phoneInput" label="Telefone" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Telefone do Cliente"
                            {...register('phone')}
                            aria-required="true"
                            aria-label="Informe o telefone do cliente"
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId="birthInput" label="Nascimento" className="mb-3">
                        <Form.Control
                            type="date"
                            {...register('birth', { valueAsDate: false })}
                            aria-required="true"
                            aria-label="Informe a data de nascimento do cliente"
                        />
                    </FloatingLabel>
                </FormGroup>

                <Navbar expand="lg" variant="dark" bg="dark" fixed="bottom" aria-label="Form options">
                    <Container>
                        <Navbar.Brand href="#">Opções do formulário</Navbar.Brand>
                        <div className={styles.botoes}>
                            <Button variant="success" type="submit" aria-label="Salvar os dados do cliente">Gravar</Button>
                            <Button variant="warning" type="reset" aria-label="Limpar o formulário">Limpar</Button>
                        </div>
                    </Container>
                </Navbar>
            </Form>
        </div>
    );
};
