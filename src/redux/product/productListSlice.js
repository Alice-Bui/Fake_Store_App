// productListSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductListByCategory } from "../../service/productService";

// Define an initial state
const initialState = {
    productListData: {},
    loading: false,
    error: null
};

// Create an asynchronous thunk action
export const loadProductListData = createAsyncThunk(
  "loadProductList",
  async (productCategory, thunkAPI) => {
    if (!productCategory)
        return thunkAPI.rejectWithValue("Product Category can't be empty.");
    try {
      const ret = await fetchProductListByCategory(productCategory);
      return { category: productCategory, data: ret }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const productListSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadProductListData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadProductListData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const { category, data } = action.payload
        state.productListData[category] = data;
      })
      .addCase(loadProductListData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const selectProductList = (state) => state.productList;
export default productListSlice.reducer;
