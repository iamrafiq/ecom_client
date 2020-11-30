import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { useSelector } from "react-redux";

import { selectUser, selectToken } from "../redux/authSlice";
import { Link, Redirect } from "react-router-dom";
import { read, update, updateUserInLocalStorage } from "./apiUser";
const Profile = (props) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const { name, email, password, error, success } = values;

  const init = (userId) => {
    // console.log(userId)
    read(userId, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: true });
      } else {
        setValues({ ...values, name: data.name, email: data.email });
      }
    });
  };

  useEffect(() => {
    init(props.match.params.userId);
  }, []);
  const handleChange = (field) => (e) => {
    setValues({ ...values, error: false, [field]: e.target.value });
  };
  const clickSubmit = (e) => {
    e.preventDefault();
    update(props.match.params.userId, token, { name, email, password }).then(
      (data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          updateUserInLocalStorage(data, () => {
            setValues({
              ...values,
              name: data.name,
              email: data.email,
              success: true,
            });
          });
        }
      }
    );
  };

  const redirectUser = (success) => {
    if (success) {
      return <Redirect to="/cart" />;
    }
  };
  const profileUpdate = (name, email, password) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          onChange={handleChange("name")}
          className="form-control"
          value={name}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          type="email"
          onChange={handleChange("email")}
          className="form-control"
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          type="password"
          onChange={handleChange("password")}
          className="form-control"
          value={password}
        />
      </div>
      <button onClick={clickSubmit} className="btn btn-primary">
        Submi
      </button>
    </form>
  );
  return (
    <Layout
      title="Profile"
      description="Update your profile"
      className="container-fluid"
    >
      <h2 className="mb-4">Profile update</h2>
      {profileUpdate(name, email, password)}
      {redirectUser(success)}
    </Layout>
  );
};

export default Profile;
