import React, { useEffect, useRef, useState } from "react";
import { BiPhone } from "react-icons/bi";
import { FiArrowRight } from "react-icons/fi";
import { BsSearch, BsHeart, BsBag } from "react-icons/bs";
import {
  AiOutlineMenu,
  AiOutlinePlayCircle,
  AiOutlineClose,
} from "react-icons/ai";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./index.scss";
import Item from "../../components/Item";
import MenuItem from "./MenuItem";
import Footer from "../../components/Footer";
import Slide from "../../components/Slide";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../../features/cart";
import Drawer from "../../components/Drawer";

const data = () => {
  return [
    {
      id: 1,
      img: "https://live.hasthemes.com/html/7/helendo-preview/helendo/assets/images/product/1_1-300x300.jpg",
      name: "Teapot with black tea",
      price: "£40.00 - £635.00",
      _id: "60dc7f62880bbc3354da9c68",
    },
    {
      id: 2,
      img: "https://live.hasthemes.com/html/7/helendo-preview/helendo/assets/images/product/1_2-300x300.jpg",
      name: "Teapot with black tea",
      price: "£20.00 - £135.00",
      _id: "60dc80a91702ab46b48f85fd",
    },
    {
      id: 3,
      img: "https://live.hasthemes.com/html/7/helendo-preview/helendo/assets/images/product/1_3-300x300.jpg",
      name: "Smooth Disk",
      price: "£46.00",
      _id: "60dc82221702ab46b48f8601",
    },
    {
      id: 4,
      img: "https://live.hasthemes.com/html/7/helendo-preview/helendo/assets/images/product/1_4-300x300.jpg",
      name: "Wooden Flowerpot",
      price: "£40.00 - £635.00",
      _id: "60dc82361702ab46b48f8605",
    },
    {
      id: 2,
      img: "https://live.hasthemes.com/html/7/helendo-preview/helendo/assets/images/product/1_5-300x300.jpg",
      name: "Living room & Bedroom lights",
      price: "£60.00 - £69.00",
      _id: "60dc824e1702ab46b48f8609",
    },
    {
      id: 4,
      img: "https://live.hasthemes.com/html/7/helendo-preview/helendo/assets/images/product/1_6-300x300.jpg",
      name: "Gray lamp",
      price: "£80.00",
      _id: "60dc82631702ab46b48f860d",
    },
    {
      id: 3,
      img: "https://live.hasthemes.com/html/7/helendo-preview/helendo/assets/images/product/1_7-300x300.jpg",
      name: "Decoration wood",
      price: "£50.00",
      _id: "60dc82631702ab46b48f860d",
    },
    {
      id: 3,
      img: "https://live.hasthemes.com/html/7/helendo-preview/helendo/assets/images/product/1_8-300x300.jpg",
      name: "Teapot with black tea",
      price: "£20.00 - £135.00",
      _id: "60dc82791702ab46b48f8611",
    },
  ];
};
const HomePage = () => {
  const [listMenu, setListMenu] = useState({
    active: 0,
    items: [
      "All Products",
      "Accessories",
      "Chair",
      "Decoration",
      "Furniture",
      "Table",
    ],
  });
  const itemData = data();
  const [isSticky, setSticky] = useState(false);
  const [search, setSearch] = useState(false);

  const ref = useRef(null);

  const dispatch = useDispatch();

  const listenToScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    if (ref.current) {
      setSticky(winScroll > ref.current.clientHeight + 100);
    }
  };

  const { wishlist } = useSelector((state) => state.actions);
  const { listItem } = useSelector((state) => state.cart);

  useEffect(() => {
    window.scrollTo(0, 0);

    window.addEventListener("scroll", listenToScroll);
    return () => {
      window.removeEventListener("scroll", listenToScroll);
    };
  }, []);

  function SamplePrevArrow(props) {
    const { style, onClick } = props;
    return (
      <div
        style={{
          ...style,
        }}
        className="slider__button"
        onClick={onClick}
      >
        <RiArrowLeftSLine />
      </div>
    );
  }

  function SampleNextArrow(props) {
    const { style, onClick } = props;
    return (
      <div
        className="slider__button"
        style={{
          ...style,
          right: "0",
          transform: "translateY(-50%)",
        }}
        onClick={onClick}
      >
        <RiArrowRightSLine />
      </div>
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    autoPlay: true,
  };

  const toggleSearch = () => {
    console.log("alo");
    setSearch((p) => !p);
  };

  return (
    <>
      <header>
        <div className="header-static">
          <div className="top-logo">
            <a href="/">
              <img
                className="logo"
                src="https://live.hasthemes.com/html/7/helendo-preview/helendo/assets/images/logo/logo.svg"
                alt=""
              />
            </a>
          </div>
          <div className="header-nav">
            <div className="header-nav__left-side">
              <BiPhone />
              +8 (268) 654 - 587- 68
            </div>
            <div className="header-nav__menu">
              <ul>
                <li>
                  <Link to="/home">Home</Link>
                </li>
                <li>
                  <Link to="/shop">Shop</Link>
                </li>
                <li>
                  <Link to="/home">Pages</Link>
                </li>
                <li>
                  <Link to="/home">Blog</Link>
                </li>
              </ul>
            </div>
            <div className="header-nav__right-side">
              <div className="header-nav__item" onClick={toggleSearch}>
                <BsSearch />
              </div>
              <Link to="/wishlist" className="header-nav__item">
                <BsHeart />
                <span>{wishlist.length}</span>
              </Link>
              <Link to="/cart" className="header-nav__item">
                <BsBag />
                <span>{listItem.length}</span>
              </Link>
              {/* <div className="header-nav__item">
              <AiOutlineMenu />
            </div> */}
            </div>
          </div>
        </div>
        <div
          className={`header-nav header-nav-sticky ${
            isSticky ? "header-nav-sticky--show" : ""
          }`}
          ref={ref}
        >
          {/* <div className="header-nav__left-side">
            <BiPhone />
            +8 (268) 654 - 587- 68
          </div> */}
          <a href="/">
            <img
              className="logo"
              src="https://live.hasthemes.com/html/7/helendo-preview/helendo/assets/images/logo/logo.svg"
              alt=""
            />
          </a>
          <div className="header-nav__menu">
            <ul>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/shop">Shop</Link>
              </li>
              <li>
                <Link to="/home">Pages</Link>
              </li>
              <li>
                <Link to="/home">Blog</Link>
              </li>
            </ul>
          </div>

          <div className="header-nav__right-side">
            <div className="header-nav__item" onClick={toggleSearch}>
              <BsSearch />
            </div>
            <Link to="/wishlist" className="header-nav__item">
              <BsHeart />
              <span>{wishlist.length}</span>
            </Link>
            <Link
              to="/cart"
              className="header-nav__item"
              onClick={() => dispatch(toggleCart())}
            >
              <BsBag />
              <span>{listItem.length}</span>
            </Link>
            {/* <div className="header-nav__item">
              <AiOutlineMenu />
            </div> */}
          </div>
        </div>
      </header>

      <div className={`search-box ${search ? "search-box--active" : ""}`}>
        <div className="search-container">
          <div className="search-header">
            <h4>Search</h4>
            <AiOutlineClose onClick={toggleSearch} />
          </div>
          <div className="search-input">
            <input type="text" />
            <BsSearch />
          </div>
        </div>
      </div>

      <div className="slider">
        <Slider {...settings}>
          <div>
            <div className="slider__container">
              <div className="hero-text">
                <h6>Helendo store</h6>
                <div>
                  <h1>
                    Hailey
                    <br />
                    Wooden Chair
                  </h1>
                </div>

                <div className="">
                  <a href="/">Discover now</a>
                </div>
              </div>
              <div className="hero-img">
                <img
                  src="https://live.hasthemes.com/html/7/helendo-preview/helendo/assets/images/hero/home-box-1.png"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div>
            <div className="slider__container">
              <div className="hero-text">
                <h6>Helendo store</h6>
                <div>
                  <h1>
                    Hailey
                    <br />
                    Wooden Chair
                  </h1>
                </div>

                <div className="">
                  <a href="/">Discover now</a>
                </div>
              </div>
              <div className="hero-img">
                <img
                  src="https://live.hasthemes.com/html/7/helendo-preview/helendo/assets/images/hero/home-box-1.png"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div>
            <div className="slider__container">
              <div className="hero-text">
                <h6>Helendo store</h6>
                <div>
                  <h1>
                    Hailey
                    <br />
                    Wooden Chair
                  </h1>
                </div>

                <div className="">
                  <a href="/">Discover now</a>
                </div>
              </div>
              <div className="hero-img">
                <img
                  src="https://live.hasthemes.com/html/7/helendo-preview/helendo/assets/images/hero/home-box-1.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </Slider>
      </div>

      <div className="about-us">
        <h2>Helendo Store</h2>
        <p>
          When you start with a portrait and search for a pure form, a clear
          volume, through successive eliminations, you arrive inevitably at the
          egg. Likewise, starting with the egg and following the same process in
          reverse, one finishes with the portrait.
        </p>
      </div>

      <div className="banner-video-box">
        <img
          src="https://live.hasthemes.com/html/7/helendo-preview/helendo/assets/images/bg/video-banner2.jpg"
          alt=""
        />
        <div className="video-icon">
          <a href="https://www.youtube.com/watch?v=fkoEj95puX0">
            <AiOutlinePlayCircle />
          </a>
        </div>
      </div>

      <div className="products">
        <div className="products-title">
          <h3 className="section-title">Popular Products</h3>
          <div className="product-tab-menu"></div>
          <ul>
            {listMenu.items.map((el, index) => (
              <MenuItem
                setActive={setListMenu}
                content={el}
                id={index}
                active={listMenu.active}
              />
            ))}
          </ul>
        </div>

        <div className="items-container">
          {listMenu.active === 0 ? (
            <>
              {itemData.map((el) => (
                <Item data={el} />
              ))}
            </>
          ) : (
            <>
              {itemData.map((el, index) => {
                if (el.id === listMenu.active) {
                  return <Item key={index} data={el} />;
                }
              })}
            </>
          )}
        </div>
      </div>

      <Slide>
        <div>
          <div className="brand-item">
            <a href="/">
              <img
                src="https://live.hasthemes.com/html/7/helendo-preview/helendo/assets/images/brand/partner1.jpg"
                alt=""
              />
            </a>
          </div>
        </div>
        <div>
          <div className="brand-item">
            <a href="/">
              <img
                src="https://live.hasthemes.com/html/7/helendo-preview/helendo/assets/images/brand/partner2.jpg"
                alt=""
              />
            </a>
          </div>
        </div>
        <div>
          <div className="brand-item">
            <a href="/">
              <img
                src="https://live.hasthemes.com/html/7/helendo-preview/helendo/assets/images/brand/partner5.jpg"
                alt=""
              />
            </a>
          </div>
        </div>
        <div>
          <div className="brand-item">
            <a href="/">
              <img
                src="https://live.hasthemes.com/html/7/helendo-preview/helendo/assets/images/brand/partner4.jpg"
                alt=""
              />
            </a>
          </div>
        </div>
        <div>
          <div className="brand-item">
            <a href="/">
              <img
                src="https://live.hasthemes.com/html/7/helendo-preview/helendo/assets/images/brand/partner3.jpg"
                alt=""
              />
            </a>
          </div>
        </div>
        <div>
          <div className="brand-item">
            <a href="/">
              <img
                src="https://live.hasthemes.com/html/7/helendo-preview/helendo/assets/images/brand/partner4.jpg"
                alt=""
              />
            </a>
          </div>
        </div>
      </Slide>

      <div className="newsletter-container">
        <div className="newsletter-title">
          <h3>Our Newsletter</h3>
          <p>Subscribe our newsletter and get discount 50% off</p>
        </div>
        <div className="input-container">
          <input type="text" placeholder="Your email address" />
          <FiArrowRight />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default HomePage;
