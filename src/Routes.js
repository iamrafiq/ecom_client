import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import PrivateRoute from "./auth/PrivateRoute";
import UserDashboard from "./user/UserDashboard";
import AdminRoute from "./auth/AdminRoute";
import AdminDashboard from "./user/AdminDashboard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import Shop from "./core/Shop";
import Product from "./core/Product";
import Cart from "./core/Cart";
import Orders from "./admin/Orders";
import Profile from "./user/Profile";
import ManageProducts from "./admin/ManageProducts";
import ManageCategory from "./admin/ManageCategory";

import UpdateProduct from "./admin/UpdateProduct";
import UpdateCategory from "./admin/UpdateCategory";
import CategoryItems from "./component_ui/category_item/CategoryItems";
import CategoryProducts from "./core/CategoryProducts";
import AddAdvertisement from "./admin/advertisement/AddAdvertisement";
import UpdateAdvertisement from "./admin/advertisement/UpdateAdvertisement";
import ManageAdvertisement from "./admin/advertisement/ManageAdvertisement";

const AnyComponent = (props) => {
  return <CategoryItems id={props.match.params.any_slug} />;

  // if (slugIsProject(props.match.params.any_slug)) {
  //     return <CategoryChildren id={props.match.params.any_slug} />;
  // } else {
  //     return <PostComponent id={props.match.params.any_slug} />;
  // }
};
const ProductComponent = (props) => {
  console.log("path", props.path);
  return <UserDashboard id={props.match.params.slug} />;

  // if (slugIsProject(props.match.params.any_slug)) {
  //     return <CategoryChildren id={props.match.params.any_slug} />;
  // } else {
  //     return <PostComponent id={props.match.params.any_slug} />;
  // }
};
const Routes = () =>{
  return (
  // <BrowserRouter>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route exact path="/:slug" component={CategoryItems} />
    <Route exact path="/products/:slug" component={CategoryProducts} />

    {/* <Route
      path="/:slug"
      render={({ match }) => {
        // Do whatever you want with the match...
        if (match==="aa"){
          // <Route path="/category/children" exact component={CategoryChildren} />

        }
        if (match==="bbb"){
          return <div>uuuu</div>
        }
      }}
    /> */}

    <Route path="/shop" exact component={Shop} />
    {/* <Route path="/category/children" exact component={CategoryChildren} />
      <Route path="/category/products" exact component={CategoryProducts} /> */}
    <Route exact path="/user/signin" component={Signin} />
    <Route exact path="/user/signup" component={Signup} />
    <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
    <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
    <AdminRoute path="/create/category" exact component={AddCategory} />
    <AdminRoute path="/create/product" exact component={AddProduct} />
    <AdminRoute
      path="/create/advertisement"
      exact
      component={AddAdvertisement}
    />
    <Route path="/product/:productId" exact component={Product} />
    <Route path="/cart" exact component={Cart} />
    <AdminRoute path="/admin/orders" exact component={Orders} />
    <PrivateRoute path="/profile/:userId" exact component={Profile} />
    <PrivateRoute path="/admin/products" exact component={ManageProducts} />
    <PrivateRoute path="/admin/categories" exact component={ManageCategory} />
    <PrivateRoute
      path="/admin/advertisements"
      exact
      component={ManageAdvertisement}
    />

    <AdminRoute
      path="/admin/product/update/:productId"
      exact
      component={UpdateProduct}
    />
    <AdminRoute
      path="/admin/category/update/:categoryId"
      exact
      component={UpdateCategory}
    />
    <AdminRoute
      path="/admin/advertisement/update/:advertisementId"
      exact
      component={UpdateAdvertisement}
    />
  </Switch>
  // </BrowserRouter>
)};

export default Routes;
