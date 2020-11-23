import React, { useState, useEffect } from "react";
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { API } from "../config";
import { createOrder } from "./apiCore";
import { emptyCart } from "./CartHelpers.js";
import { isAuthenticated } from "../auth";
import jQuery from "jquery";
import {update, updateUser} from "../user/apiUser"

export default function CheckoutForm(items) {
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');
    const [data, setData] = useState({
        streetAddress1: "",
        city: "",
        state: "",
        zipCode: "",
        email: "",
        amount: 0
    });
    const stripe = useStripe();
    const elements = useElements()

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;


    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        window
            .fetch(`${API}/create-payment-intent`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify([items])
            })
            .then(res => {
                return res.json();
            })
            .then(data => {
                setClientSecret(data.clientSecret);
                setData({ ...data, amount: data.amount });
            });
    }, [items]);

    const cardStyle = {
        style: {
            base: {
                color: "#373737",
                fontFamily: 'Courier, monospace',
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#373737"
                },
            },
            invalid: {
                color: "red",
                iconColor: "red"
            }
        }
    };

    const handleChange = async (event) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
        
    };

    const handleAddress = name => (event) => {
        setData({ ...data, [name]: event.target.value });
    };


    const proccessOrder = (items, succeeded, userId, token, payload) => {
        const products = [];
        items.items.products.forEach(product => {
            products.push({ name: product.name, price: product.price, count: product.count, id: product._id });
        })
        const address = data.streetAddress1 + ', ' + data.city + ', ' + data.state + ', ' + data.zipCode
        const createOrderData = {
            products: products,
            transaction_id: payload.paymentIntent.id,
            amount: payload.paymentIntent.amount,
            address: address,
        };
        createOrder(userId, token, createOrderData)
            .then((response) => {
                emptyCart(() => { });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleSubmit = async ev => {
        ev.preventDefault();
        setProcessing(true);
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        });
        if (payload.error) {
            console.log(payload.error);
            setError(`${payload.error.message}`);
            setProcessing(false);
            jQuery('#errorModal').modal('show')
        } else {
            setError(null);
            setProcessing(false);
            setSucceeded(true);
            proccessOrder(items, succeeded, userId, token, payload)
            jQuery('#successModal').modal('show')
        }
    };

    const displaySuccess = () => {
        return (
            <div className="modal" id="successModal"  role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content" style={{background: '#dcf5d5', fontFamily: "Big Shoulders Inline Display, cursive"}}>
                        <div className="modal-header" style={{textAlign: 'center', margin: 'auto'}}>
                            <h5 className="modal-title" style={{ fontSize: '30px'}}>Thank you for your purchase!</h5>
                        </div>
                        <div className="modal-body" style={{ textAlign: 'center'}}>
                            <p style={{ marginTop: '10px', fontFamily: "Big Shoulders Inline Display, cursive", margin: 'auto', fontSize: '20px',}}>
                            Please refer to your 
                                <a href={`/user/dashboard/`}>
                                {" "} Deerhart Designs Dashboard </a> to track the status of your order.
                                <br /><br/>You will also receive email updates - to the email on your profile. Please make sure to check your spam folder for any emails from no-reply@deerhartdesigns.com!
                                <br /><br />Please email support@deerhartdesigns.com if you have any questions!
                                <br /><br/>This page will automatically redirect you to your dashboard in 30 seconds
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
            
    }

    const displayError = () => {
        return (
            <div className="modal" id="errorModal"  role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content" style={{background: '#f5d5d5', fontFamily: "Big Shoulders Inline Display, cursive"}}>
                        <div className="modal-header" style={{textAlign: 'center', margin: 'auto'}}>
                            <h5 className="modal-title" style={{ fontSize: '30px' }}>Ooops! There was an error with your payment.</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body" style={{ textAlign: 'center'}}>
                            <p style={{ marginTop: '10px', fontFamily: "Big Shoulders Inline Display, cursive", margin: 'auto', fontSize: '20px',}}>
                                Our Card Processor Returned the Following Error Information: <br />{error}
                                <br/><br />Your card was not charged, please close this alert and try again!
                                <br />Contact us at kangaroo@deerhartdesigns.com if the problem persists.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )    
    }
    if (succeeded) {
        setTimeout( () => {
            window.location = ('/user/dashboard');
        }, 30000)
    }


    return (
        <>
            {displaySuccess()}
            {displayError()}
        <form id="payment-form" onSubmit={handleSubmit} style={{marginLeft:"auto", marginRight:"auto", color: 'white', backgroundColor:"grey", padding: '5px', borderRadius: '5px'}}>
            <h1 style={{color: '#8cf781', fontFamily: "Big Shoulders Inline Display, cursive",  marginTop: '10px', fontSize: '30px', textAlign: 'center'}}>Cart Total: ${data.amount}.00 </h1>
            <hr />
            <h5 style={{color: 'white', fontFamily: "Courier, monospace", textAlign: 'center', textDecoration: 'underline', marginBottom:'5px'}}>Delivery Address</h5>
                    <div className="form-group" style={{ fontFamily: "Courier, monospace", marginTop:'20px', marginLeft:'5px', marginRight:'5px' }}>
                    <label htmlFor="streetAddress">Street Address</label>
                        <input className="form-control" type="text" id="streetAddress1" placeholder="1234 Main Street Apt. 12" onChange={handleAddress('streetAddress1')} required />
                    </div>
                
                    <div className="form-row" style={{ fontFamily: "Courier, monospace", marginLeft:'2px', marginRight:'1px'}}>
                        <div className="form-group col-md-7">
                            <label htmlFor="city">City</label> 
                            <input className="form-control" type="text" id="city" placeholder="Denver" onChange={handleAddress('city')} required />
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="state">State</label>
                            <input className="form-control" type="text" id="state" placeholder="CO" onChange={handleAddress('state')} required />
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="zip">Zip</label>
                            <input className="form-control"type="text" id="zip" placeholder="80205" onChange={handleAddress('zipCode')} required />
                        </div>
                    </div>    
                <hr />
            <h5 style={{color: 'white', fontFamily: "Courier, monospace",  marginTop: '10px', textDecoration: 'underline', textAlign: 'center'}}>Credit Card Information</h5>
                <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
            <button
                disabled={processing || disabled || succeeded}
                id="submit"
            >
                <span id="button-text">
                    {processing ? (
                        <div className="spinner" id="spinner"></div>
                    ) : (
                        `Pay $${data.amount}.00`
                    )}
                </span>
                </button>
            <p className="text-center"><a href="https://stripe.com" target="_blank"><img src={require('../stripe.svg')} id="stripe" style={{maxWidth: "150px", marginTop: '10px'}}/></a></p>
            <hr />
            <p style={{ color: 'white', fontFamily: "Courier, monospace", marginTop: '5px', fontSize: '16px', textAlign: 'center' }}>Standard shipping costs and taxes are included in the product price.</p> 
            <hr />
            <p style={{ color: 'white', fontFamily: "Courier, monospace", fontSize: '16px', textAlign: 'center' }}>Please allow up to two weeks for processing and delivery.</p>
            </form>
        </>
    )
};