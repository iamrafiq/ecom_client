import React from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import { useEffect, useState } from "react";
import Card from "./Card";
import Search from "./Search";
// import ProductCard from "../ui/ProductCard";
import ProductCard from "../component_ui/product_card/ProductCard";
import "../common/common.css";


const CategoryChildren = (props) => {

  return (
    <Layout
      title="Category Children page"
      description="Node React"
    >
      <div class="grid">
        <ProductCard></ProductCard>       
         <ProductCard></ProductCard>
        <ProductCard></ProductCard>

        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>

        <ProductCard></ProductCard>       
         <ProductCard></ProductCard>
        <ProductCard></ProductCard>

        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>

        <ProductCard></ProductCard>       
         <ProductCard></ProductCard>
        <ProductCard></ProductCard>

        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>

        <ProductCard></ProductCard>       
         <ProductCard></ProductCard>
        <ProductCard></ProductCard>

        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>

        <ProductCard></ProductCard>       
         <ProductCard></ProductCard>
        <ProductCard></ProductCard>

        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>

        <ProductCard></ProductCard>       
         <ProductCard></ProductCard>
        <ProductCard></ProductCard>

        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>

        <ProductCard></ProductCard>       
         <ProductCard></ProductCard>
        <ProductCard></ProductCard>

        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>

        <ProductCard></ProductCard>       
         <ProductCard></ProductCard>
        <ProductCard></ProductCard>

        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>

        <ProductCard></ProductCard>       
         <ProductCard></ProductCard>
        <ProductCard></ProductCard>

        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>

        <ProductCard></ProductCard>       
         <ProductCard></ProductCard>
        <ProductCard></ProductCard>

        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
      </div>
     </Layout>
  );
};

export default CategoryChildren;
