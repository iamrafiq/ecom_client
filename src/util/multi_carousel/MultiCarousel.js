import React from "react";
import UAParser from "ua-parser-js";
import CarouselRenderer from "./CarouselRenderer";

// import {
//   selectResolutionSelection,
//   selectLanguageSelection,
// } from "../../redux/settingsSlice";
// import {
// selectOfferProducts
// } from "../../redux/homeSlice";
// import { useSelector } from "react-redux";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const MultiCarousel = ({ deviceType, products }) => {
  // const resulationSelector = useSelector(selectResolutionSelection);
  // const language = useSelector(selectLanguageSelection);
   console.log("device typesssss", deviceType)
  return (products&&<CarouselRenderer deviceType={deviceType} products = {products} />);
};

MultiCarousel.getInitialProps = ({ req }) => {
  let userAgent;
  if (req) {
    userAgent = req.headers["user-agent"];
  } else {
    userAgent = navigator.userAgent;
  }
  const parser = new UAParser();
  parser.setUA(userAgent);
  const result = parser.getResult();
  const deviceType = (result.device && result.device.type) || "desktop";
  return { deviceType };
};
export default MultiCarousel;
