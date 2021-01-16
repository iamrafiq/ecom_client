import React from "react";
import { useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { CategoryRect120 } from "../category/Category";

import {
  selectResolutionSelection,
  selectLanguageSelection,
  selectDeviceTypeSelection,
} from "../../redux/settingsSlice";
import { selectHomeSelection, selectHomeLoaded, selectCategories, selectAdvertisements, selectOfferProducts } from "../../redux/homeSlice";
import Advertisiment from "../../util/Advertisiment";
import Carousel from "../../util/Carousel";
import OfferProductSlicker from "../slicks/OfferProductSlicker";
import Category120Slicker from "../slicks/Category120Slicker";
import TutorialSlick from "../slicks/TutorialSlick";
import FeatureGallery from "./FeatureGallery";
import Footer from "../footer/Footer";
import "./home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { imageUrlConverter } from "../../util/ImageUrlConverter";

var FontAwesome = require("react-fontawesome");

export default function Home(props) {
  const history = useHistory();

  const resulationSelector = useSelector(selectResolutionSelection);
  const language = useSelector(selectLanguageSelection);
  const deviceType = useSelector(selectDeviceTypeSelection);

  const home = useSelector(selectHomeSelection);
  const advertisements = useSelector(selectAdvertisements);
  const categories = useSelector(selectCategories);
  const offerProducts = useSelector(selectOfferProducts);

  console.log("home..home", home)
  const homeLoaded = useSelector(selectHomeLoaded);

  const configPropsCarouselLanding = {
    showArrows: false,
    showStatus: false,
    autoPlay: true,
    infiniteLoop: true,
    showThumbs: false,
    showIndicators: true,
    useKeyboardArrows: true,
    stopOnHover: false,
    swipeable: true,
    interval: 5000,
    dynamicHeight: false,
    stopOnHover: false,
  };
  const configPropsCarouselTutorial = {
    showArrows: true,
    showStatus: true,
    autoPlay: true,
    infiniteLoop: true,
    showThumbs: false,
    showIndicators: true,
    useKeyboardArrows: true,
    stopOnHover: false,
    swipeable: true,
    interval: 2000,
    dynamicHeight: false,
    stopOnHover: true,
  };

  console.log("home....", home);
  useEffect(() => {}, []);
  // const categories = (items) => {
  //   return items.map((item, index) => {
  //     if (item.showHome === 1) {
  //       return (
  //         <div
  //           onClick={() => {
  //             history.push({
  //               pathname: `/products/${item.slug}`,
  //               state: { catId: item._id },
  //             });
  //           }}
  //         >
  //           <CategoryRect120 category={item} key={item._id}></CategoryRect120>
  //         </div>
  //       );
  //     }
  //   });
  // };
  return (
    <div className="">
      <section
        className={deviceType === "desktop" ? "home-desktop" : "home-mobile"}
      >
        <section className="home__landing">
          {/* <div className="landing__img">
          <img
            src={`${imageUrlConverter(
              `${home.photoLanding}&res=${resulationSelector}`
            )}`}
            alt=""
          />
        </div> */}
          {home && home.photoLanding && (
            <Carousel
              photoEn={home.photoLanding}
              photoBengali={home.photoLandingBengali}
              configProps={configPropsCarouselLanding}
            ></Carousel>
          )}
        </section>
        <section className="section_content">
          {advertisements && (
            <div className="section__advert">
              {advertisements.map((ele, index) => (
                <Advertisiment advertisiment={ele}></Advertisiment>
              ))}
            </div>
          )}

          <section className="section__multi_carousel">
            <div className="content--title">
              {language === "en" ? (
                <span>Our Product Categories</span>
              ) : (
                <span>আমাদের পন্যের বিভাগসমুহ</span>
              )}
            </div>
            <div className="content-multi-carousel">
              {categories&&( <Category120Slicker data={categories}></Category120Slicker>)}
            </div>
          </section>

          {offerProducts && (
            <section className="section__multi_carousel">
              <div className="content--title">
                {language === "en" ? (
                  <span>Special Offers </span>
                ) : (
                  <span>দারুন অফার</span>
                )}
              </div>
              <div className="content-multi-carousel">
                <OfferProductSlicker
                  data={offerProducts}
                ></OfferProductSlicker>
              </div>
            </section>
          )}

          {home.photoTutorial && (
            <section className="section__multi_carousel">
              <div className="content--title">
                {language === "en" ? (
                  <span>How to order from Sowdamart ?</span>
                ) : (
                  <span>কিভাবে সওদামার্ট থেকে অর্ডার করতে হয় ?</span>
                )}
              </div>
              <div className="content-multi-carousel">
                <TutorialSlick data={home.photoTutorial}></TutorialSlick>
              </div>
            </section>
          )} 
          {/* {home.gallery && (
            <section className="section__gallery">
              <div className="content--title">
                {language === "en" ? (
                  <span>Why people like Sowdamart?</span>
                ) : (
                  <span>কেন মানুষ সওদামার্ট পছন্দ করে?</span>
                )}
              </div>
              <div className="content--gallery">
                <FeatureGallery gallery={home.gallery}></FeatureGallery>
              </div>
            </section>
          )}  */}
        </section>
      </section>
      <footer className="section__footer">
        <Footer></Footer>
      </footer>
    </div>
  );
}
