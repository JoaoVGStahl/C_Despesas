import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/Home'
import DespesasCrud from '../components/despesas/DespesaCrud'
import ReceitasCrud from '../components/receitas/ReceitasCrud'

export default props => 
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/despesas' component={DespesasCrud}/>
        <Route exact path='/receitas' component={ReceitasCrud}/>
        <Redirect from='*' to='/' />
    </Switch>