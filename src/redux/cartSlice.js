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
    },
});

export const { addProductToCart } = cartSlice.actions;
export const selectCartProducts = (state) => state.cart.products;
export default cartSlice.reducer;
