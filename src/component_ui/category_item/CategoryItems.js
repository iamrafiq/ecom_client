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

import { selectSideBarBarToViewSelection } from "../../redux/sideBarSlice";
import {
  changeBar,
  setBarToView,
  setViewToBar,
} from "../../redux/sideBarSlice";
import { getAdvertisementsBySlug } from "../../core/apiCore";
import { API } from "../../config";
import { selectCategoryWithProduct } from "../../redux/categoryWithProductSlice";
import { loadCategoryWithProduct } from "../../redux/categoryWithProductSlice";
import { loadActiveCategories } from "../../redux/categorySlice";

const CategoryItems = ({ match }) => {
  const bar = useSelector(selectSideBarBarToViewSelection);
  const category = useSelector(selectCategoryWithProduct);
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
  }
   else if (bar && bar !== match.params.slug) {
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

  const onItemSelect = (slug) => {
    dispatch(setBarToView({ barToView: slug }));
    dispatch(loadCategoryWithProduct(slug));
    dispatch(setViewToBar({ viewToBar: slug }));
  };
  return (
    <div>
      {false ? (
        <h2>Loading....</h2>
      ) : (
        <div>
          {category.advertisements && (
            <div
              className="jumbotron text-center mx-auto d-block img-fluid unlock-icon mb-3 p-0"
              style={{ padding: 0, maxWidth: "700px" }}
            >
              <img
                className="card-img"
                src={category.advertisements[0].photoUrl}
                alt={category.advertisements[0].name}
              />
            </div>
          )}

          <div
            style={{
              margin: "0px",
              padding: "0px",
              display: "flex",
              flexDirection: "row",
            }}
          >
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

          <div
            className="row"
            style={{
              margin: "0px",
              padding: "0px",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <hr style={{ flex: "1" }} />
            <div
              style={{
                margin: "auto",
                paddingLeft: "50px",
                paddingRight: "50px",
              }}
            >
              {category && category.name}
            </div>
            <hr style={{ flex: "1" }} />
          </div>
          <div className="container" style={{ marginTop: "30px" }}>
            <div className="mx-2">
              <div className="col-12">
                <div className="row">
                  {category.subcats && category.subcats.length > 0 ? (
                    category.subcats.map((el, index) => (
                      <div key={el._id} className=" m-1 ">
                        <Link to={el.slug}>
                          <SubCatCard
                            // onClick={onItemSelect}
                            cat={el}
                            key={el._id}
                          ></SubCatCard>
                        </Link>
                      </div>
                    ))
                  ) : category.products && category.products.length > 0 ? (
                    category.products.map((el, index) => (
                      <div key={el._id} className=" m-1 ">
                        <Link to={el.slug}>
                          <ProductCard
                            // onClick={onItemSelect}
                            key={el._id}
                          ></ProductCard>
                        </Link>
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
