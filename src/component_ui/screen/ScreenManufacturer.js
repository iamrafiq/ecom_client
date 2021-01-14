import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import Product from "../product/Product";

import "../../common/common.css";
import "./screen_renderer.css";
import { useSelector, useDispatch } from "react-redux";

import {
  selectResolutionSelection,
  selectLanguageSelection,
} from "../../redux/settingsSlice";
import Grid from "../grid/Grid";
import AdvertismentsFadeOut from "../slicks/AdvertismentsFadeOut";

const ScreenRenderar = ({ manufacturerWithProduct }) => {
  const location = useLocation();
  const history = useHistory();

  const resulationSelector = useSelector(selectResolutionSelection);
  const language = useSelector(selectLanguageSelection);

  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const products = (items) => {
    return items.map((item, index) => (
      <div>
        <Product product={item} index={index}></Product>
      </div>
    ));
  };

  const getNothingFound = (items) => {};
  return (
    <React.Fragment>
      <div className="content--area">
        <div>
          <div className="advert-area">
            <div className="">
              {manufacturerWithProduct &&
                manufacturerWithProduct.advertisements &&
                manufacturerWithProduct.advertisements.length > 0 && (
                  <AdvertismentsFadeOut
                    advertisements={manufacturerWithProduct.advertisements}
                  ></AdvertismentsFadeOut>
                )}
            </div>
          </div>

          <div className="horizontal-line">
            <hr />
            <div>
              <span className="horizontal-line--text">
                {manufacturerWithProduct &&
                  (manufacturerWithProduct.manufacturer
                    ? language === "en"
                      ? manufacturerWithProduct.manufacturer.name
                      : manufacturerWithProduct.manufacturer.bengaliName
                    : language === "en"
                    ? "Nothing Found"
                    : "পাওয়া যায় নাই")}
              </span>
            </div>
            <hr />
          </div>
          <Grid>
            {manufacturerWithProduct && manufacturerWithProduct.products
                ? products(manufacturerWithProduct.products)
                : language === "en"
                ? "Nothing found for manufacturer group"
                : "এই কোম্পানির কোন কিছু পাওয়া যায় নাই"}
          </Grid>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ScreenRenderar;
