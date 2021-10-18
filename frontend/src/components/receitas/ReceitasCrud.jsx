import React from 'react'
import { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon: 'money',
    title: 'Receitas',
    subtitle: 'Gerenciamento de Receitas!'
}
const baseUrl = 'http://localhost:3001/receitas'
const initialState = {
    receitas: { descricao: '', valor: '' },
    list: []
}
export default class Receitas extends Component {
    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }
    clear() {
        this.setState({ receitas: initialState.receitas })
    }
    remove(receitas) {
        axios.delete(`${baseUrl}/${receitas.id}`)
            .then(resp => {
                const list = this.getUpdatedList(receitas, false)
                this.setState({ list })
            })
    }
    getUpdatedList(receitas, add = true) {
        const list = this.state.list.filter(u => u.id !== receitas.id)
        if (add)
            list.unshift(receitas)
        return list
    }
    updateField(event) {
        const receitas = { ...this.state.receitas }
        receitas[event.target.name] = event.target.value
        this.setState({ receitas })
    }
    load(receitas) {
        this.setState({ receitas })
    }
    save() {
        const receitas = this.state.receitas
        const method = receitas.id ? 'put' : 'post'
        const url = receitas.id ? `${baseUrl}/${receitas.id}` : baseUrl

        axios[method](url, receitas)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ receitas: initialState.receitas, list })
            })
    }
    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Origem da Receita:</label>
                            <input type="text" className="form-control"
                                name="descricao"
                                value={this.state.receitas.descricao}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a origem da despesa" />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <label>Valor:</label>
                        <input type="text" className="form-control"
                            name="valor"
                            value={this.state.receitas.valor}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o Valor da receita..." />
                    </div>
                    <div className="col-12 d-flex justify-content-start">
                        <button className="btn btn-primary" onClick={e => this.save(e)}>
                            Salvar
                        </button>
                        <button className="btn btn-secondary ml-2" onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
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
                            <th>Origem</th>
                            <th>Valor</th>
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
        return this.state.list.map(receitas => {
            return (

                <tr key={receitas.id}>
                    <td>{receitas.id}</td>
                    <td>{receitas.descricao}</td>
                    <td>{receitas.valor}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(receitas)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(receitas)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }
    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>

        )
    }
}