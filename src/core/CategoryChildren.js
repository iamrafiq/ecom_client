import React from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import { useEffect, useState } from "react";
import Card from "./Card";
import Search from "./Search";
import ProductCard from "../ui/ProductCard";

const CategoryChildren = (props) => {

  return (
    <Layout
      title="Category Children page"
      description="Node React"
      className="container-fluid"
    >
            <ProductCard></ProductCard>

    </Layout>
  );
};

export default CategoryChildren;
