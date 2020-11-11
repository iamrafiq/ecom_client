import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  selectResolutionSelection,
  selectLanguageSelection,
} from "../../redux/settingsSlice";
import "./home.css";
var FontAwesome = require("react-fontawesome");

export default function Category(props) {
  const resulationSelector = useSelector(selectResolutionSelection);
  const language = useSelector(selectLanguageSelection);

  useEffect(()=>{

  },[]);
  return (
    <div className="home">
      <div className="home__landing">
        <div className="landing__img">
          <img
            src="https://cdn.chaldal.net/asset/Egg.Grocery.Fabric/Egg.Grocery.Web/1.5.0+Release-1510/Default/stores/chaldal/components/landingPage2/LandingPage/images/landingBannerTop.jpg"
            alt=""
          />
        </div>
        <div className="landing__content">
          <span className="content__title">Sowdamart always low price.</span>
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
      </div>
      <div className="home__advert"></div>
      <div className="home__cats"></div>
      <div className="home__tutorial"></div>
      <div className="home__offer"></div>
      <div className="home__features"></div>
      <div className="home__footer"></div>
    </div>
  );
}
