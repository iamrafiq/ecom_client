import React from "react";
import "./Card.css";
import { API } from "../../config";
var FontAwesome = require("react-fontawesome");

export function ProductCard(props) {
  return (
    <div className="product-card">
      <div className="content-image">
        <div className="product-card__image ">
          <img
            src="https://media.cntraveller.in/wp-content/uploads/2020/06/2C16FW9-1366x768.jpg"
            alt="Potato"
          ></img>
        </div>
        <div className="product-card__content">
          <div className="title">
            <p>Big potaasdf adfs dfs </p>{" "}
          </div>
          <div className="sub-text">
            <span>5 KG</span>{" "}
          </div>
          <div className="price">
            <span className="mrp product-card__price-text-color-red">
              &#2547; 100
            </span>
            <span className="discounted-mrp">
              <del>&#2547; 95</del>
            </span>
          </div>
        </div>
      </div>
      <div className="content-overly">
        {/* <div className="add-text">
          <div className="text">Add to shopping bag</div>
        </div> */}
        <div className="add-to-cart">
          <div className="amount">&#2547; 95</div>
          <div className="actions-text">
            <div className="actions">
              <span className="action-sub">-</span>
              <span className="action-result"> 2 </span>
              <span className="action-add">+</span>
            </div>
            <div className="text">in bag</div>
          </div>
        </div>
      </div>
      <div className="icon-overly">
        <FontAwesome className="details-icon" name="info-circle" />
      </div>

      {/* <div class="btn btn-full">
        <div className="btn-add-to-cart">
          <span>Add to cart</span>
        </div>
      </div> */}

      <div className="btn-bag">
        <div className="btn-bag__m">-</div>
        <span className="btn-bag__text">5 in bag</span>
        <div className="btn-bag__p">+</div>
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
