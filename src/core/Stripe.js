import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckoutForm from "./StripeCheckoutForm";

const promise = loadStripe("pk_live_51HoGTrFSjatdxhjcB4QEGfVYxKWtzqtdnYD9sD80x0VRQKsOgnZTl1BI3aWjmvVEBkWKsglamBxJkzn7qbgX4ytX00Lj6fiq6W");

export default function Stripe(products) {
    return (
        <div className="Stripe">
            <Elements stripe={promise}>
                <StripeCheckoutForm items={products} />
            </Elements>
        </div>
    );
};