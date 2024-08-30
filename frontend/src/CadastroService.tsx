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

interface ICustomer {
    id: string;
    name: string;
    phone: string;
    birth: Date;
}

interface IType {
    id: string;
    title: string;
    description: string;
}

const formValidationSchema = zod.object({
    customer: zod.string().uuid(),
    description: zod.string().nonempty({ message: 'A descrição é obrigatória' }),
    value: zod.number().min(0, { message: 'O valor deve ser positivo' }),
    type: zod.array(zod.boolean()),
    payment: zod.array(zod.boolean())
});

type NewCycleFormData = zod.infer<typeof formValidationSchema>;

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export const CadastroService = () => {
    const [customers, setCustomers] = useState<ICustomer[]>([]);
    const [types, setTypes] = useState<IType[]>([]);
    const payments = ["Cartão de Crédito", "Cartão de Débito", "Dinheiro", "Pix"];
    const [show, setShow] = useState(false);

    useEffect(() => {
        fetch(`${apiUrl}/customer`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(async (response) => {
                if (response.ok) {
                    const json = await response.json();
                    setCustomers(json);
                }
            })
            .catch((err) => console.error('Error fetching customers:', err));

        fetch(`${apiUrl}/type`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(async (response) => {
                if (response.ok) {
                    const json = await response.json();
                    setTypes(json);
                }
            })
            .catch((err) => console.error('Error fetching types:', err));
    }, []);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => event.target.select();

    const { register, handleSubmit, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(formValidationSchema),
        defaultValues: {
            customer: '-1',
            value: 0,
            description: '',
            type: Array(types.length).fill(false),
            payment: Array(payments.length).fill(false),
        },
    });

    const onSubmit = (data: NewCycleFormData) => {
        fetch(`${apiUrl}/service`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.ok) {
                    handleShow();
                }
            })
            .catch((err) => console.error('Error submitting service:', err));
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
                    <Modal.Title id="success-modal-title">Serviço cadastrado com sucesso!</Modal.Title>
                </Modal.Header>
                <Modal.Body id="success-modal-description">
                    Para ver os serviços cadastrados, vá em <strong>Serviço - Listar</strong>...
                </Modal.Body>
                <Modal.Footer>
                    <Button href="/listar_servico" variant="success" onClick={handleClose}>
                        Concluir
                    </Button>
                </Modal.Footer>
            </Modal>

            <Form onSubmit={handleSubmit(onSubmit)} aria-labelledby="form-title">
                <h1 id="form-title">Cadastro de Serviço</h1>
                <FormGroup className={styles.group}>
                    <FloatingLabel controlId="customerInput" label="Cliente" className="mb-3">
                        <Form.Select
                            {...register('customer')}
                            aria-required="true"
                            aria-label="Selecione o cliente para o serviço"
                        >
                            <option value="-1">Selecione um Cliente</option>
                            {customers.map((c: ICustomer) => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </Form.Select>
                    </FloatingLabel>

                    <fieldset className="mb-3">
                        <legend id="type-legend">Selecione o Tipo do Serviço</legend>
                        {types.map((t: IType, i: number) => (
                            <Form.Check
                                inline
                                type="checkbox"
                                key={`type-${t.id}`}
                                id={`type-${t.id}`}
                                label={t.title}
                                {...register(`type.${i}`)}
                                aria-labelledby="type-legend"
                            />
                        ))}
                    </fieldset>

                    <FloatingLabel controlId="valueInput" label="Valor do Serviço (R$)" className="mb-3" onFocus={handleFocus}>
                        <Form.Control
                            type="number"
                            min="0.00"
                            max="10000.00"
                            step="0.01"
                            {...register('value')}
                            aria-required="true"
                            aria-label="Informe o valor do serviço em reais"
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId="descriptionInput" label="Descrição do Serviço" className="mb-3">
                        <Form.Control
                            type="text"
                            {...register('description')}
                            aria-required="true"
                            aria-label="Informe a descrição do serviço"
                        />
                    </FloatingLabel>

                    <fieldset className="mb-3">
                        <legend id="payment-legend">Forma de Pagamento</legend>
                        {payments.map((payment, i: number) => (
                            <Form.Check
                                inline
                                type="checkbox"
                                key={`payment-${payment}`}
                                id={`payment-${payment}`}
                                label={payment}
                                {...register(`payment.${i}`)}
                                aria-labelledby="payment-legend"
                            />
                        ))}
                    </fieldset>
                </FormGroup>

                <Navbar expand="lg" variant="dark" bg="dark" fixed="bottom" aria-label="Form options">
                    <Container>
                        <Navbar.Brand href="#">Opções do formulário</Navbar.Brand>
                        <div className={styles.botoes}>
                            <Button variant="success" type="submit" aria-label="Salvar os dados do serviço">Gravar</Button>
                            <Button variant="warning" onClick={() => reset()} aria-label="Limpar o formulário">Limpar</Button>
                        </div>
                    </Container>
                </Navbar>
            </Form>
        </div>
    );
};
