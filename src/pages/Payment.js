import React, { useState, useEffect } from "react";

const ProductDisplay = () => (
  <section style={{ marginTop: '10%' }}>
    <form action="http://localhost:4000/api/create-checkout-session" method="POST">
      <button type="submit">
        Checkout
      </button>
    </form>
  </section>
);

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function Payment() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay />
  );
}

// import React, { useState } from "react";
// import StripeCheckout from "react-stripe-checkout";

// function Payment() {
//     const [product, setProduct] = useState({
//         name: "React from FB",
//         price: 5,
//         productBy: "facebook"
//     });

//     const makePayment = token => {
//         const body = {
//             token,
//             product
//         };
//         const headers = {
//             "Content-Type": "application/json"
//         };

//         return fetch(`http://localhost:4000/api/payment`, {
//             method: "POST",
//             headers,
//             body: JSON.stringify(body)
//         })
//             .then(response => {
//                 console.log("RESPONSE ", response);
//                 const { status } = response;
//                 console.log("STATUS ", status);
//             })
//             .catch(error => console.log(error));
//     };

//     return (
//         <div    style={{ marginTop: '10%' }}>
//             <StripeCheckout
//                 stripeKey={process.env.Payment}
//                 token={makePayment}
//                 name="Register"
//                 amount={product.price * 100}
//                 shippingAddress
//                 billingAddress
//             >
//                 <button className="btn-large blue">
//                 Registeration Fee {product.price} Rs
//                 </button>
//             </StripeCheckout>
//         </div>
//     );
// }

// export default Payment;
