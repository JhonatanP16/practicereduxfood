import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import classes from './Header.module.css'
import  IconLogo from '../assets/logo.svg'
import { FaAlignRight, FaShoppingBag } from "react-icons/fa";
import { useSelector } from 'react-redux';
import Cart from './Cart';
const Header = () => {
  const classIsActive = ({isActive}) => isActive ? classes.linkAtivo : '';
  const cartData = useSelector((state) => state.cart);
  const [isCartShown,setIsCartShown] = useState(false);
  const refCart = useRef();
  const refMenu = useRef();
  const [isMenuShow,setIsMenuShow] = useState(false);
  const location = useLocation();
  const estadoFinalizar = location.pathname === '/finalizar-compra';
 
  const openCart = () =>{
    setIsCartShown(true);
  }
  const closeCart = () =>{
    setIsCartShown(false);
  }
  useEffect(()=>{
    const checkPageWidth = () =>{
        if(window.innerWidth <= 500){
            setIsMenuShow(false)
        }
    }
    checkPageWidth()
    window.addEventListener('resize',checkPageWidth);
    return () =>{
        window.removeEventListener('resize',checkPageWidth)
    }
  },[])
  useEffect(()=>{
    const closeMenus = (e) =>{
        if(e.target !== refCart.current && !refCart.current.contains(e.target)){
            setIsCartShown(false);
        }
        if(e.target !== refMenu.current && !refMenu.current.contains(e.target)){
            setIsMenuShow(false)
        }
    }
    window.addEventListener('click',closeMenus);
    return() =>{
        window.removeEventListener('click',closeMenus);
    }
  },[])
  return (
    <header className={classes.header}>
        <div className={`container ${classes.container}`}>
            <nav className={isMenuShow ? classes.shown : ''}>
                <NavLink to='/' className={classIsActive}>Home</NavLink>
                <NavLink to='/menu' className={classIsActive}>Menu</NavLink>
            </nav>
            <Link className={classes.logo} to='/'>
             <img src={IconLogo} alt="" />Food App
            </Link>
            <button ref={refMenu} className={`${classes.menuBtn} ${isMenuShow ? classes.shown : ''}`} onClick={() =>setIsMenuShow(true)}><FaAlignRight/></button>
            <div className={classes.cart} ref={refCart}>
                <button className={`btn-style ${classes.btnCarrinho} ${isCartShown ? classes.btnAtivo : ''}`}
                onClick={openCart} disabled={estadoFinalizar}>
                    <span>Carrito</span><FaShoppingBag/>
                    <span className={classes.itensCarrinho}>{cartData.totalItems}</span>
                </button>
                <Cart isCartShown={isCartShown} closeCart={closeCart} itemsCart={cartData.items}/>
            </div>
        </div>
    </header>
  )
}

export default Header