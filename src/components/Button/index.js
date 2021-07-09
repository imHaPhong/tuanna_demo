import React from "react";
import "./index.scss";

const Button = ({ children, appearance = "white", className, ...props }) => {
  return (
    <div
      className={`btn-container ${
        appearance === "black" ? "btn--black" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Button;
