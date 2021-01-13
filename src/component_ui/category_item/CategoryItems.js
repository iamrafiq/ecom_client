import React from "react";
import queryString from "query-string";

import { Link, useLocation, useHistory } from "react-router-dom";
import Layout from "../../core/Layout";
import { useEffect, useState } from "react";
// import { getCategoryItems } from "../../admin/apiAdmin";

// import ProductCard from "../product_card/ProductCard";
import { Category } from "../category/Category";
import Product from "../product/Product";
import OfferProduct from "../product/OfferProduct";

import "../../common/common.css";
import "./category_item.css";
import { useSelector, useDispatch } from "react-redux";

import { selectSideBarBarToViewSelection } from "../../redux/sideBarSlice";
import {
  changeBar,
  setBarToView,
  setViewToBar,
} from "../../redux/sideBarSlice";

import { getAdvertisementsBySlug, getProducts } from "../../core/apiCore";
import { API } from "../../config";
import {
  selectCategoryWithProduct,
  loadCategoryWithProduct,
  selectLoadingCategoryWithProduct,
} from "../../redux/categoryWithProductSlice";

import {
  loadGroupWithProduct,
  selectGroupWithProduct,
  selectLoadingGroupWithProduct,
} from "../../redux/groupWithProductSlice";
import {
  loadManufacturerWithProduct,
  selectManufacturerWithProduct,
  selectLoadingManufacturerWithProduct,
} from "../../redux/manufacturerWithProductSlice";
import { loadActiveCategories } from "../../redux/homeSlice";
import { setSlug } from "../../redux/productHoverSlice";
import {
  selectResolutionSelection,
  selectLanguageSelection,
} from "../../redux/settingsSlice";
import Grid from "../grid/Grid";
import { imageUrlConverter } from "../../util/ImageUrlConverter";
import LoadingBar from "../../util/LoadingBar";
import AdvertismentsFadeOut from "../slicks/AdvertismentsFadeOut";

