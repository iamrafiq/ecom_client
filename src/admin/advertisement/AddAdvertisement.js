import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Layout from "../../core/Layout";
import { useSelector } from "react-redux";
import { selectUser, selectToken } from "../../redux/authSlice";

import { Link, Redirect } from "react-router-dom";
import { getCategories } from "../apiAdmin";
import { getAllProducts } from "../apiAdmin";

import { createAdvertisement } from "./apiAdvertisement";
import Select from "react-select";
var slugify = require("slugify");

const AddAvertisement = () => {
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  const [photo, setPhoto] = useState(null);
  const [photoBangla, setPhotoBangla] = useState(null);
  const [products, setProducts] = useState({});
  const [categories, setCategories] = useState({});

  // const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    name: "",
    slug:"",
    slugPages: "",
    customSlug: "",
    categorySlugs: "",
    productSlugs: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: "",
  });

  const {
    name,
    slug,
    slugPages,
    customSlug,
    categorySlugs,
    productSlugs,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
  } = values;

  const downloadAllProducts = () => {
    getAllProducts().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        console.log("products...", data);

        setProducts(data)
        setValues({
          ...values,
          loading: false,
          formData: new FormData(),
        });
      }
    });
  };
  const downloadAllCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        console.log("cats...", data);

        const rootless = data.filter((e) => e.name !== "root");
        setCategories(rootless)
        setValues({
          ...values,
          loading: false,
          formData: new FormData(),
        });
        downloadAllProducts();
      }
    });
  };
  useEffect(() => {
   
    downloadAllCategories();
    // if (products.length <= 0) {
    //   downloadAllProducts();
    // }
    // if (categories.length <= 0) {
    //   downloadAllCategories();
    // }
  }, []);
  // useEffect(() => {
  //   if (products.length <= 0) {
  //     downloadAllProducts();
  //   }
  //   if (categories.length <= 0) {
  //     downloadAllCategories();
  //   }
  // }, [products, categories]);

  const handlePhotoChange = (name) => (event) => {
    if (name == "photo") {
      setPhoto(event.target.files[0]);
    }else if (name == "photoBangla"){
      setPhotoBangla(event.target.files[0]);
    }

  };
  const handleChange = (field) => (event) => {
    let value = event.target.value;
    if (field === "name") {
      const slugStr = slugify(value, {
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

    // if (parents.length !== 0 && parent == "") {
    //   setValues({ ...values, error: "Select a parent" });
    //   return;
    // }

    let slug = "";
    if (categorySlugs.length > 0) {
      slug = categorySlugs;
    }
    if (productSlugs.length > 0) {
      if (slug.length > 0) {
        slug += "," + productSlugs;
      } else {
        slug = productSlugs;
      }
    }
    if (customSlug.length > 0) {
      if (slug.length > 0) {
        slug += "," + customSlug;
      } else {
        slug = customSlug;
      }
    }
    if (slug.length > 0) {
      formData.set("slugPages", slug);
    }
    if (photo !== null) {
      formData.append("photo", photo);
    }
    if (photoBangla !== null) {
      formData.append("photoBangla", photoBangla);
    }
    setValues({ ...values, error: "", loading: true });
    createAdvertisement(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          slugPages: "",
          products: [],
          customSlug: "",
          trash: false,
          loading: false,
          createdProduct: data.name,
        });

        //init();
      }
    });
  };

  const handleChangeCategoris = (selectedOption) => {
    console.log(`Option selected:`, selectedOption);

    if (selectedOption != null) {
      const catsSlug = selectedOption.map((cat, index) => {
        return cat.obj.slug;
      });

      setValues({
        ...values,
        categorySlugs: catsSlug.toString(),
      });
    } else {
      setValues({ ...values, categorySlugs: "" });
    }
  };
  const handleChangeProducts = (selectedOption) => {
    console.log(`Option selected:`, selectedOption);

    if (selectedOption != null) {
      const productsSlug = selectedOption.map((product, index) => {
        return product.obj.slug;
      });

      setValues({
        ...values,
        productSlugs: productsSlug.toString(),
      });
    } else {
      setValues({ ...values, productSlugs: "" });
    }
  };
  const newPostFrom = () => (
    <form className="mb-3" onSubmit={clickSubmit} id="form1">
      <h4>Upload Image</h4>
      <div className="form-group">
        <label htmlFor="" className="btn btn-secondary">
          <input
            onChange={handlePhotoChange("photo")}
            type="file"
            name="photo"
            accept="image/*"
          />
        </label>
      </div>
      <h4>Upload Bangla Image</h4>

      <div className="form-group">
        <label htmlFor="" className="btn btn-secondary">
          <input
            onChange={handlePhotoChange("photoBangla")}
            type="file"
            name="photoBangla"
            accept="image/*"
          />
        </label>
      </div>
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
      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Cust Page Slug: (Coma separeted value)
        </label>
        <input
          onChange={handleChange("customSlug")}
          type="text"
          className="form-control"
          value={customSlug}
        />
      </div>

      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Select Categori Pages:
        </label>
        {categories.length > 0 && (
          <Select
            onChange={handleChangeCategoris}
            closeMenuOnSelect={false}
            // defaultValue={[colourOptions[0], colourOptions[1]]}
            isMulti
            options={categories.map((cat, index) => {
              return {
                value: cat.name,
                label: cat.name,
                obj: cat,
              };
            })}
          />
        )}
      </div>
      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Select Product Pages:
        </label>
        {products.length > 0 && (
          <Select
            onChange={handleChangeProducts}
            closeMenuOnSelect={false}
            // defaultValue={[colourOptions[0], colourOptions[1]]}
            isMulti
            options={products.map((p, index) => {
              return {
                value: p.name,
                label: p.name,
                obj: p,
              };
            })}
          />
        )}
      </div>
      <button
        type="submit"
        form="form1"
        value="Submit"
        className="btn btn-outline-primary mr-5"
      >
        Create a new Category
      </button>
      {/* <button type="button" className="btn btn-outline-primary">
        Back to dashboard
      </button> */}
      {goBack()}
    </form>
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
  return (
    <Layout
      title=" Add a new product"
      description={`G'day ${user.name}, ready to add a new product?`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showLoading()}
          {showSuccess()}
          {showError()}
          {newPostFrom()}
        </div>
      </div>
    </Layout>
  );
};

export default AddAvertisement;
