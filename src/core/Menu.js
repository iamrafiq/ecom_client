import React, {Fragment} from "react";
import { Link, withRouter } from "react-router-dom";
import "../App.css";
import { signout, isAuthenticated } from "../auth/index";
import { itemTotal } from "./cartHelper";
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
const Menu = (props) => (
  <div className="">
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(props.history, "/")}
            to="/"
          >
            Home
          </Link>
        </li> 
        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(props.history, "/shop")}
            to="/shop"
          >
            Shop
          </Link>
        </li> 
        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(props.history, "/cart")}
            to="/cart"
          >
            Cart <sup ><small className="cart-badge">{itemTotal()}</small></sup>
          </Link>
        </li> 
        {isAuthenticated() && isAuthenticated().user.role === 0 &&(
           <li className="nav-item">
           <Link
             className="nav-link"
             style={isActive(props.history, "/user/dashboard")}
             to="/user/dashboard"
           >
             Dashboard
           </Link>
         </li>
        )}
         {isAuthenticated() && isAuthenticated().user.role === 1 &&(
           <li className="nav-item">
           <Link
             className="nav-link"
             style={isActive(props.history, "/admin/dashboard")}
             to="/admin/dashboard"
           >
             Dashboard
           </Link>
         </li>
        )}
        {!isAuthenticated() && (
          <Fragment>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(props.history, "/signin")}
                to="/signin"
              >
                Sign in
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(props.history, "/signup")}
                to="/signup"
              >
                Sign up
              </Link>
            </li>
          </Fragment>
        )}
       {isAuthenticated() && (
          <li className="nav-item">
          <span
            className="nav-link"
            style={{ cursor: "pointer", color: "#000" }}
            onClick={() =>
              signout(() => {
                props.history.push("/");
              })
            }
          >
            Signout
          </span>
        </li>
       )}
      </ul>
    </nav>
  </div>
);

export default withRouter(Menu);
