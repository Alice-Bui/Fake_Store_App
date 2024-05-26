// store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice"
import { useReducer } from "react";

export default configureStore({
    reducer: {
        cart: cartReducer,
        user: userReducer
    },
});