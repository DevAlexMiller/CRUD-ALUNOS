import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Crud from "../Paginas/Crud";

const Rotas = () => (
    <BrowserRouter>
        <Routes>
            <Route exact path='/alunos' element={<Crud />}/>
        </Routes>
    </BrowserRouter>
)

export default Rotas;