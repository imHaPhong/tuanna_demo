import React from "react";

const MenuItem = ({ setActive, id, content, active }) => {
  const itemClickhandle = (e, id) => {
    e.preventDefault();
    setActive((p) => ({ ...p, active: id }));
  };
  return (
    <li className={`${active === id ? "active" : ""}`}>
      <a href="/" onClick={(e) => itemClickhandle(e, id)}>
        {content}
      </a>
    </li>
  );
};

export default MenuItem;
