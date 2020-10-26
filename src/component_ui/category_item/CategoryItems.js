import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../core/Layout";
import { useEffect, useState } from "react";
// import { getCategoryItems } from "../../admin/apiAdmin";

// import ProductCard from "../product_card/ProductCard";
import { ProductCard, SubCatCard } from "../sub_cat_card/SubCatCard";
import "../../common/common.css";
import "./category_item.css";
import { useSelector, useDispatch } from "react-redux";

import { selectSideBarSelection } from "../../redux/sideBarSlice";
import { changeBar, setBar } from "../../redux/sideBarSlice";
import { getAdvertisementsBySlug } from "../../core/apiCore";
import { API } from "../../config";
import { selectCategoryWithProduct } from "../../redux/categoryWithProductSlice";
const CategoryItems = (props) => {
  //const bar = useSelector(selectSideBarSelection);
  const category = useSelector(selectCategoryWithProduct);
  const dispatch = useDispatch();

  console.log("category", category);
  console.log("propps", props);
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

  // if (bar !== props.match.params.slug) {
  //   // if user reloading the page by using browser not using side bar menu then ditchpatch the slug to sidebar slice
  //   // first checking the bar is not same as the props
  //   dispatch(setBar({ bar: props.match.params.slug }));
  // }
  console.log("slug...", props.match.params.slug);
  const {
    selectedCategory,
    subcats,
    recursiveCategories,
    products,
    advertisements,
    loading,
    loadingComplete,
  } = values;
  const { renderKey } = rerendar;
  let init = (barName) => {
    //console.log("init.. slug", barName);

    // getCategoryItems(barName).then((data) => {
    //   if (data && data.error) {
    //     setValues({
    //       ...values,
    //       selectedCategory: null,
    //       subcats: [],
    //       recursiveCategories: [],
    //       products: [],
    //       error: data.error,
    //       loading: false,
    //     });
    //   } else {
    //     console.log("c.........", data);
    //     setValues({
    //       ...values,
    //       selectedCategory: data,
    //       subcats: data.subcats,
    //       recursiveCategories: data.recursiveCategories,
    //       products: data.products,
    //       loading: false,
    //       loadingComplete: true,
    //     });
    //     setRerendar(Math.random());
    //   }
    // });

    getAdvertisementsBySlug(barName).then((data) => {
      if (data && data.error) {
        //setValues({ ...values,  error: data.error });
      } else {
        setValues({
          ...values,
          advertisements: data,
        });
      }
    });
  };
  useEffect(() => {}, [category]);

  return (
    <div>
      {false ? (
        <h2>Loading....</h2>
      ) : (
        <div>
          {/* {advertisements.length > 0 && (
            <div
              className="jumbotron text-center mx-auto d-block img-fluid unlock-icon"
              style={{ padding: 0, maxWidth: "700px" }}
            >
              <img
                className="card-img"
                src={advertisements[0].photoUrl}
                alt={advertisements[0].name}
              />
            </div>
          )} */}

          <div className="row" style={{}}>
            {category.recursiveCategories
              ? category.recursiveCategories.map((item, index) => (
                  <Link className="nav-link" to={item.slug}>
                    <div>
                      <div>{`${item.name}`}</div>
                    </div>
                  </Link>
                ))
              : ""}
            {category ? (
              <Link className="nav-link" to={category.slug}>
                <div>
                  <div>{`${category.name}`}</div>
                </div>
              </Link>
            ) : (
              ""
            )}
          </div>
          <div className="row" style={{}}>
            <div className="col-sm-5">
              <hr />
            </div>
            <div className="col-sm-2">Fresh Vegitalble</div>
            <div className="col-sm-5">
              <hr />
            </div>
          </div>
          <div className="container" style={{ marginTop: "30px" }}>
            <div className="mx-2">
              <div className="col-12">
                <div className="row">
                  {category.subcats && category.subcats.length > 0 ? (
                    category.subcats.map((el, index) => (
                      <div key={index} className=" m-1 ">
                        <SubCatCard cat={el} key={index}></SubCatCard>
                      </div>
                    ))
                  ) : category.products && category.products.length > 0 ? (
                    category.products.map((el, index) => (
                      <div key={index} className=" m-1 ">
                        <ProductCard key={index}></ProductCard>
                      </div>
                    ))
                  ) : (
                    <h2>Nothing found!!!</h2>
                  )}
                </div>
                <hr />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryItems;
