import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories, getFilteredProducts } from "./apiCore";
import Checkbox from "./Checkbox";
import RadioBox from "./RadioBox";
import { prices } from "./FixedPrices";
import Search from "./Search"

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);
  

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
    
  };

  const loadFilteredResults = (newFilters) => {
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.data);
        setSize(data.size);
        setSkip(0);
      }
    });
  };

  const loadMore = () => {
    let toSkip = skip + limit;
    getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults([...filteredResults, ...data.data]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

 

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className="btn btn-secondary btn-block mb-5" style={{fontSize: '20px', fontFamily: "Big Shoulders Inline Display, cursive"}}>
          Load More
        </button>
      )
    );
  };

  useEffect(() => {
    init();
    loadFilteredResults(skip, limit, myFilters.filters);
  }, []);

  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;
    if (filterBy === "price") {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    loadFilteredResults(myFilters.filters);
    setMyFilters(newFilters);
  };

  const handlePrice = (value) => {
    const data = prices;
    let array = [];
    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };

  return (
    <Layout className="container-fluid">
      <div className="row mt-3">
        <div className="col-3" id="filter-button">
            <button className="btn btn-secondary btn-block" data-toggle="modal" data-target="#filterModal" style={{ fontFamily: "Big Shoulders Inline Display, cursive", maxWidth: '250px' }}>Filter Products</button>
            <button className="btn btn-success btn-block" style={{ fontFamily: "Big Shoulders Inline Display, cursive", maxWidth:"250px" }} onClick={() => window.location = ('/cart')}>Go To Cart</button>
        </div>
        <div className="col-9 mt-3" id="searchbar">
          <Search/>
        </div>
      </div>
      
      
        <div className="modal"  id="filterModal" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered mx-auto text-left" role="document" style={{maxWidth: '50vw'}}>
            <div className="modal-content" style={{background: 'lightgrey', fontFamily:"Big Shoulders Inline Display, cursive"}}>
              <div className="modal-header">
                <h5 className="modal-title">Filter Products</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button> 
              </div>
              <div className="modal-body">
                <h3 style={{ textAlign: 'left', textDecoration: 'underline'}}>Filter by Category</h3>
                <div className="ml-5">
                  <Checkbox
                    categories={categories}
                    handleFilters={(filters) => handleFilters(filters, "category")}
                  />
                </div>
                <br />
                <h3 style={{ textAlign: 'left', textDecoration: 'underline' }}>Filter by Price</h3>
                <div>
                  <RadioBox
                    prices={prices}
                    handleFilters={(filters) => handleFilters(filters, "price")}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-success" data-dismiss="modal">Apply Filters</button>
              </div>
            </div>
          </div>
      </div>
      <div className="container-fluid">
        <div className="row"> 
          <div className="col-md-12">
            <div className="row mt-3" style={{fontSize: "24px"}}>
              {filteredResults.map((product, i) => (
                <div key={i} className="col-md-6 mb-3 card-group">
                    <Card product={product} onShop={true}/>
                </div>
              ))}
            </div>
            <hr />
            {loadMoreButton()}
          </div>
          </div>
      </div>
      </Layout>
  );
};

export default Shop;
