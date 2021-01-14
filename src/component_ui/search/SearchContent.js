import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../core/Layout";
import { useEffect, useState } from "react";

// import ProductCard from "../product_card/ProductCard";
import { Category } from "../category/Category";
import Product from "../product/Product";

import "../../common/common.css";
import "./search-content.css";
import { useSelector, useDispatch } from "react-redux";

import {
  changeBar,
  setBarToView,
  setViewToBar,
} from "../../redux/sideBarSlice";
import { getAdvertisementsBySlug, getProducts } from "../../core/apiCore";
import { API } from "../../config";
import { selectCategoryWithProduct } from "../../redux/categoryWithProductSlice";
import { loadCategoryWithProduct } from "../../redux/categoryWithProductSlice";
import { loadActiveCategories } from "../../redux/homeSlice";
import { setSlug } from "../../redux/productHoverSlice";
import {
  selectResolutionSelection,
  selectLanguageSelection,
} from "../../redux/settingsSlice";
import Grid from "../grid/Grid";
import {
  selectLoadingSpinner,
  setLoadingSpinner,
} from "../../redux/globalSlice";
import LoadingBar from "../../util/LoadingBar";
import Footer from "../footer/Footer";
import { list } from "../../core/apiCore";
const CategoryItems = ({ match }) => {
  const resulationSelector = useSelector(selectResolutionSelection);
  const language = useSelector(selectLanguageSelection);
  const loadingSpinner = useSelector(selectLoadingSpinner);

  const dispatch = useDispatch();

  const [data, setData] = useState({
    categories: [],
    category: "",
    search: match.params.slug,
    results: [],
    searched: false,
  });

  useEffect(() => {
    console.log("search slug:", match.params.slug);
    dispatch(setLoadingSpinner({ loadingSpinner: true }));
    if (match.params.slug) {
      list({ search: match.params.slug || undefined }).then((responce) => {
        if (responce.error) {
          console.log(responce.error);
        } else {
          setData({ ...data, results: responce, searched: true });
          console.log("search data:", responce);
        }
        dispatch(setLoadingSpinner({ loadingSpinner: false }));
      });
    } else {
      dispatch(setLoadingSpinner({ loadingSpinner: false }));
    }
  }, [match.params.slug]);

  // const onCategorySelect = (slug) => {
  //   dispatch(setBarToView({ barToView: slug }));
  //   dispatch(loadCategoryWithProduct(slug));
  //   dispatch(setViewToBar({ viewToBar: slug }));
  // };

  const subcategories = (items) => {
    return items.map((item, index) => (
      <div>
        <Link to={item.slug}>
          <Category category={item} key={item._id}></Category>
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
  const getNothingFound = () => (
    <React.Fragment>
      {language === "en" ? (
        <span className="no-product-found">No products found</span>
      ) : (
        <span className="no-product-found">পণ্য পাওয়া যাইনি</span>
      )}
    </React.Fragment>
  );
  return (
    <div className="content--area">
      <div className="content--body">
        {loadingSpinner ? (
          <LoadingBar loading={loadingSpinner}></LoadingBar>
        ) : (
          <div>
            {data.results && data.results.length > 0 ? (
              <Grid>{products(data.results)}</Grid>
            ) : (
              getNothingFound()
            )}
          </div>
        )}
      </div>

      <div className="footer--area">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default CategoryItems;
