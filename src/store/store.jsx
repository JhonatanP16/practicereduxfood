import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartStore'
import alertReducer from './alertStore'
const store = configureStore({
    reducer:{
        cart: cartReducer,
        alert: alertReducer,
    }
});

export default store;