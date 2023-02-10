import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:'cart',
    initialState: {items:[],totalItems:0,valorTotal:0},
    reducers:{
        addItemToCart(state,action){
            const itemExistInList = state.items.find(item => item.id === action.payload.id);
            state.totalItems += action.payload.cantidad;
            state.valorTotal += Number(action.payload.precio) * action.payload.cantidad;
            if(itemExistInList){
                itemExistInList.cantidad += action.payload.cantidad;
            }else{
                state.items.push(action.payload)
            }
        },
        addOneItemToCart(state,action){
            const itemExistInList = state.items.find(item => item.id === action.payload);
            state.totalItems++;
            itemExistInList.cantidad++;
            state.valorTotal += Number(itemExistInList.precio);
        },
        removeOneItemToCart(state,action){
            const id = action.payload;
            const itemExistInList = state.items.find(item => item.id === id);
            state.totalItems--;
            itemExistInList.cantidad--;
            if(itemExistInList.cantidad === 0){
                state.items = state.items.filter(item => item.id !== id);
            }
        },
        removeAll(state){
            state.items = [];
            state.totalItems = 0;
            state.valorTotal = 0;
        }
    }
})
export const cartActions = cartSlice.actions;
export default cartSlice.reducer;