import React from 'react'
import Navbar from './navbar'

export default props => (
    <header className='main-header'> 
        <a href='/#/' className='logo'>
            <span className='logo-mini'><b>Soil</b></span>
            <span className='logo-lg'>
                <i className='fa fa-flas'></i>
                <b> Soil </b>
            </span>
        </a>
        <nav className='navbar navbar-static-top'>
            {/*<a href className='sidebar-toggle' data-toggle='offcanvas'></a> menu de lado*/}
            <Navbar />
        </nav>
    </header>
)