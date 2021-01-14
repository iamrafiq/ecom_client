import React from "react";
import queryString from "query-string";

import { Link, useLocation, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";


import "../../common/common.css";
import "./screen_renderer.css";
import { useSelector, useDispatch } from "react-redux";

import { selectSideBarBarToViewSelection } from "../../redux/sideBarSlice";
import {
  changeBar,
  setBarToView,
  setViewToBar,
} from "../../redux/sideBarSlice";

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

import {
  selectResolutionSelection,
  selectLanguageSelection,
} from "../../redux/settingsSlice";
import { imageUrlConverter } from "../../util/ImageUrlConverter";
import LoadingBar from "../../util/LoadingBar";
import ScreenGroup from "./ScreenGroup";
import ScreenCategory from "./ScreenCategory";
import ScreenManufacturer from "./ScreenManufacturer";

import Footer from "../footer/Footer";
const ScreenRenderar = ({ match }) => {
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



  const getNothingFound = (items) => {};
  return (
    <React.Fragment>
      <div className="content--area">
        <div>
          {dataGroup ? (
            <React.Fragment>
              <LoadingBar loading={loadingGroupWithProduct}></LoadingBar>
              <ScreenGroup groupWithProduct={groupWithProduct}></ScreenGroup>
            </React.Fragment>
          ) : dataCategory ? (
            <React.Fragment>
              <LoadingBar loading={loadingCategoryWithProduct}></LoadingBar>
              <ScreenCategory
                categoryWithProduct={categoryWithProduct}
                advertProductSlug={advertProduct}
              ></ScreenCategory>
            </React.Fragment>
          ) : dataManufacturer ? (
            <React.Fragment>
              <LoadingBar loading={loadingManufacturerWithProduct}></LoadingBar>
              <ScreenManufacturer
                manufacturerWithProduct={manufacturerWithProduct}
              ></ScreenManufacturer>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {language === "en" ? "Nothing Found" : "পাওয়া যায় নাই"}
            </React.Fragment>
          )}
        </div>
      </div>
      <div className="footer--area">
        <Footer></Footer>
      </div>
    </React.Fragment>
  );
};

export default ScreenRenderar;
