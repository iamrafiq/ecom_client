import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  selectResolutionSelection,
  selectLanguageSelection,
} from "../../redux/settingsSlice";
import { selectHomeSelection } from "../../redux/homeSlice";
import Advertisiment from "../../util/Advertisiment";
import "./home.css";
var FontAwesome = require("react-fontawesome");

export default function Category(props) {
  const resulationSelector = useSelector(selectResolutionSelection);
  const language = useSelector(selectLanguageSelection);
  const home = useSelector(selectHomeSelection);

  useEffect(() => {}, []);
  return (
    <div className="home">
      <div className="home__landing">
        <div className="landing__img">
        <img src={`${home.photoLanding}&res=${resulationSelector}`} alt="" />
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
      <div className="home_content">
        {home.advertisements && (
          <div className="content__advert">
            {home.advertisements.map((ele, index) => (
              <Advertisiment advertisiment={ele}></Advertisiment>
            ))}
          </div>
        )}

        <div className="content__cats"></div>
        <div className="content__tutorial"></div>
        <div className="content__offer"></div>
        <div className="content__features"></div>
      </div>
      <div className="home__footer"></div>
    </div>
  );
}
