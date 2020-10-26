import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { createProduct, getCategories } from './apiAdmin';

const AddProduct = () => {

    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        height: '',
        length: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    })
    const { user, token } = isAuthenticated();
    const {name, description, price, categories, category, height, length, quantity, loading, error, createdProduct, redirectToProfile, formData} = values

    // Loads categories and sets form data

    const init = () => {
        getCategories().then(data => {
            if(data.error) {
                setValues({...values, error: data.error})
            } else {
                setValues({...values, categories: data, formData: new FormData()})
            }
        })
    }

    useEffect(() => {
        init()
    }, [])

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({...values, [name]: value});
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: '', loading: true});
        createProduct(user._id, token, formData)
        .then(data => {
            if(data.error) {
                setValues({...values, error: data.error})
            } else {
                setValues({...values, name: '', description: '', photo: '', price: '', quantity: '', height: '', length: '', loading: false, createdProduct: data.name,});
            }
        })
    }

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <h4>Product Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary"><input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" /></label>
            </div>
            <div className="form-group">
                <label className="text-muted">Name</label> 
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} required/>  
            </div>
            <div className="form-group">
                <label className="text-muted">Description</label> 
                <textarea onChange={handleChange('description')} className="form-control" value={description} required/>  
            </div>
            <div className="form-group">
                <label className="text-muted">Price</label> 
                <input onChange={handleChange('price')} type="number" className="form-control" value={price} required />  
            </div>
            <div className="form-group">
                <label className="text-muted">Category</label> 
                <select onChange={handleChange('category')} className="form-control" value={category} required> 
                    <option>Select a Category</option>
                    {categories && categories.map((c, i) => (
                        <option key={i} value={c._id}>{
                            c.name}
                        </option>))}
                </select> 
            </div>
            <div className="form-group">
                <label className="text-muted">Height</label> 
                <input onChange={handleChange('height')} type="number" className="form-control" value={height} required/>  
            </div>
            <div className="form-group">
                <label className="text-muted">Length</label> 
                <input onChange={handleChange('length')} type="number" className="form-control" value={length} required/>  
            </div>
            <div className="form-group">
                <label className="text-muted">Quantity</label> 
                <input onChange={handleChange('quantity')} type="number" className="form-control" value={quantity} required />  
            </div>
            <button className="btn btn-outline-primary">Create Product</button>

        </form>
    )
    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );
    return (
        <Layout title="Add a New Product" description={`Hello, ${user.name}! Please use the form below to create a new product.`} className="container-fluid">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {newPostForm()}
                    {showError()}
                </div>
            </div>
            
        </Layout>
    )
}

export default AddProduct