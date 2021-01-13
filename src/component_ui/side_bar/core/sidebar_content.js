import React, { useEffect, useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";

import PropTypes from "prop-types";
import { SIDE_BAR_WIDTH } from "../../../config";
import TreeExample from "../../treebeard/tree";
import { useDispatch, useSelector } from "react-redux";
import {
  setBarToView,
  selectSideBarViewToBarSelection,
} from "../../../redux/sideBarSlice";
import { loadCategoryWithProduct } from "../../../redux/categoryWithProductSlice";
import {
  selectResolutionSelection,
  selectLanguageSelection,
} from "../../../redux/settingsSlice";
import { setSigninDialog } from "../../../redux/globalSlice";
import { selectUser } from "../../../redux/authSlice";
import {
  selectOfferProducts,
  selectOfferProductsCounts,
} from "../../../redux/homeSlice";
import "./side-bar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { englishToBangla } from "../../../util/utils";
import { faUserCircle, faHome } from "@fortawesome/fontawesome-free-solid";
const SidebarContent = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const viewToBar = useSelector(selectSideBarViewToBarSelection);
  const resolutionSelector = useSelector(selectResolutionSelection);
  const language = useSelector(selectLanguageSelection);
  const user = useSelector(selectUser);
  const offerProducts = useSelector(selectOfferProducts);
  const offerProductsCount = useSelector(selectOfferProductsCounts);

  const [state, setState] = useState({
    viewToBarChange: "",
  });

  const selectedBar = (bar) => {
    dispatch(loadCategoryWithProduct(bar));
    dispatch(setBarToView({ barToView: bar }));
  };
  useEffect(() => {
    if (state.viewToBarChange) {
      state.viewToBarChange({ slug: viewToBar.value });
    }
  }, [viewToBar]);

  const onClickGroup = (slug) => {
    history.push({
      pathname: `/products/${slug}`,
      search:`?group=${slug}`
    });
 };

  return (
    <div className="sidebar__pannel">
      <div className="sidebar--header">
        <div className="">
          {user && user.status > 0 ? (
            <Link
              className="react__link--colorless sidebar__header--user"
              to="/user/profile"
              onClick={() => {
                props.toggleSideBar();
              }}
            >
              <FontAwesomeIcon size="1x" icon={faUserCircle} />
              {language === "en" ? <span>Profile</span> : <span>প্রোফাইল</span>}
            </Link>
          ) : (
            <div
              className="react__link--colorless sidebar__header--user"
              onClick={() => {
                props.toggleSideBar();
                dispatch(
                  setSigninDialog({
                    signinDialog: { open: true, redirectTo: "" },
                  })
                );
              }}
            >
              <FontAwesomeIcon size="1x" icon={faUserCircle} />
              {language === "en" ? <span>Sign in</span> : <span>সাইন ইন</span>}
            </div>
          )}
        </div>
        <div className="">
          <Link
            className="react__link--colorless sidebar__header--home"
            to="/"
            onClick={() => props.toggleSideBar()}
          >
            <FontAwesomeIcon size="1x" icon={faHome} />
            {language === "en" ? <span>Home</span> : <span>হোম</span>}
          </Link>
        </div>
      </div>
      <div className="sidebar--content">
        <div
          className="offer__products react__link--colorless"
        
          onClick={() => {props.toggleSideBar(); onClickGroup("offer")}}
        >
          <span className="offer--text">
            {language === "en" ? "Offer" : "অফার"}
          </span>
          <span className="offer--count">
            {language === "en"
              ? offerProductsCount
              : englishToBangla(offerProductsCount)}
          </span>
        </div>
        <hr className="sidebar--divider" />
        <div
          className="sidebar__group react__link--colorless"
        
          onClick={() => {props.toggleSideBar(); onClickGroup("covid-19-protection")}}
        >
         <img src={`/images/menu_covid.png`} alt="Sowdamart" />
          <span className="">
            {language === "en" ? "COVID-19 Protection" : "কোভিড-১৯ সুরক্ষা"}
          </span>
        </div>
        <div
          className="sidebar__group react__link--colorless"
        
          onClick={() => {props.toggleSideBar(); onClickGroup("winter-collection")}}
        >
        <img src={`/images/menu_winter.png`} alt="Sowdamart" />
          <span className="">
            {language === "en" ? "Winter Collection" : "শীতের আয়োজন"}
          </span>
        </div>
        <div
          className="sidebar__group react__link--colorless"
        
          onClick={() => {props.toggleSideBar(); onClickGroup("new-arrival")}}
        >
          <img src={`/images/menu_new.png`} alt="Sowdamart" />
          <span className="">
            {language === "en" ? "New Arrival" : "নিউ এরাইভাল"}
          </span>
        </div>
        <div
          className="sidebar__group react__link--colorless"
        
          onClick={() => {props.toggleSideBar(); onClickGroup("flash-sales")}}
        >
          <img src={`/images/menu_flash.png`} alt="Sowdamart" />
          <span className="">
            {language === "en" ? "Flash Sales" : "ফ্ল্যাশ সেলস"}
          </span>
        </div>
        <div
          className="sidebar__group react__link--colorless"
        
          onClick={() => {props.toggleSideBar(); onClickGroup("flash-sales")}}
        >
          <img src={`/images/menu_popular.png`} alt="Sowdamart" />
          <span className="">
            {language === "en" ? "Popular" : "জনপ্রিয়"}
          </span>

        </div>
        <hr className="sidebar--divider" />
        {
          <div>
            <TreeExample
              setViewToBarChange={(callBack) => {
                // setState({ ...state, viewToBarChange: callBack });
              }}
              setBar={(bar) => {
                // selectedBar(bar);
                // props.toggleSideBar();
              }}
              tree={props.tree}
              viewToBar={viewToBar}
              resolutionSelector={resolutionSelector}
              language={language}
            ></TreeExample>
          </div>
        }
      </div>
    </div>
  );
};

export default SidebarContent;
