import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { read, listRelated } from "./apiCore";
import Card from "./Card";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
      }
      listRelated(data._id).then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setRelatedProduct(data);
        }
      });
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  return (
    <Layout
      className="container-fluid"
    >
      <div className="row">
        <div className="col-12">
          {product && product.description && (
            <>
              <h1 className="text-center mb-3" style={{color: "white", fontFamily: "Big Shoulders Inline Display, cursive"}}>{product.name}</h1>
              <Card product={product} showViewProductButton={false} showTitle={false} showBackToShop={true} showDescription={true}/>
            </>
          )}
          <hr />
        </div>
        {/* <div className="col-4">
          <h1 className="mb-3" style={{textAlign: 'center', color: 'white', fontFamily: "Big Shoulders Inline Display, cursive"}}>Related Products</h1>
          {relatedProduct.map((p, i) => (
            <div className="mb-3">
              <Card key={i} product={p} />
            </div>
          ))}
        </div> */}
      </div>
    </Layout>
  );
};

export default Product;
