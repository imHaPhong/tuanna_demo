import React, { useEffect, useRef, useState } from "react";
import { BsSearch, BsHeart, BsBag } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import "./header.scss";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../../features/cart";

const Header = ({ setOpen }) => {
  const headerRef = useRef(null);
  const [slick, setSlick] = useState(false);

  const history = useHistory();

  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.actions);
  const { listItem } = useSelector((state) => state.cart);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);

    return () => {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const scrollHandler = () => {
    setSlick(
      document.documentElement.scrollTop > headerRef.current.clientHeight * 4
    );
  };

  const [value, setValue] = useState("");

  const userSubmitHandler = (e) => {
    if (e.keyCode === 13) {
      history.push(`/shop?name=${value}`);
    }
  };

  return (
    <div className="c-header">
      <div
        className={`header-nav ${slick ? "slick-header" : ""}`}
        ref={headerRef}
      >
        <div className="header-nav__left-side" style={{ width: "25%" }}>
          <div className="search-input" style={{ margin: "0", width: "100%" }}>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.currentTarget.value)}
              placeholder="Search anything..."
              onKeyDown={userSubmitHandler}
            />
            <BsSearch />
          </div>
        </div>
        <div className="header-nav__menu">
          <img
            style={{ cursor: "pointer" }}
            onClick={() => history.push("/home")}
            src="https://live.hasthemes.com/html/7/helendo-preview/helendo/assets/images/logo/logo.svg"
            alt=""
          />
        </div>
        <div
          className="header-nav__right-side"
          style={{
            width: "25%",
            justifyContent: "flex-end",
          }}
        >
          <div className="header-nav__item">
            <AiOutlineUser />
          </div>
          <div
            className="header-nav__item"
            onClick={() => {
              history.push("/wishlist");
            }}
          >
            <BsHeart />
            <span>{wishlist.length || 0}</span>
          </div>
          <div
            className="header-nav__item"
            onClick={() => {
              dispatch(toggleCart());
            }}
          >
            <BsBag />
            <span>{listItem.length || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
