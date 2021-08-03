import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";

function Payment() {
    const [product, setProduct] = useState({
        name: "React from FB",
        price: 5,
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
            <StripeCheckout
                stripeKey={process.env.Payment}
                token={makePayment}
                name="Register"
                amount={product.price * 100}
                shippingAddress
                billingAddress
            >
                <button className="btn-large blue">
                Registeration Fee {product.price} Rs
                </button>
            </StripeCheckout>
        </div>
    );
}

export default Payment;
