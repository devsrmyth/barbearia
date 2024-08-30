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

interface IService {
    id: string;
    customer: ICustomer;
    value: number;
    type: string[];
    payment: string[];
    date: Date;
    description: string;
}

// Extending NewCycleFormData to include an optional 'id' field
const formValidationSchema = zod.object({
    customer: zod.string().uuid().nonempty({ message: "Selecione um cliente" }),
    description: zod.string().nonempty({ message: "A descrição é obrigatória" }),
    value: zod.number().min(0, { message: "O valor deve ser um número positivo" }),
    type: zod.array(zod.boolean()),
    payment: zod.array(zod.boolean()),
    id: zod.string().optional(),
});

type NewCycleFormData = zod.infer<typeof formValidationSchema>;

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export const EditarService = () => {
    const [types, setTypes] = useState<IType[]>([]);
    const [customers, setCustomers] = useState<ICustomer[]>([]);
    const payments = ["Cartão de Crédito", "Cartão de Débito", "Dinheiro", "Pix"];
    const [show, setShow] = useState(false);
    const [serviceId, setServiceId] = useState<string>('');

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const { register, handleSubmit, setValue, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(formValidationSchema),
        defaultValues: {
            customer: '-1',
            value: 0,
            description: '',
            type: [],
            payment: []
        },
    });

    useEffect(() => {
        fetch(`${apiUrl}/type`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async (response) => {
            if (response.ok) {
                const json = await response.json();
                setTypes(json);
            } else {
                console.error('Failed to fetch types');
            }
        }).catch(err => console.error('Error fetching types:', err));

        fetch(`${apiUrl}/customer`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async (response) => {
            if (response.ok) {
                const json = await response.json();
                setCustomers(json);
            } else {
                console.error('Failed to fetch customers');
            }
        }).catch(err => console.error('Error fetching customers:', err));
    }, []);

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id') ?? '';
        setServiceId(id);

        fetch(`${apiUrl}/service/id/${id}`)
            .then(response => response.json())
            .then(async (data: IService) => {
                setValue('description', data.description);
                setValue('value', data.value);

                const arrayType = types.map((t: IType) => data.type.includes(t.title));
                setValue('type', arrayType);

                const arrayPayment = payments.map((p: string) => data.payment.includes(p));
                setValue('payment', arrayPayment);
                setValue('customer', data.customer.id);
            })
            .catch(err => console.error('Error fetching service:', err));
    }, [customers, types]);

    const onSubmit = (data: NewCycleFormData) => {
        // Explicitly add the 'id' to the data object
        const updatedData = { ...data, id: serviceId };

        fetch(`${apiUrl}/service`, {
            method: 'PUT',
            body: JSON.stringify(updatedData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                handleShow();
            } else {
                console.error('Failed to update service');
            }
        }).catch(err => console.error('Error updating service:', err));
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
                    Para ver os serviços cadastrados vamos em <strong>Serviço - Listar</strong>...
                </Modal.Body>
                <Modal.Footer>
                    <Button href="/listar_servico" variant="success" onClick={handleClose}>
                        Concluir
                    </Button>
                </Modal.Footer>
            </Modal>

            <Form onSubmit={handleSubmit(onSubmit)} aria-labelledby="form-title">
                <h1 id="form-title">Editar Serviço</h1>
                <FormGroup className={styles.group}>
                    <FloatingLabel controlId="customerInput" label="Cliente" className="mb-3">
                        <Form.Select
                            {...register('customer')}
                            aria-required="true"
                            aria-label="Selecione o cliente para o serviço"
                        >
                            <option value="-1">Selecione um Cliente</option>
                            {customers.map((c: ICustomer) => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </Form.Select>
                    </FloatingLabel>

                    <fieldset className="mb-3">
                        <legend>Selecione o Tipo do Serviço</legend>
                        {types.map((t: IType, i: number) => (
                            <Form.Check
                                inline
                                type="checkbox"
                                key={`type-${t.id}`}
                                id={`type-${t.id}`}
                                label={t.title}
                                {...register(`type.${i}`)}
                                aria-labelledby={`type-${t.id}`}
                            />
                        ))}
                    </fieldset>

                    <FloatingLabel controlId="valueInput" label="Valor do Serviço (R$)" className="mb-3">
                        <Form.Control
                            type="number"
                            min="0.00"
                            max="10000.00"
                            step="0.01"
                            {...register('value')}
                            aria-required="true"
                            aria-label="Informe o valor do serviço"
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
                        <legend>Forma de Pagamento</legend>
                        {payments.map((p, i: number) => (
                            <Form.Check
                                inline
                                type="checkbox"
                                key={`payment-${p}`}
                                id={`payment-${p}`}
                                label={p}
                                {...register(`payment.${i}`)}
                                aria-labelledby={`payment-${p}`}
                            />
                        ))}
                    </fieldset>
                </FormGroup>

                <Navbar expand="lg" variant="dark" bg="dark" fixed="bottom" aria-label="Form options">
                    <Container>
                        <Navbar.Brand href="#">Opções do formulário</Navbar.Brand>
                        <div className={styles.botoes}>
                            <Button variant="success" type="submit" aria-label="Salvar as alterações do serviço">Gravar</Button>
                            <Button variant="warning" onClick={() => reset()} aria-label="Limpar o formulário">Limpar</Button>
                        </div>
                    </Container>
                </Navbar>
            </Form>
        </div>
    );
};
