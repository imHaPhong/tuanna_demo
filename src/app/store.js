import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/index";
import routerReducer from "../features/router/index";
import actionsReducer from "../features/actions/index";
import cartReducer from "../features/cart/index";

export const store = configureStore({
  reducer: {
    product: productReducer,
    routers: routerReducer,
    actions: actionsReducer,
    cart: cartReducer,
  },
});
