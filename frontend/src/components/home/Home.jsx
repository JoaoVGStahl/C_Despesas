import axios from 'axios'
import React, { Component } from 'react'
import Main from '../template/Main'

const initialState ={
    despesatotal : 0,
    receitatotal : 0,
    listreceita : [],
    listdespesa : []
}
const baseurlreceita = 'http://localhost:3001/receitas'
const baseurldespesas = 'http://localhost:3001/despesas'

export default class Home extends Component {
    state = {...initialState}

    componentWillMount(){
        axios(baseurlreceita).then(resp => {
            this.setState({listreceita : resp.data})
            
            this.percorrelistreceita()
        })  
        axios(baseurldespesas).then(resp =>{
            this.setState({listdespesa : resp.data})

            this.percorrelistdespesa()
        })
        
    }
    percorrelistreceita(){
        let receitaformat = 0
        this.state.listreceita.forEach(element => {
            receitaformat += parseFloat(element.valor.replace("R$","").replace(",","."))
        });
        this.setState({receitatotal : receitaformat})
        
    }
    percorrelistdespesa(){
        let despesaformat = 0
        this.state.listdespesa.forEach(element =>{
            despesaformat += parseFloat(element.custo.replace("R$","").replace(",","."))
        });

        this.setState({despesatotal : despesaformat})
    }
    RenderTable(){
        return(
            <div>
                <table className="table md-4">
                    <thead>
                        <tr>
                            <th>Receita Total</th>
                            <th>Despesas Total</th>
                            <th>Balanco</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.renderRows()}
                    </tbody>
                </table>
            </div>
        )
    }
    renderRows(){
        return(
            <tr>
                <td>R${this.state.receitatotal}</td>
                <td>R${this.state.despesatotal}</td>
                <td>R${this.state.receitatotal - this.state.despesatotal}</td>
            </tr>
            
        )
    }

    render(){
        return (
           <Main icon="home" title="Início"
           subtitle="Controle de Despesas">
               <div className="display-4">Bem Vindo!</div>
                <hr />
                <p className="mb-0">Cuide da suas finanças com segurança!</p>
                {this.RenderTable()}
           </Main>
        )
    }
}

