// src/redux/ShopListSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchShopListByCategory } from "../service/apiService";

// Define an initial state
const initialState = {
  ShopListData: {},
  loading: false,
  error: null,
};

// Create an asynchronous thunk action
export const loadShopListData = createAsyncThunk(
  "loadShopList",
  async (productCategory, thunkAPI) => {
    try {
      const ret = await fetchShopListByCategory(productCategory);
      return ret;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const ShopListSlice = createSlice({
  name: "ShopList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadShopListData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadShopListData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.ShopListData = action.payload;
      })
      .addCase(loadShopListData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.ShopListData = {};
      });
  },
});
export const selectShopList = (state) => state.ShopList;
export default ShopListSlice.reducer;
