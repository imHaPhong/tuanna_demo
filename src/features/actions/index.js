import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: [],
  cart: [],
};

const actionSlice = createSlice({
  name: "actionSlice",
  initialState,
  reducers: {
    addToWishlist: (state, actions) => {
      state.wishlist = state.wishlist.concat(actions.payload);
    },
    addToCart: (state, actions) => {},
    loadActions: (state, actions) => {
      state.wishlist = actions.payload.wishlist;
      state.cart = actions.payload.cart;
    },
    removeWishlist: (state, actions) => {
      state.wishlist = state.wishlist.filter((el) => el != actions.payload);
    },
  },
});

const { reducer, actions } = actionSlice;
export const { addToCart, addToWishlist, loadActions, removeWishlist } =
  actions;

export default reducer;
