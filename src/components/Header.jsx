import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import classes from './Header.module.css'
import  IconLogo from '../assets/logo.svg'
import { FaShoppingBag } from "react-icons/fa";
const Header = () => {
  const classIsActive = ({isActive}) => isActive ? classes.linkAtivo : '';
  return (
    <header className={classes.header}>
        <div className={`container ${classes.container}`}>
            <nav className=''>
                <NavLink to='/' className={classIsActive}>Home</NavLink>
                <NavLink to='/menu' className={classIsActive}>Menu</NavLink>
            </nav>
            <Link className={classes.logo} to='/'>
             <img src={IconLogo} alt="" />Food App
            </Link>
            
            <div className={classes.cart} >
                <button className={`btn-style ${classes.btnCarrinho}`}>
                    <span>Carrito</span><FaShoppingBag/>
                    <span className={classes.itensCarrinho}>4</span>
                </button>
            </div>
        </div>
    </header>
  )
}

export default Header