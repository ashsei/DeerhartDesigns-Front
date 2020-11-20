import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";
import { addItem, updateItem, removeItem } from "./CartHelpers";

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  showTitle = true,
  showBackToShop = false,
  showDescription = false,
  setRun = (f) => f,
  run = undefined,
  onShop = false
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`}>
          <button className="btn btn-secondary mt-2 mb-2" style={{fontSize: "20px"}}>
            View Product
          </button>
        </Link>
      )
    );
  };
  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = (showAddToCartButton) => {
    return (
      (showAddToCartButton && product.quantity > 0) ? (
        <button
          onClick={addToCart}
          className="btn btn-success mt-2 mb-2 ml-2"
        >
          Add to Cart
        </button>
      
        
      ) : (null)
    );
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-success badge-pill">In Stock</span>
    ) : (
      <span className="badge badge-danger badge-pill">Out of Stock</span>
    );
  };

  const handleChange = (productId) => (event) => {
    setRun(!run);
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run);
          }}
          className="btn btn-danger mt-2 mb-2"
          style={{}}
        >
          Remove from Cart
        </button>
      )
    );
  };

  const showBackToShopButton = (showBackToShop) => {
    return (
      showBackToShop && (
        <Link to={`/shop`} className="ml-2">
          <button className="btn btn-secondary mt-2 mb-2 mr-2" style={{fontSize: "20px"}}>
            Back to Shop
          </button>
        </Link>
      )
    );
  };

  const showDescriptionInfo = (showDescription) => {
    return (
      showDescription && (
        <li className="list-group-item" style={{background: 'none'}}>
            {product.description}
        </li>
      )
    );
  };

  const showCartUpdate = (cartUpdate) => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3 mt-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input
              type="number"
              className="form-control"
              value={count}
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
      )
    );
  };

  const onShopCard = () => {
    if (onShop) {
      return (
        <div className="card shadow-sm" style={{ minHeight: '75vh', textAlign: 'center', color: 'black', background: '#d6d6d6', border: 'none', fontFamily: "Big Shoulders Inline Display, cursive", fontSize: '24px' }}
        onClick={() => window.location.href = `/product/${product._id}`}>
        <ShowImage item={product} url="product"/>
        <div className="card-body" style={{background: 'none'}}>
          {showTitle ? (<div className="card-title" style={{ fontSize: '40px', textDecoration: 'underline' }}>{product.name}</div>) : null}
          <ul className="list-group list-group-flush">
            <li className="list-group-item" style={{background: 'none'}}>Price: $ {product.price}.00</li>
            <li className="list-group-item" style={{background: 'none'}}>
              Dimensions: {product.height}" x {product.length}"
            </li>
            <li className="list-group-item" style={{background: 'none'}}>
              Added: {moment(product.createdAt).fromNow()}
            </li>
            {showDescriptionInfo(showDescription)}
            <li className="list-group-item" style={{background: 'none'}}>
              {showStock(product.quantity)}
            </li>
          <li className="list-group-item" style={{background: 'none'}}>
              {showViewButton(showViewProductButton)}
              {showBackToShopButton(showBackToShop)} 
              {showAddToCart(showAddToCartButton)}
          </li>  
            </ul>
          {showRemoveButton(showRemoveProductButton)}
          {showCartUpdate(cartUpdate)}
          {shouldRedirect(redirect)}
        </div>
      </div>
      )
    } else {
      return (
        <div className="card shadow-sm" style={{ minHeight: '75vh', textAlign: 'center', color: 'black', background: '#d6d6d6', border: 'none', fontFamily: "Big Shoulders Inline Display, cursive", fontSize: '24px' }}>
          <ShowImage item={product} url="product"/>
          <div className="card-body" style={{background: 'none'}}>
            {showTitle ? (<div className="card-title" style={{ fontSize: '40px', textDecoration: 'underline' }}>{product.name}</div>) : null}
            <ul className="list-group list-group-flush">
              <li className="list-group-item" style={{background: 'none'}}>Price: $ {product.price}.00</li>
              <li className="list-group-item" style={{background: 'none'}}>
                Dimensions: {product.height}" x {product.length}"
              </li>
              <li className="list-group-item" style={{background: 'none'}}>
                Added: {moment(product.createdAt).fromNow()}
              </li>
              {showDescriptionInfo(showDescription)}
              <li className="list-group-item" style={{background: 'none'}}>
                {showStock(product.quantity)}
              </li>
            <li className="list-group-item" style={{background: 'none'}}>
                {showViewButton(showViewProductButton)}
                {showBackToShopButton(showBackToShop)} 
                {showAddToCart(showAddToCartButton)}
            </li>  
              </ul>
            {showRemoveButton(showRemoveProductButton)}
            {showCartUpdate(cartUpdate)}
            {shouldRedirect(redirect)}
          </div>
        </div>
      )
    }
  }

  return (
    onShopCard()
  );
};

export default Card;
