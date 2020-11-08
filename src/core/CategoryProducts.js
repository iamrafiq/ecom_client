import React from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import { useEffect, useState } from "react";
import Card from "./Card";
import Search from "./Search";
const CategoryChildren = (props) => {
  return (
    <Layout
      title="Category Product"
      description="Node React"
      className="container-fluid"
    >
    </Layout>
  );
};

export default CategoryChildren;