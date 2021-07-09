import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productApi from "../../api/productApi";

export const addToCartAsync = createAsyncThunk(
  "user/addToCart",
  async (params) => {
    const data = await productApi.addToCart(params);
    return data;
  }
);

const initialState = {
  listItem: [],
  open: false,
  loading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart: (state, actions) => {
      state.open = !state.open;
      state.listItem = state.listItem;
      state.loading = false;
      return state;
    },
    addCart: (state, actions) => {
      state.open = true;
      state.loading = false;
      if (!state.listItem.includes(actions.payload)) {
        state.listItem = state.listItem.concat(actions.payload);
      }
    },
    loadCart: (state, actions) => {
      state.open = false;
      state.listItem = actions.payload;
      state.loading = false;
    },
  },
  extraReducers: {
    [addToCartAsync.pending]: (state, action) => {
      state.loading = false;
    },
    [addToCartAsync.fulfilled]: (state, action) => {
      state.open = true;
      state.listItem = action.payload.items;
      state.loading = false;
    },
    [addToCartAsync.rejected]: (state, action) => {},
  },
});

const { reducer, actions } = cartSlice;
export const { toggleCart, addCart, loadCart } = actions;
export default reducer;