import Footer from "../footer/Footer";
const CategoryItems = ({ match }) => {
  const location = useLocation();
  const history = useHistory();

  const bar = useSelector(selectSideBarBarToViewSelection);
  const categoryWithProduct = useSelector(selectCategoryWithProduct);
  const loadingCategoryWithProduct = useSelector(
    selectLoadingCategoryWithProduct
  );

  const groupWithProduct = useSelector(selectGroupWithProduct);
  const loadingGroupWithProduct = useSelector(selectLoadingGroupWithProduct);

  const manufacturerWithProduct = useSelector(selectManufacturerWithProduct);
  const loadingManufacturerWithProduct = useSelector(
    selectLoadingManufacturerWithProduct
  );

  const resulationSelector = useSelector(selectResolutionSelection);
  const language = useSelector(selectLanguageSelection);

  const dispatch = useDispatch();

  console.log("match", match);
  console.log("grou-p", categoryWithProduct);

  const [advertProduct, setAdvertProduct] = useState(undefined);
  const [dataTypes, setDataTypes] = useState({
    dataCategory: false,
    dataGroup: false,
    dataManufacturer: false,
  });
  const { dataCategory, dataGroup, dataManufacturer } = dataTypes;
  useEffect(() => {
    console.log("search location", location);

    const search = queryString.parse(location.search);

    if (search.advertProduct) {
      // popup product dialog when user click on advertisement of a product
      setAdvertProduct(search.advertProduct);
    }
    if (search.group) {
      dispatch(loadGroupWithProduct(match.params.slug));
      setDataTypes({
        dataCategory: false,
        dataGroup: true,
        dataManufacturer: false,
      });
      // console.log("group slug", match.params.slug);
    } else if (search.manufacturer) {
      dispatch(loadManufacturerWithProduct(match.params.slug));
      setDataTypes({
        dataCategory: false,
        dataGroup: false,
        dataManufacturer: true,
      });
      // console.log("manufucturer slug", search.manufacturer);
    } else {
      setDataTypes({
        dataCategory: true,
        dataGroup: false,
        dataManufacturer: false,
      });
      if (location.state) {
        if (location.state.catId) {
          // setting catId from side bar
          dispatch(loadCategoryWithProduct(undefined, location.state.catId));
        } else {
          dispatch(loadCategoryWithProduct(match.params.slug));
        }
      } else {
        dispatch(loadCategoryWithProduct(match.params.slug));
      }
    }
  }, [match.params.slug]);

  // const onCategorySelect = (slug) => {
  //   dispatch(setBarToView({ barToView: slug }));
  //   dispatch(loadCategoryWithProduct(slug));
  //   dispatch(setViewToBar({ viewToBar: slug }));
  // };

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
        {/* <OfferProduct product={item} index={index}></OfferProduct> */}
        <Product
          product={item}
          index={index}
          advertProductSlug={advertProduct}
        ></Product>
      </div>
    ));
  };
  const getNothingFound = (items) => {};
  return (
    <React.Fragment>
      <div className="content--area">
        <div>
          <LoadingBar loading={loadingCategoryWithProduct}></LoadingBar>
          <div className="advert-area">
            <div className="">
              {dataCategory &&
                categoryWithProduct &&
                categoryWithProduct.advertisements &&
                categoryWithProduct.advertisements.length > 0 && (
                  <AdvertismentsFadeOut
                    advertisements={categoryWithProduct.advertisements}
                  ></AdvertismentsFadeOut>
                )}
              {dataGroup &&
                groupWithProduct &&
                groupWithProduct.advertisements &&
                groupWithProduct.advertisements.length > 0 && (
                  <AdvertismentsFadeOut
                    advertisements={groupWithProduct.advertisements}
                  ></AdvertismentsFadeOut>
                )}
              {dataManufacturer &&
                manufacturerWithProduct &&
                manufacturerWithProduct.advertisements &&
                manufacturerWithProduct.advertisements.length > 0 && (
                  <AdvertismentsFadeOut
                    advertisements={manufacturerWithProduct.advertisements}
                  ></AdvertismentsFadeOut>
                )}
            </div>
          </div>

          <div className="back-links">
            {dataCategory &&
              (categoryWithProduct &&
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
                : "")}
          </div>

          <div className="horizontal-line">
            <hr />
            <div>
              <span className="horizontal-line--text">
                {dataCategory
                  ? categoryWithProduct
                    ? language === "en"
                      ? categoryWithProduct.category.name
                      : categoryWithProduct.category.bengaliName
                    : language === "en"
                    ? "Nothing Found"
                    : "পাওয়া যায় নাই"
                  : dataGroup
                  ? groupWithProduct &&
                    (groupWithProduct.group
                      ? language === "en"
                        ? groupWithProduct.group.name
                        : groupWithProduct.group.bengaliName
                      : language === "en"
                      ? "Nothing Found"
                      : "পাওয়া যায় নাই")
                  : dataManufacturer
                  ? manufacturerWithProduct &&
                    (manufacturerWithProduct.manufacturer
                      ? language === "en"
                        ? manufacturerWithProduct.manufacturer.name
                        : manufacturerWithProduct.manufacturer.bengaliName
                      : language === "en"
                      ? "Nothing Found"
                      : "পাওয়া যায় নাই")
                  : language === "en"
                  ? "Nothing Found"
                  : "পাওয়া যায় নাই"}
              </span>
            </div>
            <hr />
          </div>
          <Grid>
            {dataCategory
              ? categoryWithProduct &&
                categoryWithProduct.category.subcats &&
                categoryWithProduct.category.subcats.length > 0
                ? subcategories(categoryWithProduct.category.subcats)
                : categoryWithProduct &&
                  categoryWithProduct.products &&
                  categoryWithProduct.products.length > 0
                ? products(categoryWithProduct.products)
                : language === "en"
                ? "Nothing found for this category"
                : "এই ক্যাটাগরিতে কোন কিছু পাওয়া যায় নাই"
              : dataGroup
              ? groupWithProduct && groupWithProduct.products
                ? products(groupWithProduct.products)
                : language === "en"
                ? "Nothing found for this group"
                : "এই গ্রুপে কোন কিছু পাওয়া যায় নাই"
              : dataManufacturer
              ? manufacturerWithProduct && manufacturerWithProduct.products
                ? products(manufacturerWithProduct.products)
                : language === "en"
                ? "Nothing found for manufacturer group"
                : "এই কোম্পানির কোন কিছু পাওয়া যায় নাই"
              : "কোন কিছু পাওয়া যায় নাই"}
          </Grid>
        </div>
      </div>
      <div className="footer--area">
        <Footer></Footer>
      </div>
    </React.Fragment>
  );
};

export default CategoryItems;
