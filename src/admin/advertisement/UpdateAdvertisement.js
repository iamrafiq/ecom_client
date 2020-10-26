import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Layout from "../../core/Layout";
import { isAuthenticated } from "../../auth";
import { Link, Redirect } from "react-router-dom";
import { getCategories } from "../apiAdmin";
import { getAllProducts } from "../apiAdmin";

import {
  getAdvertisementsById,
  getAdvertisementsBySlug,
  updateAdvertisement,
} from "./apiAdvertisement";
import Select from "react-select";

const UpdateAvertisement = ({ match }) => {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    name: "",
    slugPages: "",
    photoUrl: "",
    advertisement: null,
    categories: [],
    products: [],
    customSlug: "",
    categorySlugs: "",
    productSlugs: "",
    slugsCategoryDefault: [],
    slugsProductDefault: [],
    slugsCustomDefault: [],
    productAPICalled: false,
    categoryAPICalled: false,
    advertisementAPICalled: false,
    loading: true,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: "",
  });

  const {
    name,
    slugPages,
    photoUrl,
    advertisement,
    categories,
    products,
    customSlug,
    categorySlugs,
    productSlugs,
    slugsCategoryDefault,
    slugsProductDefault,
    slugsCustomDefault,
    productAPICalled,
    categoryAPICalled,
    advertisementAPICalled,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
  } = values;

  const downloadAdvertisementsById = (id) => {
    getAdvertisementsById(id).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        console.log("products...", data);

        setValues({
          ...values,
          name:data.name,
          photoUrl:data.photoUrl,
          advertisement: data,
          advertisementAPICalled: true,
          formData: new FormData(),
        });
      }
    });
  };

  const downloadAllProducts = () => {
    getAllProducts().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          products: data,
          productAPICalled: true,
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
        const rootless = data.filter((e) => e.name !== "root");
        setValues({
          ...values,
          categories: rootless,
          categoryAPICalled: true,
          formData: new FormData(),
        });
      }
    });
  };
  useEffect(() => {
    if (advertisement === null) {
      downloadAdvertisementsById(match.params.advertisementId);
    }
    if (products.length <= 0) {
      downloadAllProducts();
    }
    if (categories.length <= 0) {
      downloadAllCategories();
    }
    if (productAPICalled && categoryAPICalled && advertisementAPICalled) {
      const catsSlug = categories.filter((value) => {
        if (advertisement.slugPages.includes(value.slug)) {
          var index = advertisement.slugPages.indexOf(value.slug);
          advertisement.slugPages.splice(index, 1);
          return true;
        }
      });
      const prodSlug = products.filter((value) => {
        if (advertisement.slugPages.includes(value.slug)) {
          var index = advertisement.slugPages.indexOf(value.slug);
          advertisement.slugPages.splice(index, 1);
          return true;
        }
      });
      const otherSlugs = advertisement.slugPages;
      // console.log("cats slug", catsSlug);
      // console.log("prod slug", prodSlug);
      // console.log("other slug",  advertisement.slugPages);

      setValues({
        ...values,
        slugsCategoryDefault: catsSlug,
        categorySlugs:catsSlug.map((cat, index) =>  cat.slug),
        slugsProductDefault: prodSlug,
        productSlugs:prodSlug.map((prod, index) =>  prod.slug),
        customSlugDefault: otherSlugs,
        customSlug:otherSlugs,
        productAPICalled: false,
        categoryAPICalled: false,
        advertisementAPICalled: false,
        loading:false
      });
    }
  }, [products, categories, advertisement]);

  const handleChange = (field) => (event) => {
    let value = event.target.value;
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
    formData.set("name", name);
    formData.set("photoUrl", photoUrl);

    setValues({ ...values, error: "" });
    updateAdvertisement(match.params.advertisementId, user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          slugPages: "",
          photoUrl: "",
          advertisement: null,
          categories: [],
          products: [],
          customSlug: "",
          categorySlugs: "",
          productSlugs: "",
          slugsCategory: [],
          slugsProduct: [],
          slugsCustom: [],
          productAPICalled: false,
          categoryAPICalled: false,
          advertisementAPICalled: false,
          loading: true,
          error: "",
          createdProduct: "",
          redirectToProfile: false,
          formData: "",
          createdProduct: data.name,
        });

        //init();
      }
    });
  };

  const handleChangeCategoris = (selectedOption) => {
    console.log(`Option selected:`, selectedOption);

    if (selectedOption != null) {
      const catsSlug = selectedOption.map((cat, index) =>  cat.obj.slug);

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
      const productsSlug = selectedOption.map((product, index) => product.obj.slug);

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
          Photo Url
        </label>
        <input
          onChange={handleChange("photoUrl")}
          type="text"
          className="form-control"
          value={photoUrl}
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
        {
          <Select
            key="cat"
            onChange={handleChangeCategoris}
            closeMenuOnSelect={false}
            defaultValue={slugsCategoryDefault.map((cat, index) => {
              return {
                value: cat.name,
                label: cat.name,
                obj:cat,
              };
            })}
            isMulti
            options={categories.map((cat, index) => {
              return {
                value: cat.name,
                label: cat.name,
                obj:cat,
              };
            })}
          />
        }
      </div>
      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Select Product Pages:
        </label>
        { 
          <Select
            onChange={handleChangeProducts}
            closeMenuOnSelect={false}
            defaultValue={slugsProductDefault.map((prod, index) => {
              return {
                value: prod.name,
                label: prod.name,
                obj:prod
              };
            })}
            isMulti
            options={products.map((prod, index) => {
              return {
                value: prod.name,
                label: prod.name,
                obj:prod
              };
            })}
          />
        }
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
    loading?(showLoading()) : (<Layout
      title=" Add a new product"
      description={`G'day ${user.name}, ready to add a new product?`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          
          {showSuccess()}
          {showError()}
          { newPostFrom()}
        </div>
      </div>
    </Layout>)
  );
};

export default UpdateAvertisement;
