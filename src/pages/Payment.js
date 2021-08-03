import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";

function Payment() {
    const [product, setProduct] = useState({
        name: "React from FB",
        price: 10,
        productBy: "facebook"
    });

    const makePayment = token => {
        const body = {
            token,
            product
        };
        const headers = {
            "Content-Type": "application/json"
        };

        return fetch(`http://localhost:4000/api/payment`, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        })
            .then(response => {
                console.log("RESPONSE ", response);
                const { status } = response;
                console.log("STATUS ", status);
            })
            .catch(error => console.log(error));
    };

    return (
        <div    style={{ marginTop: '10%' }}>
            <a
                className="App-link"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
            >
                Learn React
            </a>
            <StripeCheckout
                stripeKey="pk_live_51ILhyyK2faB59yIQiMX6h3plk4DJgRQrJWqb2mtEeDiMWuZ4aF0d3ituNa3mtFV4xmGPnq1hnNuZ3BO4pnc6w6sS00mpC62de5"
                token={makePayment}
                name="Buy React"
                amount={product.price * 100}
                shippingAddress
                billingAddress
            >
                <button className="btn-large blue">
                    Buy react is just {product.price}
                </button>
            </StripeCheckout>
        </div>
    );
}

export default Payment;
