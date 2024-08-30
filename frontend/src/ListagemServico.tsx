import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FormGroup from 'react-bootstrap/FormGroup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import styles from './Listagem.module.css';

import { GrEdit } from 'react-icons/gr';
import { AiTwotoneDelete } from 'react-icons/ai';
import dayjs from 'dayjs';
import { formatToBRL } from 'brazilian-values';

interface ICustomer {
    name: string;
}

interface IService {
    id: string;
    customer: ICustomer;
    value: number;
    type: string[];
    payment: string[];
    date: Date;
}

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export const ListagemServico = () => {

    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [searchCustomerName, setSearchCustomerName] = useState("");

    const handleClose = () => {
        setShow(false);
        setShowDelete(false);
    }
    const handleShow = () => {
        setShow(true);
        setShowDelete(true)
    }

    const [services, setServices] = useState([]);


    useEffect(() => {
        fetch(`${apiUrl}/service/${searchCustomerName}`)
            .then(response => response.json())
            .then(data => setServices(data))
            .catch((error) => console.log(error));
    }, [searchCustomerName]);

    const handleOnChangeSearchTypeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchCustomerName(e.target.value);
    }


    const objStrToStr = (s: string, v: string[]) => {
        var properties = s.replaceAll("\"", "").replace("{", "").replace("}", "");
        let a_p = properties.split(',');
        a_p.forEach(function (property: string) {
            v.push(property);
        });
        return v;
    }

    const handleOnClickDelete = (id: string) => {
        fetch(`${apiUrl}/service/delete/${id}`)
            .then(response => {
                if (response.status === 200) {
                    setShowDelete(true);
                    const services_after_remove = [...services];
                    services_after_remove.splice(services_after_remove.findIndex((v: IService) => v.id === id), 1);
                    setServices(services_after_remove);
                }
            })
            .catch((error) => console.log(error));
    }

    return (
        <div className={styles.table}>
            <Modal show={showDelete} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Serviço excluído com sucesso!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Serviço foi removido da base de dados.</Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleClose}>
                        Concluir
                    </Button>
                </Modal.Footer>
            </Modal>
            <FormGroup>
                <h4>Busca por nome Cliente</h4>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Filtragem pelo nome Cliente"
                    className="mb-3"
                >
                    <Form.Control type="text" value={searchCustomerName} onChange={handleOnChangeSearchTypeTitle} />
                </FloatingLabel>
            </FormGroup>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Tipos</th>
                        <th>Forma Pagamento</th>
                        <th>Valor</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {services?.length > 0 && services.map((s: IService) => (
                        <tr key={s.id}>
                            <td>{s.customer.name}</td>
                            <td>{objStrToStr(s.type.toString(), []).join(', ')}</td>
                            <td>{objStrToStr(s.payment.toString(), []).join(', ')}</td>
                            <td>{formatToBRL(s.value)}</td>
                            <td>{dayjs(s.date).format('DD/MM/YYYY')}</td>
                            <td>
                                <div className={styles.icones}>
                                    <Button href={`editar_servico?id=${s.id}`} variant="warning"> Editar <GrEdit size={20} /></Button>
                                    <Button variant="danger" onClick={() => handleOnClickDelete(s.id)}> Excluir <AiTwotoneDelete size={20} /></Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div >
    );
}