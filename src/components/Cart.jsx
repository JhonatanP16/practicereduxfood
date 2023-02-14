import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { cartActions } from '../store/cartStore';
import classes from './Cart.module.css'
import { alertVisibility } from '../store/alertStore';
import ItemCart from './ItemCart';
const Cart = ({isCartShown,closeCart,itemsCart}) => {
  const valorTotal = useSelector((state) => state.cart.valorTotal);
  const dispatch = useDispatch();
  const fixValorTotal = Math.abs(valorTotal).toLocaleString('pt-br',{style:'currency',currency:'BRL'});
  const navigate = useNavigate();
  const finalizarCompra = () =>{
    closeCart();
    navigate('/finalizar-compra');
  }
  const removeTodo = () =>{
    dispatch(cartActions.removeAll());
    dispatch(alertVisibility('Lista Eliminada','bad'))
  }
  let carritoContent = <>
  <ul className={classes.listaCarrinho}>
    {itemsCart.map(item =>
     <ItemCart item={item} key={item.id}/>
    )}
  </ul>
  <div className={classes.finalizar}>
    <span className={classes.total}>
        Total: <br /><span>{fixValorTotal}</span>
    </span>
    <button className='btn-style' onClick={finalizarCompra}>Finalizar Compra</button>
  </div>
  </>
  if(!itemsCart.length){
    carritoContent = <p className={classes.semItens}>Nada por aqui. <br /> comienze agregar los items</p>
  }

  return (
    <section className={`${classes.carrinho} ${isCartShown ? classes.shown : ''}`}>
        <div className={classes.header}>
            <p>Carrito</p>
            {itemsCart.length ? <button onClick={removeTodo}>Quitar All</button> : ''}
        </div>
        {carritoContent}
    </section>
  )
}

export default Cart
