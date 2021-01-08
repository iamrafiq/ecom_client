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
import {
  selectLoadingSpinner,
  setLoadingSpinner,
} from "../../redux/globalSlice";

import { getAdvertisementsBySlug, getProducts } from "../../core/apiCore";
import { API } from "../../config";
import {
  selectCategoryWithProduct,
  selectLoading,
} from "../../redux/categoryWithProductSlice";
import {
  loadCategoryWithProduct,
  loadProductByCatId,
} from "../../redux/categoryWithProductSlice";
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
  const category = useSelector(selectCategoryWithProduct);
  const loading = useSelector(selectLoading);

  const resulationSelector = useSelector(selectResolutionSelection);
  const language = useSelector(selectLanguageSelection);
  const loadingSpinner = useSelector(selectLoadingSpinner);

  const dispatch = useDispatch();

  console.log("match", match);
  const [rerendar, setRerendar] = useState(0);
  const [advertProduct, setAdvertProduct] = useState(undefined);

  const [values, setValues] = useState({
    selectedCategory: null,
    subcats: [],
    recursiveCategories: [],
    products: [],
    advertisements: "",
    init: true,
    loading: true,
    loadingComplete: false,
  });

  useEffect(() => {
    console.log("search location", location);

    const search = queryString.parse(location.search);

    if (search.advertProduct) {
      setAdvertProduct(search.advertProduct);
    }
    if (location.state) {
      dispatch(loadCategoryWithProduct(undefined, location.state.catId));
    } else {
      dispatch(loadCategoryWithProduct(match.params.slug));
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
          <LoadingBar loading={loading}></LoadingBar>
          <div className="advert-area">
            <div className="">
              {category.advertisements &&
                category.advertisements.length > 0 && (
                  <AdvertismentsFadeOut
                    advertisements={category.advertisements}
                  ></AdvertismentsFadeOut>
                )}
            </div>
          </div>

          <div className="back-links">
            {category.recursiveCategories
              ? category.recursiveCategories.map((item, index) => (
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
                    {/* <Link to={item.slug}>
                    
                  </Link> */}
                    {language === "en" ? (
                      <div>
                        {index === category.recursiveCategories.length - 1 ? (
                          <span>{item.name}</span>
                        ) : (
                          <span>{`${item.name} > `} &nbsp;</span>
                        )}
                      </div>
                    ) : (
                      <div>
                        {index === category.recursiveCategories.length - 1
                          ? `${item.bengaliName}`
                          : `${item.bengaliName} > `}{" "}
                        &nbsp;
                      </div>
                    )}
                  </div>
                ))
              : ""}
            {/* {category ? (
            <div>
              {language === "en"
                ? `${category.name}`
                : `${category.bengaliName}`}
            </div>
          ) : (
            ""
          )} */}
          </div>

          <div className="horizontal-line">
            <hr />
            <div>
              <span className="horizontal-line--text">
                {category &&
                  (language === "en" ? category.name : category.bengaliName)}
              </span>
            </div>
            <hr />
          </div>
          <Grid>
            {category.subcats && category.subcats.length > 0
              ? subcategories(category.subcats)
              : category.products && category.products.length > 0
              ? products(category.products)
              : getNothingFound()}
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
