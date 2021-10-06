import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import React from 'react'
import { Component } from 'react'
import axios from 'axios'

const baseurl='http://localhost:3001/despesas'
const initialState ={
    despesas:{descricao: '', custo:''},
    list: []
}

export default class ListaDespesa extends Component {
    state = {...initialState}

    componentWillMount(){
        axios(baseurl).then(resp =>{
            this.setState({list : resp.data})
        })
    }
    remove(despesas){
        axios.delete(`${baseurl}/${despesas.id}`)
            .then(resp=>{
                const list = this.getUpdatedList(despesas,false)
                this.setState({list})
            })
    }
    getUpdatedList(despesas, add = true){
        const list = this.state.list.filter(u => u.id !== despesas.id)
        if(add)
            list.unshift(despesas)
        return list
    }
    updateField(event){
        const despesas = { ...this.state.despesas}
        despesas[event.target.name] = event.target.value
        this.setState({despesas})
    }
    Load(despesas){
        this.setState({despesas})   
    }
    save(){
        const depesas = this.state.despesas
        const method = depesas.id ? 'put' : 'post'
        const url = depesas.id ? `${baseurl}/${depesas.id}` : baseurl

        axios[method](url, depesas)
            .then(resp =>{
                const list = this.getUpdatedList(resp.data)
                this.setState({ produtos : initialState.depesas, list})
            })
    }
    renderForm(){
        return(
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Descrição da Despesa:</label>
                            <input type="text" className="form-control" 
                            name="descricao" 
                            value={this.state.despesas.descricao}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite a descrição da despesa"/>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <label>Custo:</label>
                        <input type="text" className="form-control" 
                        name="custo" 
                        value={this.state.despesas.custo}
                        onChange={e => this.updateField(e)}
                        placeholder="Digite o Custo da despesa..."
                        />
                    </div>
                    <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>
                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
                </div>
            </div>
        )
    }

    renderTable() {
        return (
            <div>
                <table className="table md-4">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Descrição</th>
                            <th>Custo</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>
            </div>
        )
    }
    renderRows() {
        return this.state.list.map(despesas =>{
            return(
                <tr key={despesas.id}>
                    <td>{despesas.id}</td>
                    <td>{despesas.descricao}</td>
                    <td>{despesas.custo}</td>  
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.Load(despesas)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2" 
                            onClick={() => this.remove(despesas)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }
    render() {
        return (
            <div>
                {this.renderForm()}
                {this.renderTable()}
            </div>

        )
    }
}
