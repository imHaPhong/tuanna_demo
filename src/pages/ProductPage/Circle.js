import React from "react";
import { AiOutlineCheck } from "react-icons/ai";

const Circle = ({ content, active, type, ...props }) => {
  return (
    <div className="size-container__sizes" {...props}>
      <div
        className={`circle-container mb-10 ${active ? "active" : ""} ${
          type && active ? "color-active" : ""
        }`}
      >
        {!type && <p>{content}</p>}
        {type && active && <AiOutlineCheck />}
      </div>
    </div>
  );
};

const ProductWrapper = ({
  data = [],
  activeData,
  changeActive,
  label,
  type = null,
  ...props
}) => {
  const clickHandle = (index) => {
    changeActive(label.toString().toLowerCase(), index);
  };

  return (
    <div className="size-container" {...props}>
      <div className="size-container__title mb-10">
        <p className="size-container__label"> {label}</p>
        {data.map((el, index) => (
          <span className={`${index === activeData ? "active" : ""}`}>
            {el}
          </span>
        ))}
      </div>
      <div className="size-container__sizes">
        {data.map((el, index) => (
          <Circle
            type={type}
            onClick={() => clickHandle(index)}
            content={el}
            active={activeData === index}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductWrapper;
