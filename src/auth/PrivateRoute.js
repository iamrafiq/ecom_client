import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/authSlice";

//https://reactrouter.com/web/example/auth-workflow
const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useSelector(selectUser);
  return <Route
    {...rest}
    render={(props) =>
      user ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/user/signin",
            state: { from: props.location },
          }}
        />
      )
    }
  />
  };

export default PrivateRoute;
