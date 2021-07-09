import React, { useEffect } from "react";
import "rsuite/dist/styles/rsuite-default.css";
import "./style/index.scss";
import Routers from "./Router";
import { useDispatch } from "react-redux";
import { routeChange } from "./features/router";
import { loadActions } from "./features/actions";
import { loadCart } from "./features/cart";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    var wishlist = localStorage.getItem("wishlist") || [];
    var cart = localStorage.getItem("cart") || [];
    if (wishlist.length > 0) {
      wishlist = wishlist.split(",");
    }
    if (cart.length > 0) {
      cart = cart.split(",");
    }
    dispatch(loadActions({ wishlist, cart }));
    dispatch(loadCart(cart));

    dispatch(
      routeChange({
        path: window.location.pathname,
        keys: window.location.pathname.split("/")[2],
        options: {
          search: window.location.search,
        },
      })
    );
  }, [dispatch]);
  return <Routers />;
}

export default App;
