import React from "react";
import Layout from "../../core/Layout";
import { useEffect, useState } from "react";
import { getCategoryItems } from "../../admin/apiAdmin";

// import ProductCard from "../product_card/ProductCard";
import { ProductCard, SubCatCard } from "../sub_cat_card/SubCatCard";
import "../../common/common.css";
import "./category_item.css";
import { useSelector, useDispatch } from "react-redux";

import { selectSideBarSelection } from "../../redux/sideBarSlice";
import { changeBar, setBar } from "../../redux/sideBarSlice";

const CategoryItems = (props) => {
  const bar = useSelector(selectSideBarSelection);
  const dispatch = useDispatch();

  console.log("propps", props);
  const [values, setValues] = useState({
    subcats: "",
    recursiveCategories: "",
    products: "",
    init: true,
  });

  if (bar !== props.match.params.slug) {
    // if user reloading the page by using browser not using side bar menu then ditchpatch the slug to sidebar slice
    // first checking the bar is not same as the props
    dispatch(setBar({ bar: props.match.params.slug }));
  }
  console.log("slug...", props.match.params.slug);
  const { subcats, recursiveCategories, products } = values;
  let init = (barName) => {
    console.log("init.. slug", barName);
    getCategoryItems(barName).then((data) => {
      if (data && data.error) {
        setValues({ ...values, subcats: "", error: data.error });
      } else {
        setValues({
          ...values,
          subcats: data.subcats,
          recursiveCategories: data.recursiveCategories,
          products: data.products,
        });
      }
    });
  };
  useEffect(() => {
    //dispatch(changeBar((barName)=>init(barName)));
    init(bar);
  }, [bar]);

  return (
    <div>
      <div className="jumbotron">
        <h2>"gjgjgjhgjhg</h2>
        <p className="lead">"sfsdfsdfsf</p>
      </div>
      <div className="mx-2">
        <div className="col-12">
          <div className="row ">
            {subcats.length > 0 ? (
              subcats.map((el, index) => (
                <div className=" m-1 ">
                  <SubCatCard cat={el} key={index}></SubCatCard>
                </div>
              ))
            ) : products.length > 0 ? (
              products.map((el, index) => (
                <div className=" m-1 ">
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
  );
};

export default CategoryItems;
