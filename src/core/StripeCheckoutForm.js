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

export default function CheckoutForm(items) {
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');
    const [data, setData] = useState({
        address: "",
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
    }, []);

    const cardStyle = {
        style: {
            base: {
                color: "#373737",
                fontFamily: 'Courier, monospace',
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#373737"
                }
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

    const handleAddress = (event) => {
        setData({ ...data, address: event.target.value });
    };

    const proccessOrder = (items, succeeded, userId, token, payload) => {
        const products = [];
        items.items.products.forEach(product => {
            products.push({ name: product.name, price: product.price, count: product.count, id: product._id });
        })
        console.log(products)
        const createOrderData = {
            products: products,
            transaction_id: payload.paymentIntent.id,
            amount: payload.paymentIntent.amount,
            address: data.address,
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
        } else if (!payload.error && data.address){
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
                                <a href={`/user/dashboard/payment/${userId}`}>
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
        <form id="payment-form" onSubmit={handleSubmit}>
            <h2 style={{color: '#8cf781', fontFamily: "Big Shoulders Inline Display, cursive",  marginTop: '10px', fontSize: '30px', textAlign: 'center'}}>Cart Total: ${data.amount}.00 </h2>
            <hr />
            <div className="form-group mb-3">
                <label style={{color: 'white', fontFamily: "Big Shoulders Inline Display, cursive", fontSize: '25px'}}>Delivery Address:</label>
                <textarea
                    onChange={handleAddress}
                    className="form-control"
                    value={data.address}
                    placeholder="Ex: 123 Cherokee Way, Denver, CO 80212"
                    required
                />
                <hr />
                <p style={{color: 'white', fontFamily: "Big Shoulders Inline Display, cursive",  marginTop: '10px', fontSize: '20px', textAlign: 'center'}}>Standard shipping costs and taxes are included in the product price.<br/> Please allow up to two weeks for processing and delivery.</p>
                <hr />
            </div>
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
                
            </form>
        </>
    )
};