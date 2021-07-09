import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  path: "/home",
  keys: "",
  option: {},
};

const routerSlice = createSlice({
  name: "route",
  initialState,
  reducers: {
    routeChange: (state, actions) => {
      state.path = actions.payload.path;
      state.option = actions.payload.options;
      state.keys = actions.payload.keys;
    },
    addSearch: (state, actions) => {
      state.option = actions.payload;
    },
  },
});

const { reducer, actions } = routerSlice;
export const { routeChange, addSearch } = actions;

export default reducer;
