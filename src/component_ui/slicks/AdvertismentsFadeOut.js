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

export default function AdvertisimentFadeOut({ advertisements }) {
  const location = useLocation();
  const history = useHistory();
  const resulationSelector = useSelector(selectResolutionSelection);
  const language = useSelector(selectLanguageSelection);
  const [currentIndex, setCurrentIndex] = useState(0);

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
    beforeChange: (current, next) => {
      // console.log("adclick",advertisements[current])
      setCurrentIndex(current);
    },
  };
  const onClickAd = (event) => {
     console.log("adclick", advertisements[currentIndex]);
    if (advertisements[currentIndex].linkType === 0) {
      history.push({
        pathname: `/products/${advertisements[currentIndex].linkSlug}`,
      });
    }else{
      history.push({
        pathname: `/products/${advertisements[currentIndex].linkSlug}`,
        search:`?advertProduct=${advertisements[currentIndex].linkProductSlug}`
      });
    }
  };

  return (
    <Slider {...settings} >
      {advertisements.map((item, index) => (
        <div className="slick-item" index={index} onClick={(event) => onClickAd(event)}>
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
