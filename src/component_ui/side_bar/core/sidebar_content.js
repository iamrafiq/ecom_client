import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";
import SideBarPanel from "./side_bar_panel";
import { SIDE_BAR_WIDTH } from "../../../config";
import TreeExample from "../../treebeard/tree";
import { useDispatch, useSelector } from "react-redux";
import {
  setBarToView,
  selectSideBarViewToBarSelection,
} from "../../../redux/sideBarSlice";
import { loadCategoryWithProduct } from "../../../redux/categoryWithProductSlice";

const styles = {
  sidebar: {
    width: `${SIDE_BAR_WIDTH}rem`,
    height: "100%",
    overflow: "hidden" /* Hide scrollbars */,
  },
  sidebarLink: {
    display: "block",
    padding: "16px 0px",
    color: "#757575",
    textDecoration: "none",
  },
  divider: {
    margin: "8px 0",
    height: 1,
    backgroundColor: "#757575",
  },
  content: {
    padding: "16px",
    height: "100%",
    backgroundImage:
      "linear-gradient(to bottom, #fff,#fff,#fff,#fff,#fff,#fff , #7CCD7C)",
  },
};
const style = {
  Collapsible: {
    backgroundColor: "black",
  },
};

const SidebarContent = (props) => {
  const viewToBar = useSelector(selectSideBarViewToBarSelection);
  const [state, setState] = useState({
    viewToBarChange: "",
  });
  const dispatch = useDispatch();
  const style = props.style
    ? { ...styles.sidebar, ...props.style }
    : styles.sidebar;
  const selectedBar = (bar) => {
    dispatch(loadCategoryWithProduct(bar));
    dispatch(setBarToView({ barToView: bar }));
  };
  useEffect(() => {
    console.log("use effect..sidebar content..", state.viewToBarChange);
    if (state.viewToBarChange) {
      // console.log("use effect..sidebar content", viewToBarChange)

      state.viewToBarChange({ slug: viewToBar.value });
    }
  }, [viewToBar]);


  return (
    <SideBarPanel renderTitle={false} title="" style={style}>
      <div style={styles.content}>
        <a href="index.html" style={styles.sidebarLink}>
          Offer
        </a>
        <div style={styles.divider} />
        {
          <div>
            <TreeExample
              setViewToBarChange={(callBack) => {
                setState({ ...state, viewToBarChange: callBack });
              }}
              setBar={(bar) => {
                selectedBar(bar);
                props.toggleSideBar();
              }}
              tree={props.tree}
              viewToBar={viewToBar}
            ></TreeExample>
          </div>
        }
      </div>
    </SideBarPanel>
  );
};

SidebarContent.propTypes = {
  style: PropTypes.object,
};

export default SidebarContent;
