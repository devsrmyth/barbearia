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
    isIncoming: zod.boolean(),
    description: zod.string().nonempty({ message: 'A descrição é obrigatória' }),
    value: zod.number().min(0, { message: 'O valor deve ser positivo' }),
});

type NewCycleFormData = zod.infer<typeof formValidationSchema>;

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export const CadastroRegistro = () => {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => event.target.select();

    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(formValidationSchema),
        defaultValues: {
            isIncoming: true,
            description: '',
            value: 0,
        },
    });

    const onSubmit = (data: any) => {
        fetch(`${apiUrl}/register`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    console.log(response);
                    handleShow();
                    return response;
                }
            })
            .catch(err => err);
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
                    <Modal.Title id="success-modal-title">Registro cadastrado com sucesso!</Modal.Title>
                </Modal.Header>
                <Modal.Body id="success-modal-description">
                    Agora, caso deseje visualizar Registros cadastrados, vá ao menu <strong>Registro - Listar</strong>...
                </Modal.Body>
                <Modal.Footer>
                    <Button href="/listar_registro" variant="success" onClick={handleClose}>
                        Concluir
                    </Button>
                </Modal.Footer>
            </Modal>

            <Form onSubmit={handleSubmit(onSubmit)} aria-labelledby="form-title">
                <h1 id="form-title">Cadastro de Registro</h1>
                <FormGroup className={styles.group}>
                    <fieldset className="mb-3">
                        <legend id="tipo-registro-legend">Tipo do Registro</legend>
                        <div>
                            <Form.Check
                                inline
                                type="radio"
                                label="Entrada"
                                value="true"
                                defaultChecked
                                {...register('isIncoming')}
                                aria-labelledby="tipo-registro-legend"
                            />
                            <Form.Check
                                inline
                                type="radio"
                                label="Saída"
                                value="false"
                                {...register('isIncoming')}
                                aria-labelledby="tipo-registro-legend"
                            />
                        </div>
                    </fieldset>
                    <FloatingLabel controlId="descriptionInput" label="Descrição do Registro" className="mb-3">
                        <Form.Control
                            as="textarea"
                            rows={5}
                            {...register('description')}
                            aria-required="true"
                            aria-describedby="description-help-text"
                        />
                        <div id="description-help-text" className="form-text">
                            Informe uma descrição detalhada para o registro.
                        </div>
                    </FloatingLabel>

                    <FloatingLabel controlId="valueInput" label="Valor do Registro (R$)" className="mb-3" onFocus={handleFocus}>
                        <Form.Control
                            type="number"
                            min="0.00"
                            step="0.01"
                            {...register('value')}
                            aria-required="true"
                            aria-describedby="value-help-text"
                        />
                        <div id="value-help-text" className="form-text">
                            Informe o valor do registro em reais.
                        </div>
                    </FloatingLabel>
                </FormGroup>

                <Navbar expand="lg" variant="dark" bg="dark" fixed="bottom" aria-label="Form options">
                    <Container>
                        <Navbar.Brand href="#">Opções do formulário</Navbar.Brand>
                        <div className={styles.botoes}>
                            <Button variant="success" type="submit" aria-label="Salvar os dados do registro">Gravar</Button>
                            <Button type="reset" variant="warning" aria-label="Limpar o formulário">Limpar</Button>
                        </div>
                    </Container>
                </Navbar>
            </Form>
        </div>
    );
};
