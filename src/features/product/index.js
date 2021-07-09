import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productApi from "../../api/productApi";

export const getProductList = createAsyncThunk(
  "user/getProducts",
  async (params, thunkAPI) => {
    const data = await productApi.getAll();
    return data;
  }
);

export const filterBy = createAsyncThunk(
  "user/filterBy",
  async (params, thunkAPI) => {
    console.log(params);

    const data = await productApi.filterBy(params);
    return data;
  }
);

const initialState = {
  products: [],
  filter: "",
  page: 1,
  limit: 4,
  loading: false,
  total: 10,
  count: 0,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    fetchData: (state, action) => {
      state.products = action.payload;
    },
    changeFilter: () => {},
    changePage: (state, action) => {
      if (action.payload === "next") {
        state.page = Number(state.page) + 1;
      } else {
        state.page = Number(state.page) - 1;
      }
    },
    loadPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: {
    [getProductList.pending]: (state, actions) => {
      state.loading = true;
    },
    [getProductList.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload.result;
      state.total = action.payload.total;
      state.count = action.payload.count;
    },
    [getProductList.rejected]: (state, action) => {
      state.loading = false;
    },
    [filterBy.pending]: (state, actions) => {
      state.loading = true;
      state.products = [];
    },
    [filterBy.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload.result;
      state.total = action.payload.total;
      state.count = action.payload.count;
    },
    [filterBy.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

const { reducer, actions } = productSlice;
export const { fetchData, changeFilter, changePage, loadPage } = actions;
export default reducer;
