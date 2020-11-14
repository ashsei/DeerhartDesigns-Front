import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';

const ManageProducts = () => {
    return ( 
        <Layout title="Product Management" description="Deerhart Designs" className="container-fluid">
            <h2 className="mb-4">Manage Products In Store</h2>
            <div className="row">
                <div>...</div>
            </div>
        </Layout>
    )
}

export default ManageProducts