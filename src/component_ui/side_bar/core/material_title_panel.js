import React from "react";
import PropTypes from "prop-types";
const styles = {
  root: {
    fontFamily:
      '"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
    fontWeight: 300,
    
  },
  header: {
    backgroundColor: "red",
    color: "white",
    paddingTop: "0px",
    paddingBottom: "0px",
    fontSize: "1.5em",
    height:60
    
  }
};

const MaterialTitlePanel = props => {
  const rootStyle = props.style
    ? { ...styles.root, ...props.style }
    : styles.root;

  return (
    <div style={rootStyle}>
      {props.renderTitle&&<div style={styles.header}>{props.title}</div>}
      {props.children}
    </div>
   
  );
};

MaterialTitlePanel.propTypes = {
  style: PropTypes.object,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  children: PropTypes.object
};

export default MaterialTitlePanel;
