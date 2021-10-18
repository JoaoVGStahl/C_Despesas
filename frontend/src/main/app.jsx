import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './App.css'
import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import Logo from '../components/template/Logo'
import Nav from '../components/template/Nav'
import Routers from './Routers'

export default props =>
    <BrowserRouter>
        <div className="app">
            <Logo/>
            <Nav/>
            <Routers/>
        </div>
    </BrowserRouter>