import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./react-slick-custom.css";
import { Link, useLocation, useHistory } from "react-router-dom";

import { imageUrlConverter } from "../../util/ImageUrlConverter";
import { useSelector, useDispatch } from "react-redux";

import {
  selectResolutionSelection,
  selectLanguageSelection,
} from "../../redux/settingsSlice";

export default function AdvertContent({ advert }) {
    console.log("advert", advert)
  const location = useLocation();
  const history = useHistory();
  const resulationSelector = useSelector(selectResolutionSelection);
  const language = useSelector(selectLanguageSelection);
 
  const onClickAd = (ad) => {
    console.log("advert", ad);
    // if (ad.linkType === 1) {
    //   history.push({
    //     pathname: `/products/${ad.linkSlug}`,
    //   });
    // }
  };

  return (
    <div className="slick-item" onClick={() => onClickAd(advert)}>
      <img
        src={`${imageUrlConverter(`${advert.photo}&res=${resulationSelector}`)}`}
        alt={advert.name}
      />
    </div>
  );
}
