import React from "react";
import { Link, withRouter } from "react-router-dom";
import "../App.css";

const isActive = (history, path) => {
  console.log("is active called");
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#000" };
  }
};

const mystyle = {
    color: "red",
    backgroundColor: "DodgerBlue",
  
  };

  /**
   * props come from react-router-dom
   * becaue we are using withRouter
   */
const Menu = (props)=>(
<div className="">
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <ul className="navbar-nav mr-auto">
        <li className="nav-item">
            <Link className="nav-link" style={isActive(props.history, '/')} to="/">Home</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" style={isActive(props.history, '/signin')} to="/signin">Sign in</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" style={isActive(props.history, '/signup')} to="/signup">Sign up</Link>
        </li>
    </ul>
    </nav>

</div>)


export default withRouter(Menu);
