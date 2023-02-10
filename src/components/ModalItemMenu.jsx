import React, { useState } from 'react'
import classes from './ModalItemMenu.module.css';
import Modal from '../modal/Modal'
import { useDispatch } from 'react-redux';
import { cartActions } from '../store/cartStore';
import {alertVisibility} from '../store/alertStore'
const ModalItemMenu = ({item,onClose}) => {
 const [cantidad,setCantidad] = useState(1);
 const dispatch = useDispatch();
 
 const precio = item.preco * cantidad;
 const disminuirCantidad = () =>{
    setCantidad(prevState => {
        if(prevState === 1) return prevState;
        return prevState - 1;
    });
 }
 const aumentarCantidad = () =>{
    setCantidad(prevState =>{
        return prevState + 1;
    })
 }
 const addToCart = () =>{
    dispatch(cartActions.addItemToCart({
        id: item.id,
        precio: item.preco,
        cantidad:cantidad,
        img:item.img,
        nombre:item.nome
    }));
    dispatch(alertVisibility(`Item ${item.nome} ${cantidad} adicionado al carrito`,'ok'))
    onClose();
 }
  return (
    <Modal onClose={onClose}>
        <div className={classes.modal}>
         <div className={classes.img}>
            <img src={`./../src/assets/${item.img}`} alt={item.nome} />
         </div>
         <div className={classes.infos}>
            <h2>{item.nome}</h2>
            <p className={classes.descricao}>{item.descricao}</p>
            <div className={classes.qtdPreco}>
                <span className={classes.preco}>
                    <span>{cantidad}x</span>
                    S/. {item.preco.replace('.',',')}
                </span>
                <div className={classes.qtd}>
                    <button title='Diminuir de 1' onClick={disminuirCantidad}>-</button>
                    <button title='Adicionar mais 1' onClick={aumentarCantidad}>+</button>
                </div>
            </div>
            <div className={classes.totalContainer}>
                <span>
                    <p>Total</p>
                    <div className={classes.total}>
                        S/ {String(precio.toFixed(2)).replace('.',',')}
                    </div>
                </span>
                <button className='btn-style' onClick={addToCart}>Addicionar al carrito</button>
            </div>
         </div>

        </div>
    </Modal>
  )
}

export default ModalItemMenu