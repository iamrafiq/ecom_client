import React from "react";
import  "./ProductCard.css";

export default function ProductCard(props) {
  return (
    <div className="card">
      <div className="header">
        <span className="title-discount">GET 1% OFF</span>
        <span className="title-discount">I</span>
      </div>
      <span className="image">
        <img src="http://alupiaj.com/images/mp2.png" />
      </span>

      <div className="content">
        <span className="title-discount">I</span>
        <span className="company-name">Philips</span>
        <span>Philips 100W engergy saving light bulb</span>
        <span className="rattings">
          <span>4.5 *</span>345 Rattings<span></span>
        </span>
        <span className="mrp">
          <span>&#2547;</span>
          <span className="original-price">
            <del> 560</del>
          </span>
          <span className="discounted-price"> 403</span>
        </span>
      </div>
      <div className="form">
        <input className="input-qty" type="number" placeholder="Qty" name="qty" />
        <button className="button-add" type="button">
          Add To Cart
        </button>
      </div>
    </div>
  );
}
