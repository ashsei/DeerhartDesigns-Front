import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckoutForm from "./StripeCheckoutForm";

// Change to LIVE Publishable Key Prior to Launch
const promise = loadStripe("pk_test_51HoGTrFSjatdxhjcO2sPuYkBwxGDQfVVtz4shdQTMxSWYpRKNdcQJFXEYxTvuksnzRNy8uccIuV6LtJOsKP6KsZH00MlvLhxPO");

export default function Stripe(products) {
    return (
        <div className="Stripe">
            <Elements stripe={promise}>
                <StripeCheckoutForm items={products} />
            </Elements>
        </div>
    );
};