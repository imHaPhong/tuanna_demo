import React from "react";

export const ProductDetail = ({ title, children, img }) => {
  return (
    <div className="product-detail-wrap">
      <div className="info__left">
        <h5>{title}</h5>
        {children}
      </div>

      <div className="info__right">
        <img src={img} alt="/" />
      </div>
    </div>
  );
};
