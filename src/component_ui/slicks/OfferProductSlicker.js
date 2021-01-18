import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./react-slick-custom.css";
import { Link, useLocation, useHistory } from "react-router-dom";

import { imageUrlConverter } from "../../util/ImageUrlConverter";
import { useSelector, useDispatch } from "react-redux";
import AdvertContent from "./AdvertContent";
import {
  selectResolutionSelection,
  selectLanguageSelection,
} from "../../redux/settingsSlice";
import OfferProductPortrait from "../product/OfferProductPortrait";

export default function OfferProductSlicker({ data }) {
  const location = useLocation();
  const history = useHistory();
  const resulationSelector = useSelector(selectResolutionSelection);
  const language = useSelector(selectLanguageSelection);
  const [currentIndex, setCurrentIndex] = useState(0);

  let settings = {
    dots: false,
    lazyLoad: true,
    infinite: false,
    arrows:false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 4,
    initialSlide: 0,
    swipeToSlide: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          infinite: true,
      
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: true,
        },
      },

      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  // var settings = {
  //   dots: false,
  //   fade: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   speed: 2000,
  //   pauseOnHover: false,
  //   beforeChange: (current, next) => {
  //     // console.log("adclick",advertisements[current])
  //     setCurrentIndex(current);
  //   },
  //   // nextArrow: <SampleNextArrow />,
  //   // prevArrow: <SamplePrevArrow />
  // };
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "flex",
          background: "green",
          borderRadius: "50px",
          width: "24px",
          height: "24px",
          justifyContent: "center",
          alignItems: "center",
         
        }}
        onClick={onClick}
      />
    );
  }
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "flex",
          background: "green",
          borderRadius: "50px",
          width: "24px",
          height: "24px",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={onClick}
      />
    );
  }

  const onClickAd = (event) => {};

  return (
    <Slider {...settings} style={{

        }}>
        {data.map((item, index) => (
          <div className="slick-item" index={index}>
            <OfferProductPortrait product={item}></OfferProductPortrait>
          </div>
        ))}  
      </Slider>
  );
}
