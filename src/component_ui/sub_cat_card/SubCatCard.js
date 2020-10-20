import React from "react";
import  "./SubCatCard.css";

export default function ProductCard(props) {
  return (
    <div class="card">
      <span class="image">
        <img src="http://alupiaj.com/images/mp2.png" />
      </span>

      <div class="content">
        <span>Philips 100W engergy saving light bulb</span>
      </div>
    </div>
  );
}
