import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const CartItem = ({ data }) => {
  return (
    <div className="cart-item-container">
      <div className="item-detail">
        <div>
          <img src={data.item.img} alt="" />
        </div>
        <div>
          <a href="/">Plant pots</a>
          <div className="m-10">
            <span className="label">Qty:</span>
            <span>{data.qtn}</span>
          </div>
          <div>
            <span className="item-price">
              <span className="label">Price:</span>
              <span>$ {data.item.price}</span>
            </span>
          </div>
        </div>
      </div>
      <AiOutlineClose />
    </div>
  );
};

export default CartItem;
