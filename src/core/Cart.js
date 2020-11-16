import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { getCart, removeItem } from "./CartHelpers";
import Card from "./Card";
import Checkout from "./Checkout";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = (items) => {
    return (
      <div>
        <h2 style={{textAlign: 'center', color: 'white', background: 'none', border: 'none', fontFamily: "Big Shoulders Inline Display, cursive", marginTop: '10px'}}>Your cart has {`${items.length}`} item(s)</h2>
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
    <h2 style={{textAlign: 'center', color: 'white', background: 'none', border: 'none', fontFamily: "Big Shoulders Inline Display, cursive", marginTop: '30vh', marginBottom: '45vh'}}>
      Your cart is empty. <br /> <Link to="/shop" style={{textDecoration: 'underline'}}>Continue Shopping</Link>
    </h2>
  );

  return (
    <Layout
      className="container-fluid"
    >
      {items.length > 0 ? (
        <div className="row" style={{ marginBottom: '25vh' }}>
          <div className="col-6">
            {showItems(items)}
          </div>
          <div className="col-6">
            <h2 className="mb-4 mt-10" style={{textAlign: 'center', color: 'white', background: 'none', border: 'none', fontFamily: "Big Shoulders Inline Display, cursive",  marginTop: '10px'}}>Your Cart Summary</h2>
            <Checkout products={items} setRun={setRun} run={run} />
          </div>
        </div>
      ) : (noItems())}
      
    </Layout>
  );
};

export default Cart;
