import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./index";

//https://reactrouter.com/web/example/auth-workflow
const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() && isAuthenticated().user.role === 1  ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: `${isAuthenticated()?"/":"/signin"}`,
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default AdminRoute;
