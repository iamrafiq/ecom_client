import React from "react";
import Layout from "./Layout";
import { useEffect, useState } from "react";
import { getCategoryItems } from "../admin/apiAdmin";

import ProductCard from "../component_ui/product_card/ProductCard";
import SubCatCard from "../component_ui/sub_cat_card/SubCatCard";
import "../common/common.css";
import { useSelector, useDispatch } from "react-redux";

import { selectSideBarSelection } from "../redux/sideBarSlice";
import { changeBar, setBar } from "../redux/sideBarSlice";

const CategoryItems = (props) => {
  const bar = useSelector(selectSideBarSelection);
  const dispatch = useDispatch();

  console.log("propps", props);
  const [values, setValues] = useState({
    subcats: "",
    init: true,
  });

  if (bar !== props.match.params.slug) {
    // if user reloading the page by using browser not using side bar menu then ditchpatch the slug to sidebar slice
    // first checking the bar is not same as the props
    dispatch(setBar({ bar: props.match.params.slug }));
  }
  console.log("slug...", props.match.params.slug);
  const { subcats } = values;
  let init = (barName) => {
    console.log("init.. slug", barName);
    getCategoryItems(barName).then((data) => {
      if (data && data.error) {
        setValues({ ...values, subcats: "", error: data.error });
      } else {
        setValues({
          ...values,
          subcats: data.subcats,
        });
      }
    });
  };
  useEffect(() => {
    //dispatch(changeBar((barName)=>init(barName)));
    init(bar);
  }, [bar]);

  return (
    <Layout title="Category Children page" description="Node React">
      <h2>{bar}</h2>
      <div className="grid">
        {subcats ? (
          subcats.map((el, index) => <SubCatCard key={index}></SubCatCard>)
        ) : (
          <ProductCard></ProductCard>
        )}
      </div>
    </Layout>
  );
};

export default CategoryItems;
