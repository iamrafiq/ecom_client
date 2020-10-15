import React from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import { useEffect, useState } from "react";
import Card from "./Card";
import Search from "./Search";
import ProductCard from "../ui/ProductCard";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const CategoryChildren = (props) => {
  const classes = useStyles();


  return (
    <Layout
      title="Category Children page"
      description="Node React"
      className="container-fluid"
    >
      <div className={classes.root}>
        <Grid container spacing={3} justify="center"
  alignItems="center">
        <Grid item>
          <ProductCard></ProductCard>
        </Grid>
       
        </Grid>
      </div>
    </Layout>
  );
};

export default CategoryChildren;
