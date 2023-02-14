import React from 'react'
import { useDispatch } from 'react-redux';
import { alertVisibility } from '../store/alertStore';
import { cartActions } from '../store/cartStore';
import classes from './ItemCart.module.css';
const ItemCart = ({item}) => {
    const dispatch = useDispatch();
    const fixedPrecioItem = (valor) => Number(valor).toFixed(2).replace('.',',');
    const aumentarCantidad = () =>{
        dispatch(cartActions.addOneItemToCart(item.id));
        dispatch(alertVisibility(`Adicionado 1 unidad ${item.nombre}`,'ok'))
    }
    const disminuirCantidad = () =>{
        dispatch(cartActions.removeOneItemToCart(item.id));
        dispatch(alertVisibility(`Removido en 1 unidad ${item.nombre}`,'bad'))
    }
  return (
    <li key={item.id} className={classes.itemCarrinho}>  
    <div className={classes.img}>
        <img src={`./../src/assets/${item.img}`} alt={item.nombre} />
    </div>
    <div className={classes.header}>
        <div className={classes.tituloEPreco}>
         <p className={classes.titulo}>{item.nombre}</p>
         <p className={classes.unidade}>S/.{fixedPrecioItem(item.precio)}/cada</p>
        </div>
        <span className={classes.valor}>
            S/. {fixedPrecioItem(item.precio * item.cantidad)}
        </span>
    </div>
    <div className={classes.btnsEQtd}>
      <div className={classes.btn}>
        <button title='Disminuir en 1' onClick={disminuirCantidad}>-</button>
        <button title='Aumentar en 1' onClick={aumentarCantidad}>+</button>
      </div>
      <span>qtd. {item.cantidad}</span>
    </div>
    </li>
  )
}

export default ItemCart
