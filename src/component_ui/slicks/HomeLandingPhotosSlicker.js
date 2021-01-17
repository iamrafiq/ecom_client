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

export default function AdvertisimentFadeOut({ photoEn, photoBengali }) {
  const location = useLocation();
  const history = useHistory();
  const resulationSelector = useSelector(selectResolutionSelection);
  const language = useSelector(selectLanguageSelection);
  const [currentIndex, setCurrentIndex] = useState(0);

  var settings = {
    dots: true,
     fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    pauseOnHover: false,
   
  };
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "red" }}
        onClick={onClick}
      />
    );
  }
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }
  


  return (
    <Slider {...settings} >
      {language === "en"?(photoEn.map((item, index) => (
        <div className="slick-item slick-item-landing-photo" index={index}>
          <img
            src={`${imageUrlConverter(
              `${item}&res=${resulationSelector}`
            )}`}
          />
        </div>
      ))):(photoBengali.map((item, index) => (
        <div className="slick-item slick-item-landing-photo" index={index}>
          <img
            src={`${imageUrlConverter(
              `${item}&res=${resulationSelector}`
            )}`}
          />
        </div>
      )))}
   
    </Slider>
  );
}
