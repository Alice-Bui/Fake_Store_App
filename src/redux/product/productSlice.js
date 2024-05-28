import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductByID } from "../../service/productService";

// Define an initial state
const initialState = {
  productData: {},
  loading: false,
  error: null,
};

// Create asynchronous thunk action
export const loadProductData = createAsyncThunk(
  "loadProductData",
  async (productId, thunkAPI) => {
    if (!productId) {
      return thunkAPI.rejectWithValue("Product Id can't be empty.");
    }
    try {
      const res = await fetchProductByID(productId);
      return { id: productId, data: res };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadProductData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadProductData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const { id, data } = action.payload;
        state.productData[id] = data;
      })
      .addCase(loadProductData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const selectProductData = (state) => state.product;
export default productSlice.reducer;
