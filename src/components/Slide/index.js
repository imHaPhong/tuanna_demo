import React from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Slider from "react-slick";

const Slide = ({ children, ...props }) => {
  function BrandPrev(props) {
    const { style, onClick } = props;
    return (
      <div
        style={{
          ...style,
          fontWeight: "200",
        }}
        className="slider__button"
        onClick={onClick}
      >
        <AiOutlineArrowLeft />
      </div>
    );
  }

  function BrandNext(props) {
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
        <AiOutlineArrowRight />
      </div>
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <BrandNext />,
    prevArrow: <BrandPrev />,
    autoPlay: true,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
    ],
  };

  return (
    <Slider {...settings} className="brand-items">
      {children}
    </Slider>
  );
};

export default Slide;
