import { NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export function Menu() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" aria-label="Main Navigation">
            <Container>
                <Navbar.Brand href="/">Barbearia Braba</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/" aria-label="Home">Home</Nav.Link>
                        <NavDropdown title="Cliente" id="client-nav-dropdown" aria-label="Client Menu">
                            <NavDropdown.Item href="/cadastrar_cliente" aria-label="Cadastrar Cliente">Cadastrar</NavDropdown.Item>
                            <NavDropdown.Item href="/listar_cliente" aria-label="Listar Clientes">Listar</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Tipo" id="type-nav-dropdown" aria-label="Type Menu">
                            <NavDropdown.Item href="/cadastrar_tipo" aria-label="Cadastrar Tipo">Cadastrar</NavDropdown.Item>
                            <NavDropdown.Item href="/listar_tipo" aria-label="Listar Tipos">Listar</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Serviço" id="service-nav-dropdown" aria-label="Service Menu">
                            <NavDropdown.Item href="/cadastrar_servico" aria-label="Cadastrar Serviço">Cadastrar</NavDropdown.Item>
                            <NavDropdown.Item href="/listar_servico" aria-label="Listar Serviços">Listar</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Registros Financeiros" id="finance-nav-dropdown" aria-label="Finance Records Menu">
                            <NavDropdown.Item href="/cadastrar_registro" aria-label="Cadastrar Registro Financeiro">Cadastrar</NavDropdown.Item>
                            <NavDropdown.Item href="/listar_registro" aria-label="Listar Registros Financeiros">Listar</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Relatórios" id="reports-nav-dropdown" aria-label="Reports Menu">
                            <NavDropdown.Item href="/relatorio_servico" aria-label="Relatório de Serviços">Serviços</NavDropdown.Item>
                            <NavDropdown.Item href="/relatorio_registro" aria-label="Relatório de Registros">Registros</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
