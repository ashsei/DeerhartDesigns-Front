import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { listOrders } from './apiAdmin';
import moment from 'moment';


const Orders = () => {
    const [orders, setOrders] = useState([])

    const {user, token} = isAuthenticated()
    
    const loadOrders = () => {
        listOrders(user._id, token).then(data => {
            if(data.error){
                console.log(data.error)
            } else {
                setOrders(data)
            }
        })
    }

    useEffect(() => {
        loadOrders();
    }, [])

    const showOrdersLength = () => {
        if(orders.length > 0){
            return (
                <h1 className="text-danger display-2">Total Orders: {orders.length}</h1>
            )
        } else {
            return <h4>No Orders Yet!</h4>;
        }
    }

    const showInput = (key, value) => (
        <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
                <div className="input-group-text">{key}</div>
            </div>
            <input type="text" className="form-control" value={value} readOnly />
        </div>
    )
    return (
        <Layout title="Orders" description={`Hello, ${user.name}! Please use this page to manage your orders!`} className="container-fluid">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showOrdersLength()}
                    {orders.map((o, oIndex) => {
                        return (
                            <div className="mt-5" key={oIndex} style={{borderBottom: '5px solid indigo'}}>
                                <h2 className="mb-5"><span className="bg-primary">Order ID: {o._id}</span></h2>
                            
                                <ul className="list-group">
                                    <li className="list-group-item">Order Status: {o.status}</li>                            
                                    <li className="list-group-item">Transaction ID: {o.transaction_id}</li>
                                    <li className="list-group-item">Amount: ${o.amount}</li>
                                    <li className="list-group-item">Ordered By: {o.user.name}</li>
                                    <li className="list-group-item">Ordered On: {moment(o.createdAt).fromNow()}</li>
                                    <li className="list-group-item">Delivery Address: {o.address}</li>
                                </ul>

                                <h3 className="mt-4 mb-4 font italic">
                                    Total Produtcs in the Order: {o.products.length}
                                </h3>
                                {o.products.map((p, i) => (
                                    <div className="mb-4" key={i} style={{ padding: '20px', border: '1px solid indigo'}}>
                                        {showInput('Product Name', p.name)}
                                        {showInput('Product Price', p.price)}
                                        {showInput('Product Count', p.count)}
                                        {showInput('Product ID', p._id)}
                                    </div>
                                ))}
                            </div>
                        )
                    })}
                </div>
            </div>
            
        </Layout>
    )
}

export default Orders;