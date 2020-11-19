import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { getProducts, deleteProduct } from "./apiAdmin";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  const destroy = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadProducts();
      }
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Layout
      className="container-fluid"
    >
      <h1 className="mb-4" style={{color: 'white', textAlign: 'center', fontFamily: "Big Shoulders Inline Display, cursive", textDecoration: 'underline' }}>Manage Products In Store</h1>
      <div className="row" style={{display: 'block', overflow: 'auto'}}>
        <div className="col-12" style={{marginBottom: "30px"}}>
          <h2 className="text-center" style={{ fontFamily: "Big Shoulders Inline Display, cursive", color: 'white'}}>Total Products: {products.length}</h2>
          <hr />
          <ul className="list-group" style={{ fontFamily: "Big Shoulders Inline Display, cursive" }}>
            {products.map((p, i) => (
              <li
                key={i}
                className="list-group-item"
              >
                <h4 style={{ textAlign: "center"}}>{p.name}</h4>
                <Link to={`/admin/product/update/${p._id}`}>
                  <button className="btn btn-secondary btn-block">
                    Update
                  </button>
                </Link>
                <button
                  onClick={() => {
                    destroy(p._id);
                  }}
                  className="btn btn-danger btn-block mt-1"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default ManageProducts;
