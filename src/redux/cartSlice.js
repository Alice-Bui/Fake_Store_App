import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
    },
    reducers: {
        addProductToCart: (state, action) =>  {
            const existingProduct = state.products.find(product => product.id === action.payload.id);
            existingProduct ? 
                existingProduct.quantity +=1
                : state.products.push({...action.payload, quantity: 1});
        },
        increaseQuantity: (state, action) => {
            const existingProduct = state.products.find(product => product.id === action.payload.id);
            if (existingProduct) {
                existingProduct.quantity +=1;
            }
        },
        decreaseQuantity: (state, action) => {
            const existingProduct = state.products.find(product => product.id === action.payload.id);
            existingProduct && existingProduct.quantity > 1 ?
                existingProduct.quantity -=1
                : state.products = state.products.filter(product => product.id !== action.payload.id);
        }
    },
});

export const { addProductToCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export const selectCartProducts = (state) => state.cart.products;
export default cartSlice.reducer;
