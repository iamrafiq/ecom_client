import React from "react";

import { useEffect, useState } from "react";

import Product from "../product/Product";
import OfferProductLandscape from "../product/OfferProductLandscape";

import "../../common/common.css";
import "./screen_renderer.css";
import { useSelector, useDispatch } from "react-redux";

import {
  selectResolutionSelection,
  selectLanguageSelection,
} from "../../redux/settingsSlice";
import Grid from "../grid/Grid";
import AdvertismentsFadeOut from "../slicks/AdvertismentsFadeOut";

const ScreenGroup = ({ groupWithProduct }) => {
  const resulationSelector = useSelector(selectResolutionSelection);
  const language = useSelector(selectLanguageSelection);

  console.log("ScreenGroup", groupWithProduct)
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const products = (items) => {
    return items.map((item, index) => (
      <div>
        <Product
          product={item}
          index={index}
        ></Product>
      </div>
    ));
  };
  const offerProducts = (items) => {
    return items.map((item, index) => (
      <div>
        <OfferProductLandscape
          product={item}
          index={index}
        ></OfferProductLandscape>
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
              {groupWithProduct &&
                groupWithProduct.advertisements &&
                groupWithProduct.advertisements.length > 0 && (
                  <AdvertismentsFadeOut
                    advertisements={groupWithProduct.advertisements}
                  ></AdvertismentsFadeOut>
                )}
            </div>
          </div>
          <div className="horizontal-line">
            <hr />
            <div>
              <span className="horizontal-line--text">
                {groupWithProduct &&
                    (groupWithProduct.group
                      ? language === "en"
                        ? groupWithProduct.group.name
                        : groupWithProduct.group.bengaliName
                      : language === "en"
                      ? "Nothing Found"
                      : "পাওয়া যায় নাই")}
              </span>
            </div>
            <hr />
          </div>
          <Grid>
            {groupWithProduct && groupWithProduct.products
                ? groupWithProduct.group.slug === "offer"
                  ? offerProducts(groupWithProduct.products)
                  : products(groupWithProduct.products)
                : language === "en"
                ? "Nothing found for this group"
                : "এই গ্রুপে কোন কিছু পাওয়া যায় নাই"}
          </Grid>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ScreenGroup;
