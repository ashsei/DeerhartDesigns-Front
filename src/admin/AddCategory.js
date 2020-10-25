import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { createCategory } from './apiAdmin';

const AddCategory = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    // Destructure user and token from localStorage
    const {user, token} = isAuthenticated();

    const handleChange = (event) => {
        setError('');
        setName(event.target.value);
    }

    const clickSubmit = (event) =>{
        event.preventDefault();
        setError('');
        setSuccess(false);
        // Make request to backend to create category
        createCategory(user._id, token, {name})
        .then(data => {
            if(data.error) {
                setError(true);
            } else {
                setError('');
                setSuccess(true);
            }
        })
    }

    const newCategoryForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" className="form-control" onChange={handleChange} value={name} autoFocus required/>
                <button className="btn btn-outline-primary">Create Category</button>
            </div>
        </form>
    )

    const showSuccess = () => {
        if(success) {
            return <h3 className="text-success">A category with the name: "{name}" was created successfully!</h3>
        }
    }
    const showError = () => {
        if(error) {
            return <h3 className="text-danger">Category was not created successfully, please check that you are adding a unique category name.</h3>
        }
    }
    const goBack = () => (
        <div className="mt-5">
            <Link to="/admin/dashboard" className="text-warning">Back to Dashboard</Link>
        </div>
    )
    return (
        <Layout title="Add a New Category" description={`Hello, ${user.name}! Please use the form below to create a new product category.`} className="container-fluid">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showSuccess()}
                    {showError()}
                    {newCategoryForm()}
                    {goBack()}
                </div>
            </div>
            
        </Layout>
    )
}

export default AddCategory;