import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { getCart } from "./CartHelpers";
import Card from "./Card";
import Stripe from "./Stripe";


const About = () => {
    return (
        <Layout
            className="container-fluid"
        >
            <div className="about-container" style={{fontFamily: "Big Shoulders Inline Display, cursive", color: 'white'}}>
                <div className="artist" style={{textAlign: 'center'}}>
                    <h1 style={{ textDecoration: 'underline' }}>About Kangaroo Deerhart</h1>
                    <p style={{ fontSize: '20px'}}>Kangaroo Deerhart was born in Austin, TX, and lives with his partner and their two fur children in Denver, CO. Kangaroo - known as "Roo" by those close to him - draws influences for his pieces from the world around him with a flare of mysticism. <br /> All of the works you see on this site are original and one-off creations of his.</p>
                </div>
                <div className="faq">
                    <h1 style={{ textDecoration: 'underline', textAlign: 'center' }}>Frequently Asked Questions</h1>
                    <ul className="list">
                        <li className="list-item">
                            <h4>Do you offer prints of your art?</h4>
                            <p>We're currently working on providing this option, but have not yet found a reliable supplier. We will update the store to reflect this once available. All products being sold currently will be one offs and will not be printed in the future.</p>
                        </li>
                        <li className="list-item">
                            <h4>How is shipping handled?</h4>
                            <p>Shipping cost is included in the listed product prices. All shipments will originate in Denver, CO. Please allow a few business days for processing. All shipments should be delivered within two weeks of ordering, and you will receive email updates with tracking information should we be provided with such by the shipping service. Please contact us if you have any further questions regarding your order!</p>
                        </li>
                        <li className="list-item">
                            <h4>What format can I expect to recieve the art in?</h4>
                            <p>Most of Kangaroo's art is created on canvas with a variety of mediums. Please refer to the individual product information page for size info, and other specific information.</p>
                        </li>
                        <li className="list-item">
                            <h4>Can I commission Kangaroo for a specific piece?</h4>
                            <p>Please contact us for commission requests. Kangaroo would be happy to discuss your desires, and estimated budget for specific pieces.</p>
                        </li>
                        <li className="list-item">
                            <h4>Do you offer discounts?</h4>
                            <p>At this time we are not offering any discounts. But please check back regularly should this change in the future.</p>
                        </li>
                        <li className="list-item">
                            <h4>Where do the funds from sales go?</h4>
                            <p>100% of the proceeds from this site will go directly to Kangaroo, and will help support future pieces! We thank you in advance for supporting our small business!</p>
                        </li>
                        <li className="list-item">
                            <h4>Is your question not answered above?</h4>
                            <p>Please refer to the contact section below, and we will happily respond to any questions, or comments within three business days!</p>
                        </li>
                        <li className="list-item">
                            <h4>Discover an error on our site, or have any reccomendations?</h4>
                            <p>Please email Ashton Seibel - the site creator - at ashton@seibel.life</p>
                        </li>
                    </ul>
                </div>
                <div className="contact">
                    <h1 style={{ textDecoration: 'underline', textAlign: 'center' }}>Contact Information</h1>
                    <h3>Email: <a href="mailto:kangroo@deerhartdesigns.com">Kangaroo@DeerharDesigns.com</a></h3>
                </div>
            </div>
        </Layout>
    )
}

export default About;