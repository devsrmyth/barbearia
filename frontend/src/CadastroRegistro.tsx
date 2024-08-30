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
    isIncoming: zod.any(),
    description: zod.string(),
    value: zod.any()
})

type NewCycleFormData = zod.infer<typeof formValidationSchema>

export const CadastroRegistro = () => {

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => event.target.select();

    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(formValidationSchema),
        defaultValues: {
            isIncoming: 1,
            description: '',
            value: 0
        },
    })

    const onSubmit = (data: any) => {

        if (data.isIncoming === -1)
            data.isIncoming = false;
        else
            data.isIncoming = true;

        fetch('http://localhost:3333/register', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status >= 200 && response.status < 300) {
                console.log(response);
                handleShow();
                return response;
            }
        }).catch(err => err);
    }

    return (
        <div className={styles.main}>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Registro cadastrado com sucesso!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Agora, caso deseje visualizar Registros cadastrados, vá ao menu <strong>Registro - Listar</strong>...</Modal.Body>
                <Modal.Footer>
                    <Button href="/listar_registro" variant="success" onClick={handleClose}>
                        Concluir
                    </Button>
                </Modal.Footer>
            </Modal>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup className={styles.group}>
                    <h4>Tipo do Registro</h4>
                    <FloatingLabel
                        controlId="floatingInput"
                        label=""
                        className="mb-3"

                    >
                        <Form.Check
                            inline
                            isValid
                            defaultChecked
                            type="radio"
                            label={`Entrada`}
                            value={1}
                            {...register('isIncoming')}
                        />

                        <Form.Check
                            inline
                            isInvalid
                            type="radio"
                            label={`Saída`}
                            value={-1}
                            {...register('isIncoming')}
                        />

                    </FloatingLabel>
                    <h4>Descrição do Registro</h4>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Descrição"
                        className="mb-3"

                    >
                        <Form.Control as="textarea" rows={5} {...register('description')} />
                    </FloatingLabel>

                    <h4>Valor do Registro</h4>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Valor do Registro (R$)"
                        className="mb-3"
                        onFocus={handleFocus}

                    >
                        <Form.Control type="number" min="0.00" step="0.01" {...register("value")} />
                    </FloatingLabel>

                </FormGroup>

                <Navbar expand="lg" variant="dark" bg="dark" fixed="bottom" >
                    <Container>
                        <Navbar.Brand href="#">Opções do formulário</Navbar.Brand>
                        <div className={styles.botoes}>
                            <Button variant="success" type="submit">Gravar</Button>
                            <Button type="reset" variant="warning">Limpar</Button>
                        </div>
                    </Container>
                </Navbar>

            </Form>


        </div>
    );
}