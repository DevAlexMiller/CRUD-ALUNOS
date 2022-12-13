import React from 'react';
import {Table, Button, Form, Modal} from 'react-bootstrap';
import Axios from 'axios';

class Alunos extends React.Component{
    
    constructor(props){
        super(props);

        this.state = {
            id: 0,
            nome: '',
            email: '',
            password: '',
            alunos: [],
            modalAberta: false
        }

        this.buscarAlunos = this.buscarAlunos.bind(this);
        this.renderTabela = this.renderTabela.bind(this);
        this.render = this.render.bind(this);
        this.deletarAluno = this.deletarAluno.bind(this);
        this.carregarDados = this.carregarDados.bind(this);
        this.cadastroAluno = this.cadastroAluno.bind(this);
        this.atualizarAluno = this.atualizarAluno.bind(this);
        this.atualizaNome = this.atualizaNome.bind(this);
        this.atualizaEmail = this.atualizaEmail.bind(this);
        this.atualizaSenha = this.atualizaSenha.bind(this);
        this.submit = this.submit.bind(this);
        this.reset = this.reset.bind(this);
        this.fecharModal = this.fecharModal.bind(this);
        this.abrirModal = this.abrirModal.bind(this);

    }
    
    componentDidMount(){
        this.buscarAlunos();
    }

    componentWillUnmount(){
        
    }

    buscarAlunos(){
        Axios.get('http://localhost:3001/cadastros')
        .then((dados) => {
            this.setState({alunos: dados.data})
        })
    }

    deletarAluno = (_id) => {
        
        Axios.delete("http://localhost:3001/delete/" + _id)
        .then(resposta =>{
            this.buscarAlunos()
        })
    }

    carregarDados = (id) => {
        console.log(id)
        Axios.get("http://localhost:3001/cadastros/" + id)
        .then (dados => {
            this.setState({ 
                id: dados.data[0].id,
                name: dados.data[0].nome,
                email: dados.data[0].email,
                password: dados.data[0].password
            })
            
            this.abrirModal();
        })
        .catch(erro => console.log(erro))
        
    }
    
    cadastroAluno = (aluno) => {
        Axios.post("http://localhost:3001/create", {
            usuario: aluno.name,
            email: aluno.email,
            senha: aluno.password,
        })
        
        .then((resposta) =>
        {
            if (resposta.statusText === 'OK'){
                this.buscarAlunos();
            }
            else{
                alert("Não foi possível adicionar o aluno");
            }
        })
    };     
        
    atualizarAluno = (aluno) => {
        Axios.put("http://localhost:3001/update/" , {
            usuario: aluno.name,
            email: aluno.email,
            senha: aluno.password,
            id: aluno.id
        })
        
        .then(resposta =>{
            if (resposta.statusText === 'OK'){
                this.buscarAlunos();
            }
            else{
                alert("Não foi possível atualizar o aluno");
            }
        })
    }

    renderTabela(){
       return(
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Atualizar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.alunos.map((aluno, index) =>
                            <tr key={index}>
                                <td> {index} </td>
                                <td> {aluno.nome} </td>
                                <td> {aluno.email} </td>
                                <td> <Button variant="primary" onClick={() => this.carregarDados(aluno.id)}>Atualizar</Button></td>
                                <td> <Button variant="danger" onClick={() => this.deletarAluno(aluno.id)}>Excluir</Button></td>
                            </tr>    
                                            
                     )
                    }   
                </tbody>
            </Table>
        ) 
    }    

    atualizaNome = (e) => {
        this.setState(
            {
                name: e.target.value,
            }
        
        )
    }

    atualizaEmail = (e) => {
        this.setState(
            {
                email: e.target.value,
            }
        )
    }
    
    atualizaSenha = (e) => {
        console.log(e)
        this.setState(
            {
                password: e.target.value,
            }
        )
    }

    submit = () => {
        if(this.state.id === 0){
                const aluno = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            }
            this.cadastroAluno(aluno); 
        }
        else{
            const aluno = {
                id: this.state.id,
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            }
            this.atualizarAluno(aluno); 
        }
        this.fecharModal();

    }

    reset = () =>{
        this.setState(
            {
                id: 0,
                name: "",
                email: "",
                password: ""
            }
        )
        this.abrirModal();
    }

    fecharModal = () =>{
        this.setState(
            {
                modalAberta: false
            }
        )
    }

    abrirModal = () =>{
        this.setState(
            {
                modalAberta: true
            }
        )
    }

    render(){
        return(
            <div>

                <Modal show={this.state.modalAberta} onHide={this.fecharModal}>
                    <Modal.Header closeButton>
                    <Modal.Title>Dados do Aluno</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                    <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" placeholder="Nome" value={this.state.name} onChange={this.atualizaNome}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Insira o email" value={this.state.email} onChange={this.atualizaEmail}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password" placeholder="Senha" value={this.state.password} onChange={this.atualizaSenha}/>
                    </Form.Group>

                    
                    </Form>

                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.fecharModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.submit}>
                        Salvar
                    </Button>
                    </Modal.Footer>
                </Modal>

                {this.renderTabela()}
                <Button variant="warning" onClick={this.reset}>
                        Novo
                </Button>
            </div>
        )
    }

}
export default Alunos;