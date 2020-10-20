import React from "react";
import Layout from "./Layout";
import { useEffect, useState } from "react";
import { getCategoryItems } from "../admin/apiAdmin";

import ProductCard from "../component_ui/product_card/ProductCard";
import SubCatCard from "../component_ui/sub_cat_card/SubCatCard";
import "../common/common.css";
import { useSelector, useDispatch } from "react-redux";

import { selectSideBarSelection } from "../redux/sideBarSlice";
import { changeBar } from "../redux/sideBarSlice";

const CategoryItems = (props) => {
  const bar = useSelector(selectSideBarSelection);
  const dispatch = useDispatch();

  console.log("propps", props);
  const [values, setValues] = useState({
    subcats: "",
    init: true,
  });

  const { subcats } = values;
  const _id = "yyuyuyu"; //props.location._id;
  let init = (barName) => {
    console.log("init.. slug", barName);
    getCategoryItems(barName).then((data) => {
      if (data && data.error) {
        setValues({ ...values,  subcats: "", error: data.error });
      } else {
        setValues({
          ...values,
          subcats: data.subcats,
        });
      }
    });
  };
  useEffect(() => {
    dispatch(changeBar((barName)=>init(barName)));
  }, []);
  
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
