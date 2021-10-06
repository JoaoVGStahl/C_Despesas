import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import Nav from '../components/template/Nav'
import Routers from './Routers'

export default props =>
    <BrowserRouter>
        <div>
            <Nav/>
            <Routers/>
        </div>
    </BrowserRouter>