import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Redirect, Switch, Route, useHistory } from "react-router-dom";
import { routeChange } from "./features/router";
import { PageDatailLayout } from "./Layout/PageDatailLayout";
import About from "./pages/AboutPage";
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import ProductPage from "./pages/ProductPage";
import Shop from "./pages/ShopPage";
import Wishlist from "./pages/Wishlist";

const Routers = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const routers = useSelector((state) => state.routers);

  useEffect(() => {
    history.listen((location, action) => {
      dispatch(
        routeChange({
          path: location.pathname,
          keys: location.pathname.split("/")[2],
          options: {
            search: location.search,
          },
        })
      );
    });
  }, []);

  return (
    <>
      <Switch>
        <Redirect from="/" to="/home" exact />

        {/* <Route path="/login" component={Login} /> */}
        <Route path="/home" exact component={HomePage} />
        <Route path="/shop" exact>
          <PageDatailLayout title="shop">
            <Shop />
          </PageDatailLayout>
        </Route>
        <Route path="/about" exact>
          <PageDatailLayout>
            <About />
          </PageDatailLayout>
        </Route>
        <Route path="/shop/:id" exact>
          <PageDatailLayout title="shop">
            <ProductPage />
          </PageDatailLayout>
        </Route>
        <Route path="/wishlist" exact>
          <PageDatailLayout title="Wishlist">
            <Wishlist />
          </PageDatailLayout>
        </Route>
        <Route path="/cart" exact>
          <PageDatailLayout title="Cart">
            <CartPage />
          </PageDatailLayout>
        </Route>
      </Switch>
    </>
  );
};

export default Routers;
