import React from 'react'
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';
const Backdrop = ({onClose}) =>{
    return(
        <div className={classes.modalBackdrop} onClick={onClose}></div>
    )
}
const ModalContent = ({onClose,children}) => {
  return(
    <>
    <button onClick={onClose} className={classes.buttonClose}>X</button>
    <div className={classes.modal}>
        <div className={classes.modalContent}>
         {children}
        </div>
    </div>
    </>
  )
    
}
const modalContainer = document.getElementById('modal');
const Modal = ({onClose,children}) => {
  return (
    <>
    {ReactDOM.createPortal(<Backdrop onClose={onClose}/>,modalContainer)}
    {ReactDOM.createPortal(<ModalContent onClose={onClose} children={children}/>,modalContainer)}
    </>
  )
}

export default Modal