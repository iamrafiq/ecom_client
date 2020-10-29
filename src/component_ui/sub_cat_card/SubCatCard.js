import React from "react";
import "./SubCatCard.css";
import { API } from "../../config";
export function ProductCard(props) {
  return (
    <div class="card m-0 mb-2 p-2" style={{ width: "200px" }}>
      <img
        class="card-img"
        src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/vans.png"
        alt="Vans"
      />
      <div class="card-img-overlay d-flex justify-content-end">
        <a href="#" class="card-link text-danger like">
          <i class="fas fa-heart"></i>
        </a>
      </div>
      <div class="card-body p-0 m-0">
        <h4 class="card-title">Vans Sk8-Hi MTE Shoes</h4>
        <h6 class="card-subtitle mb-2 text-muted">Style: VA33TXRJ5</h6>
        <p class="card-text">The Vans All-Weather </p>

        <div class="d-flex justify-content-between">
          <div class="col px-0 mr-1">
            <div class="input-group input-group-sm">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">
                  Qty
                </span>
              </div>
              <input name="" class="form-control form-     control-sm"></input>
            </div>
          </div>
          <div class="col px-0 ml-1">
          <div class="input-group input-group-sm">
          <div class="input-group-prepend">
            <button class="btn btn-outline-primary btn-block">
              Add To Cart
              <i class="fa fa-shopping-basket" aria-hidden="true"></i>
            </button>
            </div>
            </div>

          </div>
          {/* <div class="ml-2">
            <a
              href="#"
              class="btn btn-outline-success"
              data-toggle="tooltip"
              data-placement="left"
              title="Add to Wishlist"
            >
              <i class="fa fa-heart" aria-hidden="true"></i>
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export function SubCatCard(props) {
  const { cat, onClick } = props;
  return (
    <div
      className="card"
      style={{ width: "14rem" }} /*onClick = {()=>{onClick(cat.slug)}}*/
    >
      <img
        src={`${API}/category/thumbnail/${cat._id}`}
        className="card-img-top"
        alt={cat.name}
      />
      <div className="card-body mx-auto">
        <p className="card-text ">{cat.name}</p>
      </div>
    </div>
  );
}
