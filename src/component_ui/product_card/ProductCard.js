import React from "react";
import  "./ProductCard.css";

export default function ProductCard(props) {
  return (
    <div class="card">
      <div class="header">
        <span class="title-discount">GET 1% OFF</span>
        <span class="title-discount">I</span>
      </div>
      <span class="image">
        <img src="http://alupiaj.com/images/mp2.png" />
      </span>

      <div class="content">
        <span class="title-discount">I</span>
        <span class="company-name">Philips</span>
        <span>Philips 100W engergy saving light bulb</span>
        <span class="rattings">
          <span>4.5 *</span>345 Rattings<span></span>
        </span>
        <span class="mrp">
          <span>&#2547;</span>
          <span class="original-price">
            <del> 560</del>
          </span>
          <span class="discounted-price"> 403</span>
        </span>
      </div>
      <div class="form">
        <input class="input-qty" type="number" placeholder="Qty" name="qty" />
        <button class="button-add" type="button">
          Add To Cart
        </button>
      </div>
    </div>
  );
}
