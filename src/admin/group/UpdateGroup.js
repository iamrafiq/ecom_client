import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Layout from "../../core/Layout";
import { useSelector } from "react-redux";

import { selectUser, selectToken } from "../../redux/authSlice";
import { Link, Redirect, useHistory } from "react-router-dom";

import { getGroupById, update } from "./apiGroup";
import Select from "react-select";
import LoadingBar from "../../util/LoadingBar";
var slugify = require("slugify");

const UpdateGroup = ({ match }) => {
  const history = useHistory();

  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
 

  const [values, setValues] = useState({
    name: "",
    slug: "",
    loading: false,
    createdProduct:"",
    error:"",
    formData: new FormData(),
  });

  const { name, slug, loading, error, createdProduct, formData } = values;

  useEffect(() => {
    console.log("group match", match.params.id)
    getGroupById(match.params.id).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        console.log("group download... advert", data);
        setValues({
          ...values,
          name: data.name,
          slug: data.slug,
          loading: false,
          formData: new FormData(),
        });
      }
    });
  }, []);

  const handleChange = (field) => (event) => {
    let value = event.target.value;
    if (field === "name") {
      const nameClean = value.replace(/[^a-zA-Z0-9]/g, "-");

      const slugStr = slugify(nameClean, {
        replacement: "-", // replace spaces with replacement character, defaults to `-`
        remove: undefined, // remove characters that match regex, defaults to `undefined`
        lower: true, // convert to lower case, defaults to `false`
        strict: false, // strip special characters except replacement, defaults to `false`
        locale: "vi", // language code of the locale to use
      });
      setValues({
        ...values,
        slug: slugStr,
        error: false,
        createdProduct: false,
      });

      formData.set("slug", slugStr);
    }
    formData.set(field, value);
    setValues({
      ...values,
      [field]: value,
      error: false,
      createdProduct: false,
    });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    
    formData.set("name", name);

    setValues({ ...values, error: "" });
    update(match.params.id, user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        history.push("/admin/dashboard");
      }
    });
  };

  const newPostFrom = () => (
    <React.Fragment>
      {loading ? (
        <React.Fragment>
          <LoadingBar
            loading={loading}
            message={`Updating advertisiment.. please wait`}
          ></LoadingBar>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <form className="mb-3" onSubmit={clickSubmit} id="form1">
            <div className="form-group">
              <label htmlFor="" className="text-muted">
                Name
              </label>
              <input
                onChange={handleChange("name")}
                type="text"
                className="form-control"
                value={name}
              />
            </div>
            <button
              type="submit"
              form="form1"
              value="Submit"
              className="btn btn-outline-primary mr-5"
            >
              Update Group
            </button>
            {/* <button type="button" className="btn btn-outline-primary">
        Back to dashboard
      </button> */}
            {goBack()}
          </form>
        </React.Fragment>
      )}
    </React.Fragment>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );
  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h2>{`${createdProduct}`} is created</h2>
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-success">
        <h2>Loading...</h2>
      </div>
    );

  const goBack = () => (
    <Link
      to="/admin/dashboard"
      className="text-warning btn btn-outline-primary"
    >
      Back to Dashboard
    </Link>
  );
  return loading ? (
    showLoading()
  ) : (
    <Layout
      title=" Add a new product"
      description={`G'day ${user.name}, ready to add a new product?`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showSuccess()}
          {showError()}
          {newPostFrom()}
        </div>
      </div>
    </Layout>
  );
};

export default UpdateGroup;
