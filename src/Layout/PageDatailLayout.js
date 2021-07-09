import React, { useEffect, useRef, useState } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Drawer from "../components/Drawer";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "./pageDetail.scss";

export const PageDatailLayout = ({ title, name, children }) => {
  const history = useHistory();
  const [read, setRead] = useState({
    islast: false,
  });

  const [position, setPosition] = useState(0);
  const [show, setShow] = useState(false);

  const prevPosition = useRef(0);

  const cart = useSelector((state) => state.cart);

  const eventHandle = () => {
    setPosition(document.documentElement.scrollTop);
    // document.documentElement.scrollTop ||
    // &&  prevPosition.current < document.documentElement.scrollTop

    if (
      (document.documentElement.offsetHeight - 800,
      document.documentElement.clientHeight || 0)
    ) {
      setRead(true);
    }
    if (100 > document.documentElement.scrollTop) {
      setRead(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    window.addEventListener("scroll", eventHandle);
    return () => {
      window.removeEventListener("scroll", eventHandle);
    };
  }, []);

  useEffect(() => {
    prevPosition.current = position;
  }, [position]);

  return (
    <>
      <Header setOpen={setShow} />
      <div className="breadcrumb">
        <h2>{title}</h2>

        <ul className="breadcrumb-list">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item breadcrumb-item--active">
            <a href="/">{history.location.pathname.split("/")[1]}</a>
          </li>
        </ul>
      </div>
      <div className="content-container ">{children}</div>
      <div className={`top-up ${read ? "active" : ""}`}>
        <div
          className="scroll-top "
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <AiOutlineArrowUp />
        </div>
      </div>
      <Drawer isOpen={cart.open} className={`${cart.open ? "isShow" : ""}`} />
      <Footer />
    </>
  );
};
