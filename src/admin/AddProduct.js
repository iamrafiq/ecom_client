import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createProduct, getCategories } from "./apiAdmin";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { getProductsByCategoryId } from "../core/apiCore";

var slugify = require("slugify");

const AddProduct = () => {
  const options = [
    { value: 0, label: "No", field: "" },
    { value: 1, label: "Yes", field: "" },
  ];
  const [icon, setIcon] = useState(null);

  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    productCode: "4342",
    name: "czcz",
    slug: "zxczxc",
    bengaliName: "zczxc",
    nameWithOutSubText: "zxczx",
    subText: "zxczxc",
    mrp: "34",
    price: "34",
    cropPrice: "34",
    applyDiscounts: "",
    blockSale: "",
    shortDesc: "",
    longDesc: "",
    isAlwaysAvailable: "",
    commonStock: "4324",
    preferredStock: "34234",
    earliestAvailabilityTime: "",
    availabilityCutOffTime: "",
    blockAtWarehouse: "",
    isPerishable: "",
    thirdPartyItem: "",
    photosUrl: "",
    offerPhotosUrl: "",
    categories: [],
    categoryProducts: [],
    relatedProducts: [],
    selectedCategories: "",
    recursiveCategories: "",
    manufacturers: "",
    shipping: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    enableCustomSlug: false,
    formData: "",
  });

  const {
    productCode,
    name,
    slug,
    bengaliName,
    nameWithOutSubText,
    subText,
    mrp,
    price,
    cropPrice,
    applyDiscounts,
    blockSale,
    shortDesc,
    longDesc,
    isAlwaysAvailable,
    commonStock,
    preferredStock,
    earliestAvailabilityTime,
    availabilityCutOffTime,
    blockAtWarehouse,
    isPerishable,
    thirdPartyItem,
    photosUrl,
    offerPhotosUrl,
    categories,
    categoryProducts,
    relatedProducts,
    selectedCategories,
    recursiveCategories,
    manufacturers,
    shipping,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    enableCustomSlug,
    formData,
  } = values;

  // load categories and set form data
  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        console.log("cats...", data);

        const rootless = data.filter((e) => e.name !== "root");
        setValues({
          ...values,
          categories: rootless,
          formData: new FormData(),
        });
      }
    });
  };
  useEffect(() => {
    console.log("use effect");
    init();
  }, [createdProduct]);
  const handleChange = (field) => (event) => {
    let value = event.target.value;
    formData.set(field, value);
    if (field === "name") {
      const slugStr = slugify(value, {
        replacement: "-", // replace spaces with replacement character, defaults to `-`
        remove: undefined, // remove characters that match regex, defaults to `undefined`
        lower: false, // convert to lower case, defaults to `false`
        strict: false, // strip special characters except replacement, defaults to `false`
        locale: "vi", // language code of the locale to use
      });
      setValues({
        ...values,
        slug: slugStr,
      });

      formData.set("slug", slugStr);
    }

    setValues({ ...values, [field]: value });
  };
  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    console.log("from data:", selectedCategories);
    console.log("from data:", recursiveCategories);

    formData.set("cats", selectedCategories);
    formData.set("rc", recursiveCategories);
    formData.set(
      "earliestAvailabilityTime",
      earliestAvailabilityTime.toString()
    );
    formData.set("availabilityCutOffTime", availabilityCutOffTime.toString());
    if (relatedProducts.length > 0) {
      formData.set("relatedProducts", relatedProducts);
    }

    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          productCode: "",
          name: "",
          slug: "",
          bengaliName: "",
          nameWithOutSubText: "",
          subText: "",
          mrp: "",
          price: "",
          cropPrice: "",
          applyDiscounts: "",
          blockSale: "",
          shortDesc: "",
          longDesc: "",
          isAlwaysAvailable: "",
          commonStock: "",
          preferredStock: "",
          earliestAvailabilityTime: "",
          availabilityCutOffTime: "",
          blockAtWarehouse: "",
          isPerishable: "",
          thirdPartyItem: "",
          photosUrl: "",
          offerPhotosUrl: "",
          categoryProducts: [],
          relatedProducts: [],
          selectedCategories: "",
          recursiveCategories: "",
          manufacturers: "",
          shipping: "",
          loading: false,
          enableCustomSlug: false,
          createdProduct: data.name,
          todaysDate: new Date(),
        });
      }
    });
  };
  const handleSlugChange = (value) => () => {
    setValues({ ...values, enableCustomSlug: !value });
  };

  const handleDateChange = (field, date) => {
    console.log("earliestAvailabilityTime.....");

    if (field === "earliestAvailabilityTime") {
      console.log("earliestAvailabilityTime");
      setValues({ ...values, earliestAvailabilityTime: date });
    } else if (field === "availabilityCutOffTime") {
      setValues({ ...values, availabilityCutOffTime: date });
    }
  };
  const handleOptionChange = (option) => {
    formData.set(option.field, option.value);
    setValues({ ...values, [option.field]: option.value, formData: formData });
  };
  const handleChangeCategoris = (selectedOption) => {
    console.log(`Option selected:`, selectedOption);

    if (selectedOption != null) {
      const catsId = selectedOption.map((cat, index) => {
        return cat.obj._id;
      });

      // console.log(`cates Id:`, catsId.toString());

      let catsRecursive = selectedOption.map((cat, index) => {
        return cat.obj.recursiveCategories.map((rc, index) => {
          return rc;
        });
      });

      catsRecursive = catsRecursive.filter(function (el) {
        return el.length > 0;
      });

      if (catsRecursive.length > 0) {
        catsRecursive = catsRecursive.toString().split(",");
        const uniqueIds = catsRecursive
          .filter(function (item, pos) {
            return catsRecursive.indexOf(item) == pos;
          })
          .toString();
        console.log("rccc", uniqueIds);

        setValues({
          ...values,
          selectedCategories: catsId.toString(),
          recursiveCategories: uniqueIds.toString(),
        });
      } else {
        setValues({
          ...values,
          selectedCategories: catsId.toString(),
        });
      }
    } else {
      setValues({ ...values, selectedCategories: "", recursiveCategories: "" });
    }
  };
  const loadProducts = (selectedOption) => {
    getProductsByCategoryId(selectedOption.obj._id).then((data) => {
      if (data === undefined && data.error) {
      } else {
        setValues({ ...values, categoryProducts: data.products });
      }
    });
  };
  const onProductSelect = (selectedOptions) => {
    if (selectedOptions) {
      const relatedProducts = selectedOptions.map((option, index) => {
        console.log(option);
        return option.obj._id;
      });
      setValues({ ...values, relatedProducts: relatedProducts });
    } else {
      setValues({ ...values, relatedProducts: "" });
    }
  };
  const newPostFrom = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Product Code
        </label>
        <input
          onChange={handleChange("productCode")}
          type="text"
          className="form-control"
          required="true"
          value={productCode}
        />
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
          required="true"
        />
      </div>
      <input
        onChange={handleSlugChange(enableCustomSlug)}
        type="checkbox"
        className="form-check-input"
      />
      <label className="form-check-label">Custom slug</label>
      <div className="form-group">
        <input
          onChange={handleChange("slug")}
          type="text"
          className="form-control"
          value={slug}
          disabled={enableCustomSlug ? false : true}
        />
      </div>
      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Bengali Name
        </label>
        <input
          onChange={handleChange("bengaliName")}
          type="text"
          className="form-control"
          required="true"
          value={bengaliName}
        />
      </div>
      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Name with out sub text
        </label>
        <input
          onChange={handleChange("nameWithOutSubText")}
          type="text"
          className="form-control"
          value={nameWithOutSubText}
        />
      </div>
      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Sub Text
        </label>
        <input
          onChange={handleChange("subText")}
          type="text"
          className="form-control"
          value={subText}
        />
      </div>
      <div className="form-group">
        <label htmlFor="" className="text-muted">
          MRP
        </label>
        <input
          onChange={handleChange("mrp")}
          type="number"
          className="form-control"
          value={mrp}
          required="true"
        />
      </div>
      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Body Price
        </label>
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          value={price}
          required="true"
        />
      </div>
      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Crop Price
        </label>
        <input
          onChange={handleChange("cropPrice")}
          type="number"
          className="form-control"
          value={cropPrice}
          required="true"
        />
      </div>
      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Common Stock
        </label>
        <input
          onChange={handleChange("commonStock")}
          type="number"
          className="form-control"
          value={commonStock}
          required="true"
        />
      </div>
      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Preferred Stock
        </label>
        <input
          onChange={handleChange("preferredStock")}
          type="number"
          className="form-control"
          value={preferredStock}
        />
      </div>

      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Apply Discounts
        </label>
        <Select
          onChange={handleOptionChange}
          options={[
            { value: 0, label: "No", field: "" },
            { value: 1, label: "Yes", field: "" },
          ].map((op, index) => {
            op.field = "applyDiscounts";
            return op;
          })}
        />
      </div>

      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Block Sale
        </label>
        <Select
          onChange={handleOptionChange}
          options={[
            { value: 0, label: "No", field: "" },
            { value: 1, label: "Yes", field: "" },
          ].map((op, index) => {
            op.field = "blockSale";
            return op;
          })}
        />
      </div>

      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Availablity
        </label>
        <Select
          onChange={handleOptionChange}
          options={[
            { value: 0, label: "No", field: "" },
            { value: 1, label: "Yes", field: "" },
          ].map((op, index) => {
            op.field = "isAlwaysAvailable";
            return op;
          })}
        />
      </div>

      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Block At Warehouse
        </label>
        <Select
          onChange={handleOptionChange}
          options={[
            { value: 0, label: "No", field: "" },
            { value: 1, label: "Yes", field: "" },
          ].map((op, index) => {
            op.field = "blockAtWarehouse";
            return op;
          })}
        />
      </div>

      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Is Perishable
        </label>
        <Select
          onChange={handleOptionChange}
          options={[
            { value: 0, label: "No", field: "" },
            { value: 1, label: "Yes", field: "" },
          ].map((op, index) => {
            op.field = "isPerishable";
            return op;
          })}
        />
      </div>

      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Third Party Item
        </label>
        <Select
          onChange={handleOptionChange}
          options={[
            { value: 0, label: "No", field: "" },
            { value: 1, label: "Yes", field: "" },
          ].map((op, index) => {
            op.field = "thirdPartyItem";
            return op;
          })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Earliest Availability Time
        </label>
        <DatePicker
          selected={earliestAvailabilityTime}
          dateFormat="dd MM y"
          onChange={(date) =>
            handleDateChange("earliestAvailabilityTime", date)
          }
        />
      </div>
      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Availability Cut Off Time
        </label>
        <DatePicker
          selected={availabilityCutOffTime}
          dateFormat="dd MM y"
          onChange={(date) => handleDateChange("availabilityCutOffTime", date)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Short Description
        </label>
        <textarea
          onChange={handleChange("shortDesc")}
          className="form-control"
          value={shortDesc}
        />
      </div>
      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Long Description
        </label>
        <textarea
          onChange={handleChange("longDesc")}
          className="form-control"
          value={longDesc}
        />
      </div>

      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Photos Url
        </label>
        <input
          onChange={handleChange("photosUrl")}
          type="text"
          className="form-control"
          value={photosUrl}
        />
      </div>
      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Offer Photos Url
        </label>
        <input
          onChange={handleChange("offerPhotosUrl")}
          type="text"
          className="form-control"
          value={offerPhotosUrl}
        />
      </div>
      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Categories
        </label>
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
      </div>
      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Related Products (Select category)
        </label>
        <Select
          options={categories.map((cat, index) => {
            return {
              value: cat.name,
              label: cat.name,
              obj: cat,
            };
          })}
          onChange={loadProducts}
        />
      </div>
      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Related Products (Select products)
        </label>
        <Select
          options={categoryProducts.map((prod, index) => {
            return {
              value: prod.name,
              label: prod.name,
              obj: prod,
            };
          })}
          isMulti
          onChange={onProductSelect}
        />
      </div>

      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Shipping
        </label>
        <Select
          onChange={handleOptionChange}
          options={[
            { value: 0, label: "No", field: "" },
            { value: 1, label: "Yes", field: "" },
          ].map((op, index) => {
            op.field = "shipping";
            return op;
          })}
        />
      </div>

      <button className="btn btn-outline-primary">Create a new product</button>
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

export default AddProduct;
