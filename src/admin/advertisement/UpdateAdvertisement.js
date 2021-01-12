import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Layout from "../../core/Layout";
import { useSelector } from "react-redux";

import { selectUser, selectToken } from "../../redux/authSlice";
import { Link, Redirect, useHistory } from "react-router-dom";
import { getCategories } from "../apiAdmin";
import { getGroupList } from "../group/apiGroup";
import { getManufacturertList } from "../manufacturer/apiManufacturer";
import {
  getAdvertisementsById,
  getAdvertisementsBySlug,
  updateAdvertisement,
} from "./apiAdvertisement";
import Select from "react-select";
import LoadingBar from "../../util/LoadingBar";
import { getProductsByCatId } from "../apiAdmin";
import { productsBySlugs, productBySlug } from "../../core/apiCore";
var slugify = require("slugify");

const UpdateAvertisement = ({ match }) => {
  const history = useHistory();

  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const [photo, setPhoto] = useState(null);
  const [photoBangla, setPhotoBangla] = useState(null);
  const [productsForLinkCat, setProductsForLinkCat] = useState([]);
  const [productsOfACat, setProductsOfACat] = useState([]);
  const [slugsProducts, setSlugsProducts] = useState([]);
  const [linkProduct, setLinkProduct] = useState({});

  const [categories, setCategories] = useState([]);
  const [groups, setGroups] = useState([]);
  const [manufacturers, setManufacturer] = useState([]);

  const [values, setValues] = useState({
    name: "",
    slug: "",
    selectedManufacturer: "",
    selectedGroups: "",
    selectedCategories: "",
    selectedProducts: "",
    slugPages: "",
    linkType: "",
    linkSlug: "",
    linkProductSlug: "",
    advertisement: null,
    // categories: [],
    products: [],
    customSlug: "",
    categorySlugs: "",
    productSlugs: "",
    loading: true,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: new FormData(),
  });

  const {
    name,
    slug,
    selectedManufacturer,
    selectedGroups,
    selectedCategories,
    selectedProducts,
    slugPages,
    linkType,
    linkSlug,
    linkProductSlug,
    advertisement,
    // categories,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
  } = values;

  const init = async (advertisementId) => {
    let { advertisement } = await new Promise(function (resolve, reject) {
      getAdvertisementsById(advertisementId).then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
          reject(data.error);
        } else {
          console.log("advert download... advert", data);
          resolve({ advertisement: data });
        }
      });
    });
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

    // const catLinkSlug = categories.filter((e) => e.name === advertisement.linkSlug);

    // let { productsOfCat } = await new Promise(function (resolve, reject) {
    //   getProductsByCatId(catLinkSlug._id).then((data) => {
    //     if (data.error) {
    //       setValues({ ...values, error: data.error });
    //       reject(data.error);
    //       return;
    //     } else {
    //       resolve({ productsOfCat: data });
    //     }
    //   });
    // });

    // let linkProduct;
    // if (advertisement.linkType === 1 && advertisement.linkProductSlug) {
    //   let { lp } = await new Promise(function (resolve, reject) {
    //     productBySlug(advertisement.linkProductSlug).then((data) => {
    //       if (data.error) {
    //         setValues({ ...values, error: data.error });
    //         reject(data.error);
    //         return;
    //       } else {
    //         resolve({ lp: data });
    //       }
    //     });
    //   });
    //   linkProduct = lp;
    // }
    // let { allProducts } = await new Promise(function (resolve, reject) {
    //   productsBySlugs(catLinkSlug._id).then((data) => {
    //     if (data.error) {
    //       setValues({ ...values, error: data.error });
    //       reject(data.error);
    //       return;
    //     } else {
    //       resolve({ allProducts: data });
    //     }
    //   });
    // });

    setManufacturer(manufacturers);
    setGroups(groups);
    setCategories(categories);

    // setProductsForLinkCat(productsOfCat);
    // setSlugsProducts(allProducts);
    // setLinkProduct(linkProduct);

    setValues({
      ...values,
      name: advertisement.name,
      slugPages: advertisement.slugPages,
      linkType: advertisement.linkType,
      linkSlug: advertisement.linkSlug,
      linkProductSlug:
        advertisement.linkProductSlug === undefined
          ? ""
          : advertisement.linkProductSlug,
      advertisement: advertisement,    
      loading: false,
      formData: new FormData(),
    });
  };




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
  const handleOptionChange = (option) => {
    formData.set(option.field, option.value);
    setValues({ ...values, [option.field]: option.value, formData: formData });
  };
  const handleLinkCategory = (selectedOption) => {
    console.log(`Option selected:`, selectedOption.obj.slug);
    if (selectedOption) {
      setValues({ ...values, linkSlug: selectedOption.obj.slug });
      formData.set("linkSlug", selectedOption.obj.slug);
    }
  };
  useEffect(() => {
    init(match.params.advertisementId);
    // downloadAdvertisementsById(match.params.advertisementId);
  }, []);
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
    if (slugPages.length > 0) {
      formData.set("slugPages", slugPages);
    }
    if (photo !== null) {
      formData.append("photo", photo);
    }
    if (selectedGroups.length > 0) {
      formData.set("groups", selectedGroups);
    }
    if (selectedCategories.length > 0) {
      formData.set("categories", selectedCategories);
    }
    if (selectedManufacturer.length > 0) {
      formData.set("manufacturers", selectedManufacturer);
    }
    if (selectedProducts.length > 0) {
      formData.set("products", selectedProducts);
    }
    formData.set("name", name);

    setValues({ ...values, error: "" });
    updateAdvertisement(
      match.params.advertisementId,
      user._id,
      token,
      formData
    ).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        history.push("/admin/dashboard");
      }
    });
  };

  const handleChangeGroups = (options) => {
    if (options != null) {
      const ids = options.map((item, index) => {
        return item.obj._id;
      });

      setValues({
        ...values,
        selectedGroups: ids.toString(),
      });
    } else {
      setValues({ ...values, selectedGroups: "" });
    }
  };
  const handleChangeManuf = (options) => {
    if (options != null) {
      const ids = options.map((item, index) => {
        return item.obj._id;
      });

      setValues({
        ...values,
        selectedManufacturer: ids.toString(),
      });
    } else {
      setValues({ ...values, selectedManufacturer: "" });
    }
  };
  const handleChangeCats = (options) => {
    if (options != null) {
      const ids = options.map((item, index) => {
        return item.obj._id;
      });

      setValues({
        ...values,
        selectedCategories: ids.toString(),
      });
    } else {
      setValues({ ...values, selectedCategories: "" });
    }
  };

  const handleChangeProducts = (options) => {
    if (options != null) {
      const ids = options.map((item, index) => {
        return item.obj._id;
      });

      setValues({
        ...values,
        selectedProducts: ids.toString(),
      });
    } else {
      setValues({ ...values, selectedProducts: "" });
    }
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
                Custom Page Slug: (Coma separeted value)
              </label>
              <input
                onChange={handleChange("slugPages")}
                type="text"
                className="form-control"
                value={slugPages}
              />
            </div>

            <div className="form-group">
              <label htmlFor="" className="text-muted">
                Manufacturers Pages
              </label>
              <Select
                onChange={handleChangeManuf}
                closeMenuOnSelect={false}
                isMulti
                defaultValue={advertisement.manufacturers.map((item, index) => {
                  return {
                    value: item.name,
                    label: item.name,
                    obj: item,
                  };
                })}
                options={manufacturers.map((manuf, index) => {
                  return {
                    value: manuf.name,
                    label: manuf.name,
                    obj: manuf,
                  };
                })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="" className="text-muted">
                Groups Pages
              </label>
              <Select
                onChange={handleChangeGroups}
                closeMenuOnSelect={false}
                isMulti
                defaultValue={advertisement.groups.map((item, index) => {
                  return {
                    value: item.name,
                    label: item.name,
                    obj: item,
                  };
                })}
                options={groups.map((group, index) => {
                  return {
                    value: group.name,
                    label: group.name,
                    obj: group,
                  };
                })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="" className="text-muted">
                Categories Pages
              </label>
              <Select
                onChange={handleChangeCats}
                closeMenuOnSelect={false}
                defaultValue={advertisement.categories.map((item, index) => {
                  return {
                    value: item.name,
                    label: item.name,
                    obj: item,
                  };
                })}
                isMulti
                options={categories.map((item, index) => {
                  return {
                    value: item.name,
                    label: item.name,
                    obj: item,
                  };
                })}
              />
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

            <React.Fragment>
                <div className="form-group">
                  <label htmlFor="" className="text-muted">
                    Select Products Pages:
                  </label>
                  <Select
                    onChange={handleChangeProducts}
                    closeMenuOnSelect={false}
                    defaultValue={advertisement.products.map((item, index) => {
                      return {
                        value: item.name,
                        label: item.name,
                        obj: item,
                      };
                    })}
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

            {/* {slugsProducts.length === 0 && productsOfACat.length > 0 && (
              <React.Fragment>
                <div className="form-group">
                  <label htmlFor="" className="text-muted">
                    Select Products Pages:
                  </label>
                  <Select
                    onChange={handleChangeProducts}
                    closeMenuOnSelect={false}
                    // defaultValue={slugsProducts.map((prod, index) => {
                    //   return {
                    //     value: prod.name,
                    //     label: prod.name,
                    //     obj: prod,
                    //   };
                    // })}
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
            )} */}

            <div className="form-group">
              <label htmlFor="" className="text-muted">
                Link Type
              </label>
              <Select
                onChange={handleOptionChange}
                defaultValue={[
                  { value: 0, label: "Category", field: "" },
                  { value: 1, label: "Product", field: "" },
                ].map((op, index) => {
                  if (op.value === linkType) return op;
                })}
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
                    defaultValue={categories.map((cat, index) => {
                      if (cat.slug === linkSlug)
                        return {
                          value: cat.name,
                          label: cat.name,
                          obj: cat,
                        };
                    })}
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
              // <div className="form-group">
              //   <label htmlFor="" className="text-muted">
              //     Write a product search text
              //   </label>
              //   <input
              //     onChange={handleChange("linkSlug")}
              //     type="text"
              //     className="form-control"
              //     value={linkSlug}
              //     required={true}
              //   />
              // </div>
              <React.Fragment>
                <div className="form-group">
                  <label htmlFor="" className="text-muted">
                    Select A Category For Product Linking:
                  </label>
                  {categories.length > 0 && (
                    <Select
                      onChange={handleLinkCategoryForProduct}
                      closeMenuOnSelect={false}
                      defaultValue={categories.map((cat, index) => {
                        if (cat.slug === linkSlug)
                          return {
                            value: cat.name,
                            label: cat.name,
                            obj: cat,
                          };
                      })}
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
                  {productsForLinkCat.length > 0 && linkProduct.length > 0 && (
                    <React.Fragment>
                      <label htmlFor="" className="text-muted">
                        Select Products For Link:
                      </label>
                      <Select
                        onChange={handleLinkProduct}
                        closeMenuOnSelect={false}
                        defaultValue={linkProduct.map((p, index) => {
                          if (p.slug === linkProductSlug)
                            return {
                              value: p.name,
                              label: p.name,
                              obj: p,
                            };
                        })}
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
                  {productsForLinkCat.length > 0 && linkProduct.length === 0 && (
                    <React.Fragment>
                      <label htmlFor="" className="text-muted">
                        Select Products For Link:
                      </label>
                      <Select
                        onChange={handleLinkProduct}
                        closeMenuOnSelect={false}
                        // defaultValue={productsForLinkCat.map((p, index) => {
                        //   if (p.slug === linkProductSlug)
                        //     return {
                        //       value: p.name,
                        //       label: p.name,
                        //       obj: p,
                        //     };
                        // })}
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
              Update Advert
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

export default UpdateAvertisement;
