import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
    },
    reducers: {
        addProductToCart: (state, action) =>  {
            state.products.push(action.payload);
        },
    },
});

export const { addProductToCart } = cartSlice.actions;
export const selectCartProducts = (state) => state.cart.products;
export default cartSlice.reducer;
