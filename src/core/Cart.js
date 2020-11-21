import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { getCart } from "./CartHelpers";
import Card from "./Card";
import Stripe from "./Stripe";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = (items) => {
    return (
      <div>
        <h2 style={{textAlign: 'center', color: 'white', background: 'none', border: 'none', fontFamily: "Big Shoulders Inline Display, cursive", marginTop: '10px', fontSize:'40px'}}>Your cart has {`${items.length}`} item(s)</h2>
        <hr />
        {items.map((product, index) => (
          <Card
            key={index}
            product={product}
            showAddToCartButton={false}
            showRemoveProductButton={true}
            setRun={setRun}
            run={run}
          />
        ))}
      </div>
    );
  };

  const noItems = () => (
    <h2 style={{textAlign: 'center', color: 'white', background: 'none', border: 'none', fontFamily: "Big Shoulders Inline Display, cursive", marginTop: '30vh', marginBottom: '45vh', minHeight: '11vh'}}>
      Your cart is empty. <br /> <Link to="/shop" style={{textDecoration: 'underline'}}>Continue Shopping</Link>
    </h2>
  );


  return (
    <Layout
      className="container-fluid"
    >
      {items.length > 0 ? (
        <div className="row" style={{ marginBottom: '10vh' }}>
          <div className="col-md-6 mb-4">
            {showItems(items)}
          </div>
          <div className="col-md-6">
            <h2 style={{ textAlign: 'center', color: 'white', background: 'none', border: 'none', fontFamily: "Big Shoulders Inline Display, cursive", marginTop: '10px', fontSize: '40px' }}>Cart Summary / Checkout</h2>
            <hr />
            <Stripe products={items}/>
          </div>
        </div>
      ) : (noItems())}
      
    </Layout>
  );
};

export default Cart;
