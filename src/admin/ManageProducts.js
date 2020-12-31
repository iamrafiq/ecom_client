import React, { useEffect, useState } from "react";
import Layout from "../core/Layout";
import { useSelector } from "react-redux";
import { getCategories } from "./apiAdmin";
import Select from "react-select";
import { selectUser, selectToken } from "../redux/authSlice";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "./apiAdmin";
import { getProductsByCategorySlug , getProductsByCatId} from "../core/apiCore";
const ManageProducts = () => {
  const [cagegories, setCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(undefined);

  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  
  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };
  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };
  const loadProductsOfCat = (id) => {
    console.log("manage prod slug,", id)
    getProductsByCatId(id).then((data) => {
      if (data === undefined && data.error) {
        console.log(data.error);
      } else {
        console.log("manage prod products,", data)

        setProducts(data);
      }
    });
  };

  const destroy = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadProducts();
      }
    });
  };

  const handleChange = (field) => (event) => {
    let value = event.target.value;
    loadProductsOfCat(value);
  };
  useEffect(() => {
    loadCategories();
  }, []);
  return (
    <Layout
      title="Manage Products"
      description="Perform CRUD on products"
      className="container-fluid"
    >
      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Select a Category
        </label>
        <select onChange={handleChange("parent")} className="form-control">
          <option>Select a category</option>
          {cagegories &&
            cagegories.map((cat, index) => (
              <option key={index} value={cat._id}>
                {cat.name}
              </option>
            ))}
        </select>
      </div>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center">Total {products.length} products</h2>
          <hr />
          <ul className="list-group">
            {products.map((p, i) => (
              <li
                key={i}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <strong>{`${p.name} - ${p.subText}`}</strong>
                <Link to={`/admin/product/update/${p._id}`}>
                  <span className="badge badge-warning badge-pill">Update</span>
                </Link>
                <span
                  onClick={() => destroy(p._id)}
                  className="badge badge-danger badge-pill"
                >
                  DELETE
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default ManageProducts;
