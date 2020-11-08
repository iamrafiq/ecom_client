import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../core/Layout";
import { useEffect, useState } from "react";
// import { getCategoryItems } from "../../admin/apiAdmin";

// import ProductCard from "../product_card/ProductCard";
import Category from "../category/Category";
import Product from "../product/Product";
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
import { selectCategoryWithProduct } from "../../redux/categoryWithProductSlice";
import { loadCategoryWithProduct } from "../../redux/categoryWithProductSlice";
import { loadActiveCategories } from "../../redux/categorySlice";
import { setSlug } from "../../redux/productHoverSlice";
import { selectResolutionSelection } from "../../redux/settingsSlice";
import Grid from "../grid/Grid";

const CategoryItems = ({ match }) => {
  const bar = useSelector(selectSideBarBarToViewSelection);
  const category = useSelector(selectCategoryWithProduct);
  const resulationSelector = useSelector(selectResolutionSelection);

  const dispatch = useDispatch();

  const [rerendar, setRerendar] = useState(0);
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

  console.log("bar and props out", bar, match.params.slug);
  // if user reloading the page by using browser not using side bar menu then ditchpatch the slug to sidebar slice
  // first checking the bar is not same as the props
  if (!bar && !category) {
    dispatch(loadCategoryWithProduct(match.params.slug));
  } else if (bar && bar !== match.params.slug) {
    dispatch(loadCategoryWithProduct(match.params.slug));
  } else if (category && category.slug !== match.params.slug) {
    dispatch(loadCategoryWithProduct(match.params.slug));
  }

  useEffect(() => {
    if (bar && bar !== match.params.slug) {
      dispatch(setBarToView({ barToView: match.params.slug }));
      dispatch(
        setViewToBar({
          viewToBar: {
            key: Math.random().toString(10).slice(2),
            value: match.params.slug,
          },
        })
      );
    }
  }, [category]);

  // const onCategorySelect = (slug) => {
  //   dispatch(setBarToView({ barToView: slug }));
  //   dispatch(loadCategoryWithProduct(slug));
  //   dispatch(setViewToBar({ viewToBar: slug }));
  // };

  const subcategories = (items) => {
    var test = [];

    for (var j = 0; j < 25; j++) {
      test[j] = { i: 89, j: j };
    }

    return items.map((item, index) => (
      <div>
        <Link to={item.slug}>
          <Category
            category={item}
            key={item._id}
            resulationSelector={resulationSelector}
          ></Category>
        </Link>
      </div>
    ));
  };
  const products = (items) => {
    return items.map((item, index) => (
      <div>
        <Product product={item} index={index}></Product>
      </div>
    ));
  };
  const getNothingFound = (items) => {};
  return (
    <div>
      {false ? (
        <h2>Loading....</h2>
      ) : (
        <div>
          {category.advertisements && category.advertisements.length > 0 && (
            <div className="addvert-area">
              <img
                src={`${category.advertisements[0].photo}&res=${resulationSelector}`}
                alt={category.advertisements[0].name}
              />
            </div>
          )}

          <div className="back-links">
            {category.recursiveCategories
              ? category.recursiveCategories.map((item, index) => (
                  <div key={Math.random().toString(10).slice(2)}>
                    <Link to={item.slug}>
                      <span>{`${item.name}`}</span>
                    </Link>
                    &nbsp; {">"} &nbsp;
                  </div>
                ))
              : ""}
            {category ? (
              <div>
                <div>
                  <div>{`${category.name}`}</div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="horizontal-line">
            <hr />
            <div>{category && category.name}</div>
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
      )}
    </div>
  );
};

export default CategoryItems;
