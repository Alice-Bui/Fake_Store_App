// store.js
import { configureStore } from "@reduxjs/toolkit";
import productListReducer from "./product/productListSlice";
import productReducer from "./product/productSlice"
import categoriesReducer from "./product/categoriesSlice"
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";
import orderReducer from "./orderSlice";

export const store = configureStore({
    reducer: {
        categories: categoriesReducer,
        productList: productListReducer,
        product: productReducer,
        cart: cartReducer,
        user: userReducer,
        orderData: orderReducer
    },
});

export default store;