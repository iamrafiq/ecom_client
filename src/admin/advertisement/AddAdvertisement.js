import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Layout from "../../core/Layout";
import { useSelector } from "react-redux";
import { selectUser, selectToken } from "../../redux/authSlice";

import { Link, Redirect, useHistory } from "react-router-dom";
import { getCategories } from "../apiAdmin";
import { getGroupList } from "../group/apiGroup"
import { getManufacturertList } from "../manufacturer/apiManufacturer"

import { createAdvertisement } from "./apiAdvertisement";
import Select from "react-select";
import LoadingBar from "../../util/LoadingBar";
import { getProductsByCatId } from "../apiAdmin";

var slugify = require("slugify");

const AddAvertisement = () => {
  const history = useHistory();

  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  const [photo, setPhoto] = useState(null);
  const [photoBangla, setPhotoBangla] = useState(null);
  const [productsOfACat, setProductsOfACat] = useState({});
  const [productsForLinkCat, setProductsForLinkCat] = useState({});

  const [categories, setCategories] = useState({});
  const [groups, setGroups] = useState({});
  const [manufacturer, setManufacturer] = useState({});

  const [values, setValues] = useState({
    name: "",
    slug: "",
    slugPages: "",
    customSlug: "",
    categorySlugs: "",
    productSlugs: "",
    linkType: "",
    linkSlug: "",
    linkProductSlug: "",
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
    linkType,
    linkSlug,
    linkProductSlug,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
  } = values;

  const init = async () => {

    let { groups } = await new Promise(function (resolve, reject) {
      getGroupList().then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
          reject(data.error);
          return;
        } else {
          resolve({ groups: data });
        }
      });
    });

    let { manufacturers } = await new Promise(function (resolve, reject) {
      getManufacturertList().then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
          reject(data.error);
          return;
        } else {
          resolve({ manufacturers: data });
        }
      });
    });

    let { categories } = await new Promise(function (resolve, reject) {
      getCategories().then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
          reject(data.error);
          return;
        } else {
          const rootless = data.filter((e) => e.name !== "root");
          resolve({ categories: rootless });
        }
      });
    });
    setManufacturer(manufacturers);
    setGroups(groups);
    setCategories(categories);
    setValues({
          ...values,
          loading: false,
          formData: new FormData(),
        });

  };
  useEffect(() => {
    init();
  }, []);
 
  const handleChangeLoadProductsForSlug = (field) => (event) => {
    let id = event.target.value;
    getProductsByCatId(id).then((data) => {
      if (data === undefined && data.error) {
        console.log(data.error);
      } else {
        setProductsOfACat(data);
      }
    });
  };
  const handleOptionChange = (option) => {
    formData.set(option.field, option.value);
    setValues({ ...values, [option.field]: option.value, formData: formData });
  };
  const handlePhotoChange = (name) => (event) => {
    if (name == "photo") {
      setPhoto(event.target.files[0]);
    } else if (name == "photoBangla") {
      setPhotoBangla(event.target.files[0]);
    }
  };
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
          customSlug: "",
          trash: false,
          loading: false,
          createdProduct: data.name,
        });
        history.push("/admin/dashboard");
        //init();
      }
    });
  };

  const handleChangeCategories = (selectedOption) => {
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
  const handleChangeGroups = (selectedOption) => {
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
  const handleChangeManufacturer = (selectedOption) => {
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
  const handleLinkCategory = (selectedOption) => {
    console.log(`Option selected:`, selectedOption.obj.slug);
    if (selectedOption) {
      setValues({ ...values, linkSlug: selectedOption.obj.slug });
      formData.set("linkSlug", selectedOption.obj.slug);
    }
  };

  const handleLinkProduct = (selectedOption) => {
    console.log(`Option selected:`, selectedOption.obj.slug);
    if (selectedOption) {
      setValues({ ...values, linkProductSlug: selectedOption.obj.slug });
      formData.set("linkProductSlug", selectedOption.obj.slug);
    }
  };

  const handleLinkCategoryForProduct = (selectedOption) => {
    console.log(`Option selected For P:`, selectedOption);
    if (selectedOption) {
      getProductsByCatId(selectedOption.obj._id).then((data) => {
        if (data === undefined && data.error) {
          console.log(data.error);
        } else {
          console.log("Prod PPP,", data);
          setProductsForLinkCat(data);
        }
      });
      setValues({ ...values, linkSlug: selectedOption.obj.slug });
      formData.set("linkSlug", selectedOption.obj.slug);
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
    <React.Fragment>
      {loading ? (
        <React.Fragment>
          <LoadingBar
            loading={loading}
            message={`Adding advertisiment.. please wait`}
          ></LoadingBar>
        </React.Fragment>
      ) : (
        <React.Fragment>
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
                  onChange={handleChangeCategories}
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
                Select a Category For Product Pages
              </label>
              <select
                onChange={handleChangeLoadProductsForSlug("parent")}
                className="form-control"
              >
                <option>Select a category</option>
                {categories.length > 0 &&
                  categories.map((cat, index) => (
                    <option key={index} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
              </select>
            </div>

            {productsOfACat.length > 0 && (
              <React.Fragment>
                <div className="form-group">
                  <label htmlFor="" className="text-muted">
                    Select Products Pages:
                  </label>
                  <Select
                    onChange={handleChangeProducts}
                    closeMenuOnSelect={false}
                    // defaultValue={[colourOptions[0], colourOptions[1]]}
                    isMulti
                    options={productsOfACat.map((p, index) => {
                      return {
                        value: p.name,
                        label: p.name,
                        obj: p,
                      };
                    })}
                  />
                </div>
              </React.Fragment>
            )}

            {/* <div className="form-group">
              <label htmlFor="" className="text-muted">
                Select Product Pages:
              </label>
              {selectedProducts.length > 0 && (
                <Select
                  onChange={handleChangeProducts}
                  closeMenuOnSelect={false}
                  defaultValue={selectedProducts.map((item, index)=>item)}
                  isMulti
                  options={selectedProducts.map((item, index)=>item)}
                />
              )}
            </div> */}

            <div className="form-group">
              <label htmlFor="" className="text-muted">
                Link Type
              </label>
              <Select
                onChange={handleOptionChange}
                options={[
                  { value: 0, label: "Category", field: "" },
                  { value: 1, label: "Product", field: "" },
                ].map((op, index) => {
                  op.field = "linkType";
                  return op;
                })}
              />
            </div>
            {linkType === 0 && (
              <div className="form-group">
                <label htmlFor="" className="text-muted">
                  Select A Category:
                </label>
                {categories.length > 0 && (
                  <Select
                    onChange={handleLinkCategory}
                    closeMenuOnSelect={false}
                    // defaultValue={[colourOptions[0], colourOptions[1]]}
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
            )}
            {linkType === 1 && (
              <React.Fragment>
                <div className="form-group">
                  <label htmlFor="" className="text-muted">
                    Select A Category For Product Linking:
                  </label>
                  {categories.length > 0 && (
                    <Select
                      onChange={handleLinkCategoryForProduct}
                      closeMenuOnSelect={false}
                      // defaultValue={[colourOptions[0], colourOptions[1]]}
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
                  {productsForLinkCat.length > 0 && (
                    <React.Fragment>
                      <label htmlFor="" className="text-muted">
                        Select Products For Link:
                      </label>
                      <Select
                        onChange={handleLinkProduct}
                        closeMenuOnSelect={false}
                        // defaultValue={[colourOptions[0], colourOptions[1]]}
                        options={productsForLinkCat.map((p, index) => {
                          return {
                            value: p.name,
                            label: p.name,
                            obj: p,
                          };
                        })}
                      />
                    </React.Fragment>
                  )}
                </div>
              </React.Fragment>
            )}

            <button
              type="submit"
              form="form1"
              value="Submit"
              className="btn btn-outline-primary mr-5"
            >
              Create a new Advertisiment
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
