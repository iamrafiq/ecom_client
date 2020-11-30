import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/authSlice";

//https://reactrouter.com/web/example/auth-workflow
const AdminRoute = ({ component: Component, ...rest }) => {
  const user = useSelector(selectUser);

  return <Route
    {...rest}
    render={(props) =>
      user && user.role === 1   ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: `${user?"/":"/user/signin"}`,
            state: { from: props.location },
          }}
        />
      )
    }
  />
  };

export default AdminRoute;
