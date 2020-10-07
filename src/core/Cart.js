import React from "react";
import Layout from "./Layout";
import { Link } from "react-router-dom";
import { getCart } from "./cartHelper";
import { useEffect, useState } from "react";
import Card from "./Card";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [deleteEffect, setDeleteEffect] = useState(0);

  const init = ()=>{
    setItems(getCart());
  }
  useEffect(() => {
    init()
  }, [deleteEffect]);

  const showItems = (items) => {
    return (
      <div>
        <h2>Your cart has {`${items.length}`}</h2>
        <hr />
        {items.map((product, index) => (
          <Card
            key={index}
            product={product}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveProductButton={true}
            itemDeleteCallBack = {()=>{
                setDeleteEffect(deleteEffect+1);
            }}
          />
        ))}
      </div>
    );
  };

  const noItemsMessage = () => (
    <h2>
      Your cart is empty. <br /> <Link to="/shop">Continue shopping</Link>
    </h2>
  );
  return (
    <Layout
      title="Shoping Cart"
      description="Manage your cart items. Add remove checkout or continue shoping"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-6">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
        <div className="col-6">
          <p>Show check out and shipping </p>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
