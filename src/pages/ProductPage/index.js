import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./productpage.scss";
import ProductWrapper from "./Circle";
import Button from "../../components/Button";
import {
  AiFillLinkedin,
  AiOutlineGooglePlus,
  AiOutlineHeart,
  AiOutlineTwitter,
} from "react-icons/ai";
import { FaFacebookF, FaPinterestP } from "react-icons/fa";
import { ProductDetail } from "./ProductDetail";
import { RiArrowRightSFill } from "react-icons/ri";
import Slide from "../../components/Slide";
import Item from "../../components/Item";
import { useDispatch, useSelector } from "react-redux";
import productApi from "../../api/productApi";
import { addCart, addToCartAsync } from "../../features/cart";
import { useMediaQuery } from "../../utilities/useMediaQuery";

const ProductPage = () => {
  // const keys = useSelector((state) => state.routers.keys);

  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const keys = window.location.pathname.split("/")[2];
      const data = await productApi.getDetail({ _id: keys });
      setProductData(data);
    };
    getData();
  }, []);

  const dispatch = useDispatch();

  const [productInfo, setProductInfo] = useState({
    size: ["L", "M", "S"],
    color: ["Black", "White"],
    qtn: 1,
    selected: {
      size: 0,
      color: 0,
      qtn: 1,
    },
  });

  const remove = () => {
    if (productInfo.qtn > 1) {
      setProductInfo((p) => ({
        ...p,
        qtn: (p.qtn -= 1),
        selected: {
          ...p.selected,
          qtn: (p.qtn -= 1),
        },
      }));
    }
  };

  const add = () => {
    setProductInfo((p) => ({
      ...p,
      qtn: (p.qtn += 1),
      selected: {
        ...p.selected,
        qtn: (p.selected.qtn += 1),
      },
    }));
  };

  const changeActive = (key, data) => {
    setProductInfo((p) => ({
      ...p,
      selected: {
        ...p.selected,
        [key]: data,
      },
    }));
  };

  const baseUrl =
    "https://live.hasthemes.com/html/7/helendo-preview/helendo/assets/images/product/";

  const settings = {
    customPaging: function (i) {
      return (
        <a className="custom-slide" href="/">
          <img src={`${baseUrl}small/${i + 1}-100x100.jpg`} alt="/" />
        </a>
      );
    },
    dots: true,
    dotsClass: "custom-dot",
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const mobileSlideSetting = {
    customPaging: function (i) {
      return (
        <a className="custom-slide" href="/">
          <img src={`${baseUrl}small/${i + 1}-100x100.jpg`} alt="/" />
        </a>
      );
    },
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const coverSize = (num) => {
    switch (Number(num)) {
      case 0:
        return "Large";
      case 1:
        return "Medium";
      case 2:
        return "Small";
    }
  };

  const coverColor = (num) => {
    switch (Number(num)) {
      case 1:
        return "White";
      case 0:
        return "Black";
    }
  };

  const addToCart = (id) => {
    const localCart = localStorage.getItem("cart") || [];
    const item = {
      pId: id,
      size: coverSize(productInfo.selected.size),
      color: coverColor(productInfo.selected.color),
      qtn: productInfo.selected.qtn,
      add: true,
    };
    dispatch(addToCartAsync({ ...item }));

    if (localCart.includes(id)) {
      return;
    }

    localStorage.setItem(
      "cart",
      localCart.length > 0
        ? localCart.split(",").concat(id)
        : localCart.concat(id)
    );
  };

  const isMobile = useMediaQuery("(max-width: 375px)");

  const CanRender = () => {
    return (
      <>
        <div className="product-detail">
          {!isMobile && (
            <div className="product-detail__left">
              <Slider {...settings}>
                <div className="slide-item">
                  <img src={productData.img} alt="/" />
                </div>
                <div className="slide-item">
                  <img src={baseUrl + "single-product-02.jpg"} alt="/" />
                </div>
                <div className="slide-item">
                  <img src={baseUrl + "single-product-03.jpg"} alt="/" />
                </div>
                <div className="slide-item">
                  <img src={baseUrl + "single-product-04.jpg"} alt="/" />
                </div>
              </Slider>
            </div>
          )}

          {isMobile && (
            <div className="mobile-slide">
              <Slider {...mobileSlideSetting}>
                <div className="slide-item">
                  <img src={productData.img} alt="/" />
                </div>
                <div className="slide-item">
                  <img src={baseUrl + "single-product-02.jpg"} alt="/" />
                </div>
                <div className="slide-item">
                  <img src={baseUrl + "single-product-03.jpg"} alt="/" />
                </div>
                <div className="slide-item">
                  <img src={baseUrl + "single-product-04.jpg"} alt="/" />
                </div>
              </Slider>
            </div>
          )}

          <div className="product-detail__right">
            <h6>{productData.name}</h6>
            <h3 className="price">$ {productData.price}</h3>
            <p className="description m-20">
              At vero accusamus et iusto odio dignissimos blanditiis
              praesentiums dolores molest.
            </p>
            <ProductWrapper
              label="Size"
              data={productInfo.size}
              activeData={productInfo.selected.size}
              changeActive={changeActive}
              className="mt-10"
            />
            <ProductWrapper
              label="Color"
              type="color"
              data={productInfo.color}
              activeData={productInfo.selected.color}
              changeActive={changeActive}
              className="mt-10"
            />
            <div className="product-wrap__btns mb-20">
              <Button>
                <div className="qtn-controller">
                  <div onClick={remove}>-</div>
                  <p>{productInfo.qtn}</p>
                  <div onClick={add}>+</div>
                </div>
              </Button>
              <Button
                appearance="black"
                style={{ padding: "0 2rem", fontSize: "1.6rem" }}
                onClick={() => addToCart(productData._id)}
              >
                Add to cart
              </Button>
              <Button style={{ fontSize: "2.5rem", fontWeight: "400" }}>
                <AiOutlineHeart />
              </Button>
            </div>

            <div className="product-meta">
              <div className="meta-item">
                <span className="label">SKU:</span>
                <span>502</span>
              </div>
              <div className="meta-item">
                <span className="label">Categories:</span>
                <span>
                  <a href="/">Furniture, Table</a>
                </span>
              </div>
              <div className="meta-item">
                <span className="label">Tag:</span>
                <span>Pottery</span>
              </div>
            </div>

            <div className="meta-item product-social">
              <p className="label">Share this items :</p>
              <ul>
                <li>
                  <a href="/">
                    <AiOutlineTwitter />
                  </a>
                </li>
                <li>
                  <a href="/">
                    <FaFacebookF />
                  </a>
                </li>
                <li>
                  <a href="/">
                    <AiOutlineGooglePlus />
                  </a>
                </li>
                <li>
                  <a href="/">
                    <FaPinterestP />
                  </a>
                </li>
                <li>
                  <a href="/">
                    <AiFillLinkedin />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="product-description">
          <ul className="product-description__lists">
            <li className="product-description__item">Description</li>
            <li className="product-description__item">Additional infomation</li>
            <li className="product-description__item">Reviews</li>
          </ul>
        </div>

        <div className="product-detail-info">
          <ProductDetail
            title="Detail"
            img="https://live.hasthemes.com/html/7/helendo-preview/helendo/assets/images/product/single-product-01.jpg"
          >
            <p>
              Nam libero tempore, cum soluta nobis est eligendi optio cumque
              nihil impedit quo minus id quod maxime placeat facere possimus,
              omnis voluptas assumenda est, omnis dolor repellendus. Temporibus
              autem quibusdam et aut officiis debitis aut rerum omnis voluptas
              assumenda.
            </p>
          </ProductDetail>
          <ProductDetail
            title="Features"
            img="https://live.hasthemes.com/html/7/helendo-preview/helendo/assets/images/product/single-product-02.jpg"
          >
            <ul>
              <li>
                <RiArrowRightSFill />
                Fully padded back panel, web hauded handle
              </li>
              <li>
                <RiArrowRightSFill />
                Internal padded sleeve fits 15″ laptop
              </li>
              <li>
                <RiArrowRightSFill />
                Internal tricot lined tablet sleeve
              </li>
              <li>
                <RiArrowRightSFill />
                One large main compartment and zippered
              </li>
            </ul>
          </ProductDetail>
        </div>
        <div className="related-items">
          <h2>Related products</h2>
          <Slide>
            <div>
              <Item
                data={{
                  id: 1,
                  img: "https://live.hasthemes.com/html/7/helendo-preview/helendo/assets/images/product/1_1-300x300.jpg",
                  name: "Teapot with black tea",
                  price: "£40.00 - £635.00",
                }}
              />
            </div>
            <div>
              <Item
                data={{
                  id: 1,
                  img: "https://live.hasthemes.com/html/7/helendo-preview/helendo/assets/images/product/1_1-300x300.jpg",
                  name: "Teapot with black tea",
                  price: "£40.00 - £635.00",
                }}
              />
            </div>
            <div>
              <Item
                data={{
                  id: 1,
                  img: "https://live.hasthemes.com/html/7/helendo-preview/helendo/assets/images/product/1_1-300x300.jpg",
                  name: "Teapot with black tea",
                  price: "£40.00 - £635.00",
                }}
              />
            </div>
            <div>
              <Item
                data={{
                  id: 1,
                  img: "https://live.hasthemes.com/html/7/helendo-preview/helendo/assets/images/product/1_1-300x300.jpg",
                  name: "Teapot with black tea",
                  price: "£40.00 - £635.00",
                }}
              />
            </div>
            <div>
              <Item
                data={{
                  id: 1,
                  img: "https://live.hasthemes.com/html/7/helendo-preview/helendo/assets/images/product/1_1-300x300.jpg",
                  name: "Teapot with black tea",
                  price: "£40.00 - £635.00",
                }}
              />
            </div>
            <div>
              <Item
                data={{
                  id: 1,
                  img: "https://live.hasthemes.com/html/7/helendo-preview/helendo/assets/images/product/1_1-300x300.jpg",
                  name: "Teapot with black tea",
                  price: "£40.00 - £635.00",
                }}
              />
            </div>
          </Slide>
        </div>
      </>
    );
  };

  return <>{productData && <CanRender />}</>;
};

export default ProductPage;
