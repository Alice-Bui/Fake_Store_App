// store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";
import orderReducer from "./orderSlice";

export default configureStore({
    reducer: {
        cart: cartReducer,
        user: userReducer,
        orderData: orderReducer
    },
});