import React from "react";
import "./SubCatCard.css";
import {API  } from "../../config";
export function ProductCard(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
          <div className="card">
            <img
              className="card-img"
              src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/vans.png"
              alt="Vans"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SubCatCard(props) {
  const {cat, onClick} = props;
  return (
    <div className="card" style={{width: "14rem"}} onClick = {()=>{onClick(cat.slug)}}>
      <img src={`${API}/category/thumbnail/${cat._id}`} className="card-img-top" alt={cat.name} />
      <div className="card-body mx-auto">
        <p className="card-text ">{cat.name}</p>
      </div>
    </div>
  );
}
