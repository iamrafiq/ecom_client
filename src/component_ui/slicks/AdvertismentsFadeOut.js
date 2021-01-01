import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./react-slick-custom.css";

import { imageUrlConverter } from "../../util/ImageUrlConverter";
import { useSelector, useDispatch } from "react-redux";

import {
  selectResolutionSelection,
  selectLanguageSelection,
} from "../../redux/settingsSlice";

export default function AdvertisimentFadeOut({ advertisements }) {
  const resulationSelector = useSelector(selectResolutionSelection);
  const language = useSelector(selectLanguageSelection);
  var settings = {
    dots: false,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    pauseOnHover: false,
  };
  return (
    <Slider {...settings}>
      {advertisements.map((item, index) => (
        <div className="slick-item">
          <img
            src={`${imageUrlConverter(
              `${item.photo}&res=${resulationSelector}`
            )}`}
            alt={item.name}
          />
        </div>
      ))}
    </Slider>
  );
}
