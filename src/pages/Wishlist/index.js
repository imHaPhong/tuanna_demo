import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import productApi from "../../api/productApi";
import Button from "../../components/Button";
import "./wishlist.scss";
import { Link } from "react-router-dom";
import { removeWishlist } from "../../features/actions";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.actions.wishlist);

  const [listItem, setListItem] = useState([]);

  const deleteWishList = (id) => {
    dispatch(removeWishlist(id));
    setListItem((p) => p.filter((el) => el._id != id));
    const localWishlist = localStorage.getItem("wishlist");
    const listItem = localWishlist.split(",");
    localStorage.setItem(
      "wishlist",
      listItem.filter((el) => el != id)
    );
  };

  useEffect(() => {
    const getData = async () => {
      const data = await productApi.getWishlist({ id: wishlist });
      if (data) {
        setListItem(data);
      }
    };

    getData();
  }, [wishlist]);

  return (
    <div className="wishlist-container">
      <table>
        <thead>
          <tr>
            <td></td>
            <td></td>
            <td>Product</td>
            <td>Unit Price</td>
            <td>Stock Status</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {listItem.map((el) => {
            return (
              <tr>
                <td>
                  <AiOutlineClose onClick={() => deleteWishList(el._id)} />
                </td>
                <td>
                  <img src={el.img} alt="product-img" />
                </td>
                <td>{el.name}</td>
                <td> $ {el.price}</td>
                <td>In Stock</td>
                <td>
                  <Button appearance="black">
                    <Link to={`/shop/${el._id}`} style={{ color: "white" }}>
                      Add to cart
                    </Link>
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Wishlist;
