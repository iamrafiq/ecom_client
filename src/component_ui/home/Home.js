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
import {
  selectHomeSelection,
  selectHomeLoaded,
  selectCategories,
  selectAdvertisements,
  selectOfferProducts,
} from "../../redux/homeSlice";
import Advertisiment from "../../util/Advertisiment";
import Carousel from "../../util/Carousel";
import OfferProductSlicker from "../slicks/OfferProductSlicker";
import Category120Slicker from "../slicks/Category120Slicker";
import TutorialSlick from "../slicks/TutorialSlick";
import ProductSlick from "../slicks/ProductSlick";
import HomeLandingPhotosSlicker from "../slicks/HomeLandingPhotosSlicker";
import AdvertismentsFadeOut from "../slicks/AdvertismentsFadeOut";
import FeatureGallery from "./FeatureGallery";
import {} from "../slicks/ProductSlick";
import Footer from "../footer/Footer";
import "./app-home.css";
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

  let ads = "";
  if (advertisements.length > 0) {
    let m = Math.floor(advertisements.length / 2);
    console.log("home..home", m);

    let n = advertisements.length - m;
    let firstHalf = advertisements.slice(0, m);
    let secondHalf = advertisements.slice(m);
    ads = {
      firstHalf,
      secondHalf,
    };
  }

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

  const adSection = () => {
    return (
      <div className="section__advert">
        <section className="section__multi_carousel">
          {advertisements && (
            <AdvertismentsFadeOut
              advertisements={ads.firstHalf}
            ></AdvertismentsFadeOut>
          )}
        </section>
        <section className="section__multi_carousel">
          {advertisements && (
            <AdvertismentsFadeOut
              advertisements={ads.firstHalf
                .slice(0)
                .reverse()
                .map((item, index) => item)}
            ></AdvertismentsFadeOut>
          )}
        </section>
        <section className="section__multi_carousel">
          {advertisements && (
            <AdvertismentsFadeOut
              advertisements={ads.secondHalf}
            ></AdvertismentsFadeOut>
          )}
        </section>
        <section className="section__multi_carousel">
          {advertisements && (
            <AdvertismentsFadeOut
              advertisements={ads.secondHalf
                .slice(0)
                .reverse()
                .map((item, index) => item)}
            ></AdvertismentsFadeOut>
          )}
        </section>
      </div>
    );
  };
  return (
    <div className="">
      <section className="app-home">
        <section className="home__landing">
          {home && home.photoLanding && (
            <HomeLandingPhotosSlicker
              photoEn={home.photoLanding}
              photoBengali={home.photoLandingBengali}
            ></HomeLandingPhotosSlicker>
          )}
        </section>
        <div className="section_content">
          {adSection()}
          <section className="section__multi_carousel">
            <div className="content--title">
              {language === "en" ? (
                <span>Our Product Categories</span>
              ) : (
                <span>আমাদের পন্যের বিভাগসমুহ</span>
              )}
            </div>
            <div className="content-multi-carousel">
              {categories && (
                <Category120Slicker data={categories}></Category120Slicker>
              )}
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
                <OfferProductSlicker data={offerProducts}></OfferProductSlicker>
              </div>
            </section>
          )}

          {home&&home.photoTutorial && (
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
          {/* <div className="">
            {categories &&
              categories.map(
                (item, index) =>
                  item.products &&
                  item.products.length > 0 && (
                    <React.Fragment>
                      {index % 3 === 0 && index!==0 && adSection()}
                      <section className="section__multi_carousel section__multi_carousel-card">
                        <div className="content--title">
                          {language === "en" ? (
                            <span>Top Sellers in {item.name}</span>
                          ) : (
                            <span>
                              জনপ্রিয় পণ্য {item.bengaliName} ক্যাটাগরিতে
                            </span>
                          )}
                        </div>
                        <div className="content-multi-carousel-product">
                          <ProductSlick data={item.products}></ProductSlick>
                        </div>
                      </section>
                    </React.Fragment>
                  )
              )}
          </div> */}
        </div>
      </section>
      <footer className="section__footer">
        <Footer></Footer>
      </footer>
    </div>
  );
}
