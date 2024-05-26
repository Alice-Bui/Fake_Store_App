// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        setCart: (state, action) => {
            state.items = action.payload;
        },
        clearCart: (state) => {
            state.items = []
        },
        addProductToCart: (state, action) =>  {
            const existingProduct = state.items.find(item => item.id === action.payload.id);
            existingProduct ? 
                existingProduct.quantity +=1
                : state.items.push({...action.payload, quantity: 1});
        },
        increaseQuantity: (state, action) => {
            const existingProduct = state.items.find(item => item.id === action.payload.id);
            if (existingProduct) {
                existingProduct.quantity +=1;
            }
        },
        decreaseQuantity: (state, action) => {
            const existingProduct = state.items.find(item => item.id === action.payload.id);
            existingProduct && existingProduct.quantity > 1 ?
                existingProduct.quantity -=1
                : state.items = state.items.filter(item => item.id !== action.payload.id);
        }
    },
});

export const { setCart, clearCart, addProductToCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export const selectCartProducts = (state) => state.cart.items;
export const selectCart = (state) => state.cart;
export default cartSlice.reducer;
