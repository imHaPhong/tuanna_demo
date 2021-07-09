import React, { useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./drawer.scss";
import Button from "../Button/index";
import CartItem from "./Item";
import { toggleCart } from "../../features/cart";
import { useDispatch, useSelector } from "react-redux";
import productApi from "../../api/productApi";
import { Link } from "react-router-dom";

const Drawer = ({ setOpen, isOpen, className }) => {
  const drawerRef = useRef();
  const dispatch = useDispatch();

  const { listItem, loading } = useSelector((state) => state.cart);
  const [cartItem, setCartItem] = useState([]);

  var [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const getData = () => {
      if (!loading) {
        setTimeout(async () => {
          const data = await productApi.getCart();
          setCartItem(data.order);
          setTotalPrice(data.total);
        }, 200);
      }
    };
    getData();
  }, [listItem, isOpen, loading]);

  const clickHandle = useCallback(
    (e) => {
      if (isOpen) {
        if (e.target === drawerRef.current) {
          dispatch(toggleCart());
        }
      }
    },
    [isOpen]
  );

  useEffect(() => {
    window.addEventListener("click", clickHandle);

    return () => {
      window.removeEventListener("click", clickHandle);
    };
  }, [clickHandle]);

  return (
    <div className={`drawer-container ${className}`} ref={drawerRef}>
      <div className={`drawer-content ${isOpen ? "active" : ""}`}>
        <AiOutlineClose onClick={() => dispatch(toggleCart())} />
        <div className="cart">
          {cartItem && cartItem.map((el) => <CartItem data={el} />)}
        </div>
        <div className="drawer-price">
          <span>Subtotal:</span>
          <span>$ {totalPrice}</span>
        </div>
        <Button style={{ marginBottom: "15px" }} className="fist">
          <Link onClick={() => dispatch(toggleCart())} to="/cart">
            View cart
          </Link>
        </Button>

        <Button appearance="black">Checkout</Button>
      </div>
    </div>
  );
};

export default Drawer;
