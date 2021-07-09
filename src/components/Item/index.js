import React from "react";
import "./item.scss";

import { BsPlus, BsBag } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../../features/actions";
import { addCart, toggleCart } from "../../features/cart";
import productApi from "../../api/productApi";
import { Link } from "react-router-dom";

const Item = ({ badge, color, content, data, ...props }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { wishlist } = useSelector((state) => state.actions);
  const { listItem } = useSelector((state) => state.cart);

  const productInfo = (id) => {
    history.push(`${history.location.pathname}/${id}`);
  };

  const addToWishlistHandler = (e, id) => {
    e.preventDefault();

    const isExist = wishlist.includes(id);
    if (isExist) return;

    const addData = wishlist.concat(id);
    localStorage.setItem("wishlist", addData);
    dispatch(addToWishlist(id));
  };

  const addToCart = (e, id) => {
    e.preventDefault();
    dispatch(addCart(id));
    var arrItem = [];

    if (!listItem.includes(id)) {
      arrItem = listItem.concat(id);
    } else {
      arrItem = listItem;
    }

    productApi.addToCart({
      pId: id,
      add: true,
      qtn: 1,
    });

    localStorage.setItem("cart", arrItem);
  };

  return (
    <div className="item-container" {...props}>
      {badge && (
        <div className="badge-container">
          <p>{data.name}</p>
        </div>
      )}
      <div className="item-img">
        <Link to={`/shop/${data._id}`}>
          <img src={data.img} alt="" />
        </Link>

        <div className="actions">
          <div className="action">
            <a href="/">
              <BsPlus />
            </a>
          </div>
          <div className="action">
            <a href="/" onClick={(e) => addToWishlistHandler(e, data._id)}>
              <AiOutlineHeart />
            </a>
          </div>
          <div className="action">
            <Link to={`/shop/${data._id}`}>
              <BsBag />
            </Link>
          </div>
        </div>
      </div>

      <h4>
        <Link to={`/shop/${data._id}`}>{data.name}</Link>
      </h4>

      <p className="item-price">$ {data.price}</p>
    </div>
  );
};

export default Item;
