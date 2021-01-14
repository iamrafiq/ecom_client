import React from "react";

import { Link, useLocation, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { Category } from "../category/Category";
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

const ScreenRenderar = ({ categoryWithProduct, advertProductSlug }) => {
  const location = useLocation();
  const history = useHistory();
  const resulationSelector = useSelector(selectResolutionSelection);
  const language = useSelector(selectLanguageSelection);

  useEffect(() => {}, []);

  const subcategories = (items) => {
    return items.map((item, index) => (
      <div
        onClick={() => {
          history.push({
            pathname: `/products/${item.slug}`,
            state: { catId: item._id },
          });
        }}
      >
        <Category category={item} key={item._id}></Category>
      </div>
    ));
  };
  const products = (items) => {
    return items.map((item, index) => (
      <div>
        <Product
          product={item}
          index={index}
          advertProductSlug={advertProductSlug}
        ></Product>
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
              {categoryWithProduct &&
                categoryWithProduct.advertisements &&
                categoryWithProduct.advertisements.length > 0 && (
                  <AdvertismentsFadeOut
                    advertisements={categoryWithProduct.advertisements}
                  ></AdvertismentsFadeOut>
                )}
            </div>
          </div>

          <div className="back-links">
            {categoryWithProduct &&
            categoryWithProduct.category.recursiveCategories
              ? categoryWithProduct.category.recursiveCategories.map(
                  (item, index) => (
                    <div
                      className="react__link--colored"
                      key={Math.random().toString(10).slice(2)}
                      onClick={() => {
                        history.push({
                          pathname: `/products/${item.slug}`,
                          state: { catId: item._id },
                        });
                      }}
                    >
                      {language === "en" ? (
                        <div>
                          {index ===
                          categoryWithProduct.category.recursiveCategories
                            .length -
                            1 ? (
                            <span>{item.name}</span>
                          ) : (
                            <span>{`${item.name} > `} &nbsp;</span>
                          )}
                        </div>
                      ) : (
                        <div>
                          {index ===
                          categoryWithProduct.category.recursiveCategories
                            .length -
                            1
                            ? `${item.bengaliName}`
                            : `${item.bengaliName} > `}{" "}
                          &nbsp;
                        </div>
                      )}
                    </div>
                  )
                )
              : ""}
          </div>

          <div className="horizontal-line">
            <hr />
            <div>
              <span className="horizontal-line--text">
                {categoryWithProduct
                  ? language === "en"
                    ? categoryWithProduct.category.name
                    : categoryWithProduct.category.bengaliName
                  : language === "en"
                  ? "Nothing Found"
                  : "পাওয়া যায় নাই"}
              </span>
            </div>
            <hr />
          </div>
          <Grid>
            {categoryWithProduct &&
            categoryWithProduct.category.subcats &&
            categoryWithProduct.category.subcats.length > 0
              ? subcategories(categoryWithProduct.category.subcats)
              : categoryWithProduct &&
                categoryWithProduct.products &&
                categoryWithProduct.products.length > 0
              ? products(categoryWithProduct.products)
              : language === "en"
              ? "Nothing found for this category"
              : "এই ক্যাটাগরিতে কোন কিছু পাওয়া যায় নাই"}
          </Grid>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ScreenRenderar;
