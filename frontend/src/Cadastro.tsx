import { useState } from 'react';
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

const formValidationSchema = zod.object({
    name: zod.string().min(5, { message: 'O nome deve ter pelo menos 5 caracteres' }),
    phone: zod.string().nonempty({ message: 'O telefone é obrigatório' }),
    birth: zod.date(),
});

type NewCycleFormData = zod.infer<typeof formValidationSchema>;

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export const Cadastro = () => {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(formValidationSchema),
        defaultValues: {
            name: '',
            phone: '',
            birth: new Date(),
        },
    });

    const onSubmit = (data: any) => {
        fetch(`${apiUrl}/customer`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    handleShow();
                    return response;
                }
            })
            .catch((err) => err);
    };

    return (
        <div className={styles.main}>
            <Modal show={show} onHide={handleClose} aria-labelledby="success-modal-title" aria-describedby="success-modal-description">
                <Modal.Header closeButton>
                    <Modal.Title id="success-modal-title">Cliente cadastrado com sucesso!</Modal.Title>
                </Modal.Header>
                <Modal.Body id="success-modal-description">
                    Agora, caso deseje visualizar Clientes cadastrados, vá no menu <strong>Cliente - Listar</strong>...
                </Modal.Body>
                <Modal.Footer>
                    <Button href="/listar_cliente" variant="success" onClick={handleClose}>
                        Concluir
                    </Button>
                </Modal.Footer>
            </Modal>

            <Form onSubmit={handleSubmit(onSubmit)} aria-labelledby="form-title">
                <h1 id="form-title">Cadastro de Cliente</h1>
                <FormGroup className={styles.group}>
                    <FloatingLabel controlId="nameInput" label="Nome" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Nome do Cliente"
                            {...register('name')}
                            aria-required="true"
                            aria-invalid={!!watch('name') && !!formValidationSchema.shape.name.safeParse(watch('name')).error}
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="phoneInput" label="Telefone" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Telefone do Cliente"
                            {...register('phone')}
                            aria-required="true"
                            aria-invalid={!!watch('phone') && !!formValidationSchema.shape.phone.safeParse(watch('phone')).error}
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="birthInput" label="Nascimento" className="mb-3">
                        <Form.Control
                            type="date"
                            {...register('birth', { valueAsDate: true })}
                            aria-required="true"
                        />
                    </FloatingLabel>
                </FormGroup>

                <Navbar expand="lg" variant="dark" bg="dark" fixed="bottom" aria-label="Form options">
                    <Container>
                        <Navbar.Brand href="#">Opções do formulário</Navbar.Brand>
                        <div className={styles.botoes}>
                            <Button variant="success" type="submit" aria-label="Salvar os dados do cliente">Gravar</Button>
                            <Button type="reset" variant="warning" aria-label="Limpar o formulário">Limpar</Button>
                        </div>
                    </Container>
                </Navbar>
            </Form>
        </div>
    );
};
