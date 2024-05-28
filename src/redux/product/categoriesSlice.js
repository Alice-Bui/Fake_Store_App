// productListSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCategories } from "../../service/productService";

// Define an initial state
const initialState = {
    categoriesData: {},
    loading: false,
    error: null,
};

// Create an asynchronous thunk action
export const loadCategoriesData = createAsyncThunk(
  "loadCategories",
  async (thunkAPI) => {
    try {
      const ret = await fetchCategories();
      return ret;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCategoriesData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCategoriesData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.categoriesData = action.payload;
      })
      .addCase(loadCategoriesData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.categoriesData = {};
      });
  },
});
export const selectCategories = (state) => state.categories;
export default categoriesSlice.reducer;
