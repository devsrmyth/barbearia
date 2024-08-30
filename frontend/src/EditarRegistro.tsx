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

interface IRegister {
    id: string;
    isIncoming: boolean;
    value: number;
    description: string;
    date: Date;
}

const formValidationSchema = zod.object({
    isIncoming: zod.boolean(),
    description: zod.string().nonempty({ message: 'A descrição é obrigatória' }),
    value: zod.number().min(0, { message: 'O valor deve ser um número positivo' })
});

type NewCycleFormData = zod.infer<typeof formValidationSchema>;

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export const EditarRegistro = () => {
    const [show, setShow] = useState(false);
    const [isEntrada, setIsEntrada] = useState(false);
    const [customerId, setCustomerId] = useState<string>("");

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => event.target.select();

    const { register, handleSubmit, setValue } = useForm<NewCycleFormData>({
        resolver: zodResolver(formValidationSchema),
        defaultValues: {
            description: '',
            value: 0,
            isIncoming: true,
        },
    });

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id') || '1';
        setCustomerId(id);

        fetch(`${apiUrl}/register/id/${id}`)
            .then(response => response.json())
            .then((data: IRegister) => {
                setIsEntrada(data.isIncoming);
                setValue('isIncoming', data.isIncoming);
                setValue('value', data.value);
                setValue('description', data.description);
            })
            .catch(err => console.error('Error fetching register data:', err));
    }, []);

    const onSubmit = (data: NewCycleFormData) => {
        const updatedData = {
            ...data,
            id: customerId,
            isIncoming: data.isIncoming,
        };

        fetch(`${apiUrl}/register`, {
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
                    console.error('Failed to update register data:', response);
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
                    <Modal.Title id="success-modal-title">Registro alterado com sucesso!</Modal.Title>
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
                <h1 id="form-title">Editar Registro</h1>
                <FormGroup className={styles.group}>
                    <fieldset className="mb-3">
                        <legend id="registro-type-legend">Tipo do Registro</legend>
                        <div>
                            <Form.Check
                                inline
                                type="radio"
                                id="entrada"
                                label="Entrada"
                                value="true"
                                checked={isEntrada}
                                onClick={() => setIsEntrada(true)}
                                {...register('isIncoming')}
                                aria-labelledby="registro-type-legend"
                            />
                            <Form.Check
                                inline
                                type="radio"
                                id="saida"
                                label="Saída"
                                value="false"
                                checked={!isEntrada}
                                onClick={() => setIsEntrada(false)}
                                {...register('isIncoming')}
                                aria-labelledby="registro-type-legend"
                            />
                        </div>
                    </fieldset>

                    <FloatingLabel controlId="descriptionInput" label="Nova descrição" className="mb-3">
                        <Form.Control
                            as="textarea"
                            rows={5}
                            {...register('description')}
                            aria-required="true"
                            aria-label="Informe a nova descrição do registro"
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId="valueInput" label="Novo valor do Registro (R$)" className="mb-3" onFocus={handleFocus}>
                        <Form.Control
                            type="number"
                            min="0.00"
                            step="0.01"
                            {...register('value')}
                            aria-required="true"
                            aria-label="Informe o novo valor do registro em reais"
                        />
                    </FloatingLabel>
                </FormGroup>

                <Navbar expand="lg" variant="dark" bg="dark" fixed="bottom" aria-label="Form options">
                    <Container>
                        <Navbar.Brand href="#">Opções do formulário</Navbar.Brand>
                        <div className={styles.botoes}>
                            <Button variant="success" type="submit" aria-label="Salvar as alterações do registro">Gravar</Button>
                            <Button variant="warning" type="reset" aria-label="Limpar o formulário">Limpar</Button>
                        </div>
                    </Container>
                </Navbar>
            </Form>
        </div>
    );
};
