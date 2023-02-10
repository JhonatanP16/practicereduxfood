import React, { useState,useCallback, memo } from 'react'
import classes from './Menu.module.css'
import menu from '../menu-lista/menu'
import ModalItemMenu from '../components/ModalItemMenu';



const ItemCategoria = memo(({categoria,categoriaSeleccionada,cambiarCategoria}) =>{
  return <li key={categoria}><button className={ categoria === categoriaSeleccionada ? classes.btnAtivo : ''}  onClick={()=>cambiarCategoria(categoria)}>{categoria}</button></li>
});
const ItemMenu = memo(({item,displayModal})=>{
  return (
    <li className={classes.itemCardapio} onClick={()=>displayModal(item)} tabIndex='0'>
      <img src={`./../src/assets/${item.img}`} alt="" />
      <div className={classes.info}>
        <p className={classes.nome}>{item.nome}</p>
        <p className={classes.descricao}>{item.descricao}</p>
        <div className={classes.preco}>S/. {item.preco.replace('.', ',')}</div>
      </div>
    </li>
  )
});

const Menu = () => {
  const categoriasMenu = Object.keys(menu);
  const [categoriaSeleccionada,setCategoriaSeleccionada] = useState('Todas');
  const [platoModal,setPlatoModal] = useState(null);
  const cambiarCategoria = useCallback((categoria)=>{
    setCategoriaSeleccionada(categoria);
  },[])
  const displayModal = useCallback((plato)=>{
    setPlatoModal(plato);
  },[]);
  const closeModal = () =>{
    setPlatoModal(null);
  }
  let menuFiltrado = menu[categoriaSeleccionada];
  if(!menu[categoriaSeleccionada]){
    const todosItemsMenu = [];
    Object.values(menu).forEach(lista=>{
      todosItemsMenu.push(...lista);
    })
    menuFiltrado = todosItemsMenu;
  }
  
  return (
    <>
    {platoModal && <ModalItemMenu item={platoModal} onClose={closeModal}/>}
    <div className={classes.cardapio}>
      <h1>Menú</h1>
      <div className={classes.categorias}>
      <p>Categorias</p>
      <ul className={classes.listaCategorias}>
        <li><button onClick={()=>cambiarCategoria('Todas')} className={'Todas' === categoriaSeleccionada ? classes.btnAtivo : ''}>Todas</button></li>
        {
          categoriasMenu.map(categoria => (
            <ItemCategoria key={categoria} categoria={categoria} cambiarCategoria={cambiarCategoria} categoriaSeleccionada={categoriaSeleccionada}/>
          ))
        }
      </ul>
      </div>
      <ul className={classes.listaCardapio}>
        {
          menuFiltrado.map(item => (
            <ItemMenu key={item.id} item={item} displayModal={displayModal} />
          ))
        }
      </ul>
    </div>
    </>
  )
}

export default Menu