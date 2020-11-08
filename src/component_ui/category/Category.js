import React from "react";

export default function Category(props) {
    const { category, onClick, resulationSelector } = props;
    return (
      <div
        className="card"
        style={{ width: "14rem" }}
      >
        <img
          src={`${category.thumbnail}&res=${resulationSelector}`}
          className="card-img-top"
          alt={category.name}
        />
        <div className="card-body mx-auto">
          <p className="card-text ">{category.name}</p>
        </div>
      </div>
    );
  }