import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { CategoryRect } from "../category/Category";

import {
  selectResolutionSelection,
  selectLanguageSelection,
} from "../../redux/settingsSlice";
import { selectHomeSelection } from "../../redux/homeSlice";
import Advertisiment from "../../util/Advertisiment";
import Carousel from "../../util/Carousel";
import MultiCarousel from "../../util/multi_carousel/MultiCarousel";

import "./home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

var FontAwesome = require("react-fontawesome");

export default function Home(props) {
  const resulationSelector = useSelector(selectResolutionSelection);
  const language = useSelector(selectLanguageSelection);
  const home = useSelector(selectHomeSelection);
  console.log("home....", home);
  useEffect(() => {}, []);
  const categories = (items) => {
    return items.map((item, index) => {
      if (item.showHome === 1) {
        return (
          <div className="content__cats--width">
            <Link to={item.slug}>
              <CategoryRect category={item} key={item._id}></CategoryRect>
            </Link>
          </div>
        );
      }
    });
  };
  return (
    <section className="home">
      <section className="home__landing">
        <div className="landing__img">
          <img src={`${home.photoLanding}&res=${resulationSelector}`} alt="" />
        </div>
        <div className="landing__content">
          <span className="landing__content--title">
            Sowdamart always low price.
          </span>
          <div class="search-wrapper-home">
            <form>
              <input
                type="text"
                name="focus"
                required
                class="search-box-home"
                placeholder="Enter search term food goods meets"
              />
              <button class="search-btn" type="reset">
                <FontAwesome className="" name="search" />
              </button>
            </form>
          </div>
        </div>
      </section>
      <section className="section_content">
        {home.advertisements && (
          <div className="section__advert">
            {home.advertisements.map((ele, index) => (
              <Advertisiment advertisiment={ele}></Advertisiment>
            ))}
          </div>
        )}

        <section className="section__content">
          <div className="content--title">
            {language === "en" ? (
              <span>Our Product Categories</span>
            ) : (
              <span>আমাদের পন্যের বিভাগসমুহ</span>
            )}
          </div>
          <div className="content--cats">
            {home.categories && categories(home.categories)}
          </div>
        </section>

        {home.photoTutorial && (
          <section className="section__carousel">
            <div className="content--title">
              {language === "en" ? (
                <span>How to order from Sowdamart ?</span>
              ) : (
                <span>কিভাবে সওদামার্ট থেকে অর্ডার করতে হয় ?</span>
              )}
            </div>
            <div className="content-carousel">
              <Carousel
                photoTutorial={home.photoTutorial}
                photoTutorialBengali={home.photoTutorialBengali}
              ></Carousel>
            </div>
          </section>
        )}
         {/* {home.offerProducts && ( */}
          <section className="section__multi_carousel">
            <div className="content--title">
              {language === "en" ? (
                <span>Special Offers </span>
              ) : (
                <span>দারুন অফার</span>
              )}
            </div>
            <div className="content-multi-carousel">
              <MultiCarousel
                photoTutorial={home.photoTutorial}
                photoTutorialBengali={home.photoTutorialBengali}
              ></MultiCarousel>
            </div>
          </section>
        {/* )} */}

        <section className="section__content"></section>
        <section className="section__content"></section>
      </section>
      <footer className="section__footer"></footer>
    </section>
  );
}
