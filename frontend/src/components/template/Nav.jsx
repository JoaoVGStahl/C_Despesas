import React  from "react";
import './Nav.css'
import { Link } from 'react-router-dom'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            <Link to="/receitas">
                <i className="fa fa-home"></i> Início
            </Link>
            <Link to="/despesas">
                <i className="fa fa-credit-card-alt"></i> Depesas
            </Link>
            <Link to="/receitas">
                <i className="fa fa-money"></i> Receitas
            </Link>
        </nav>
    </aside>