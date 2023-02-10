import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
    name:'alert',
    initialState:{message:'',alertIsShow:false,type:''},
    reducers:{
        changeMessage(state,action){
            state.message = action.payload.message;
            state.alertIsShow = true;
            state.type= action.payload.type;
        },
        hideAlert(state){
            state.alerIsShow = false;
        }
    }
});

export const alertActions = alertSlice.actions;

let alertTimeOut;

export const alertVisibility = (message,type) =>{
    return(dispatch) =>{
        clearTimeout(alertTimeOut)
        dispatch(alertActions.changeMessage({message,type}));
        alertTimeOut = setTimeout(()=>{
            dispatch(alertActions.hideAlert());
        },1500)
    }   
}

export default alertSlice.reducer;