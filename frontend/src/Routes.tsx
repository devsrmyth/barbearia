import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Cadastro } from "./Cadastro";
import { CadastroRegistro } from "./CadastroRegistro";
import { CadastroService } from "./CadastroService";
import { CadastroTipo } from "./CadastroTipo";
import { Editar } from "./Editar";
import { EditarRegistro } from "./EditarRegistro";
import { EditarService } from "./EditarService";
import { EditarTipo } from "./EditarTipo";
import { Home } from "./Home";
import { Listagem } from "./Listagem";
import { ListagemRegistro } from "./ListagemRegistro";
import { ListagemServico } from "./ListagemServico";
import { ListagemTipo } from "./ListagemTipo";
import { RelatorioRegistro } from "./RelatorioRegistro";
import { RelatorioServico } from "./RelatorioServico";


const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cadastrar_cliente" element={<Cadastro />} />
                <Route path="/listar_cliente" element={<Listagem />} />
                <Route path="/editar_cliente" element={<Editar />} />
                <Route path="/cadastrar_tipo" element={<CadastroTipo />} />
                <Route path="/listar_tipo" element={<ListagemTipo />} />
                <Route path="/editar_tipo" element={<EditarTipo />} />
                <Route path="/cadastrar_servico" element={<CadastroService />} />
                <Route path="/editar_servico" element={<EditarService />} />
                <Route path="/listar_servico" element={<ListagemServico />} />
                <Route path="/cadastrar_registro" element={<CadastroRegistro />} />
                <Route path="/listar_registro" element={<ListagemRegistro />} />
                <Route path="/editar_registro" element={<EditarRegistro />} />
                <Route path="/relatorio_servico" element={<RelatorioServico />} />
                <Route path="/relatorio_registro" element={<RelatorioRegistro />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;