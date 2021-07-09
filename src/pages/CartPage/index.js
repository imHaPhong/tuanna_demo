import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import "./cartPage.scss";
import CartItem from "./CartItem";
import productApi from "../../api/productApi";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [total, setTotal] = useState(0);
  const [listItem, setListItem] = useState([]);

  useEffect(() => {
    const geteData = async () => {
      const data = await productApi.getCart();
      setListItem(data.order);
    };

    geteData();
  }, []);

  return (
    <div>
      <div className="cart-container">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {listItem &&
              listItem.map((el) => (
                <CartItem itemData={el} setTotal={setTotal} />
              ))}
          </tbody>
        </table>
        <Button appearance="black" style={{ display: "inlineBlock" }}>
          <AiOutlineArrowLeft /> <Link to="/shop"> Continue Shopping</Link>
        </Button>
        <div className="cart-bottom">
          <div className="discount-code">
            <h6>Coupon Discount</h6>
            <p>Enter your coupon code if you have one.</p>
            <input type="text" placeholder="Coupon code" />
            <Button>Apply counpon</Button>
          </div>
          <div className="cart-total">
            <div className="cart-total__container">
              <div className="cart-grand-content">
                <ul>
                  <li>
                    <span className="label">Subtotal</span>
                    <span>${total}.00</span>
                  </li>
                  <li>
                    <span className="label">Subtotal</span>
                    <span>${total}.00</span>
                  </li>
                </ul>
              </div>
              <Button appearance="black">Proceed to checkout</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
