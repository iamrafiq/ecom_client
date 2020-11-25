import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
  selectAuthenticateSelection,
} from "../../../redux/settingsSlice";
import { selectOfferProducts } from "../../../redux/homeSlice";
import "./side-bar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { englishToBangla } from "../../../util/utils";
import { faUserCircle } from "@fortawesome/fontawesome-free-solid";

const SidebarContent = (props) => {
  const viewToBar = useSelector(selectSideBarViewToBarSelection);
  const resolutionSelector = useSelector(selectResolutionSelection);
  const language = useSelector(selectLanguageSelection);
  const auth = useSelector(selectAuthenticateSelection);
  const offerProducts = useSelector(selectOfferProducts);


  const [state, setState] = useState({
    viewToBarChange: "",
  });
  const dispatch = useDispatch();

  const selectedBar = (bar) => {
    dispatch(loadCategoryWithProduct(bar));
    dispatch(setBarToView({ barToView: bar }));
  };
  useEffect(() => {
    if (state.viewToBarChange) {
      state.viewToBarChange({ slug: viewToBar.value });
    }
  }, [viewToBar]);

  return (
    <div className="sidebar__pannel">
      <div className="sidebar--header">
        <FontAwesomeIcon size="2x" icon={faUserCircle} />
        {auth ? (
          <Link
            className="react__link--colorless"
            to="/user/profile"
            onClick={() => props.toggleSideBar()}
          >
            {language === "en" ? <span>Profile</span> : <span>প্রোফাইল</span>}
          </Link>
        ) : (
          <Link
            className="react__link--colorless"
            to="/user/signin"
            onClick={() => props.toggleSideBar()}
          >
            {language === "en" ? (
              <span>Hello, Sign in</span>
            ) : (
              <span>হ্যালো, সাইন ইন</span>
            )}
          </Link>
        )}
      </div>
      <div className="sidebar--content">
        {language === "en" ? (
          <Link className="offer__products react__link--colorless" to={"offer"}  onClick={() => props.toggleSideBar()}>
            <span className="offer--text">Offer</span>
            <span className="offer--count">{offerProducts.length}</span>
          </Link>
        ) : (
          <Link className="offer__products react__link--colorless" to={"offer"}  onClick={() => props.toggleSideBar()}>
            <span className="offer--text">অফার</span>
            <span className="offer--count">
              {englishToBangla(offerProducts.length)}
            </span>
          </Link>
        )}

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