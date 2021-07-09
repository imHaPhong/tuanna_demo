import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import productApi from "../../api/productApi";

const CartItem = ({ itemData, setTotal }) => {
  const [qtn, setQtn] = useState({
    qtn: itemData.qtn,
    total: itemData.item.price * itemData.qtn,
    price: itemData.item.price,
  });

  useEffect(() => {
    setTotal((p) => (p += itemData.item.price * itemData.qtn));
  }, []);

  const addBtn = async (id) => {
    setQtn((p) => ({
      ...p,
      qtn: (p.qtn += 1),
      total: Number(p.total) + Number(p.price),
    }));
    setTotal((p) => (p += Number(itemData.item.price)));
    productApi.updateCart({
      id,
      add: true,
    });
  };

  const removeBtn = async () => {
    if (qtn.qtn > 1) {
      setQtn((p) => ({
        ...p,
        qtn: (p.qtn -= 1),
        total: p.total - p.price,
      }));
      setTotal((p) => (p -= itemData.item.price));
    }
  };

  return (
    <tr>
      <td>
        <img src={itemData.item.img} alt="" />
      </td>

      <td> Plant pots</td>
      <td>$ {qtn.price}.00</td>
      <td>
        <span onClick={() => removeBtn(itemData._id)}>-</span>
        <span>{qtn.qtn}</span>
        <span onClick={() => addBtn(itemData._id)}>+</span>
      </td>
      <td>{qtn.total}.00</td>

      <td>
        <AiOutlineClose />
      </td>
    </tr>
  );
};

export default CartItem;
