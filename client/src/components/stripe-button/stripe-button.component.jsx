//To install   =>   npm install react-stripe-checkout

import React from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  //in order to make a proper charge the price have to be in cents
  //50$ === 5000 cents
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51JfrxpHvewu0FMTHmAfEJg3oEfkdRqK4yvZhtpS8CDdqWvIpq09Xsg244b6qd9sO0jeRNa5dJKdIGglwwSHUEfw400x4n3qBL3";

  //token is the on success callback that triggers when we submit
  //submission is going to be handled by StripeCheckout component
  //if you wanna process payments you will pass the token to your backend which then creates the charge
  const onToken = (token) => {
    // console.log(token);
    //returns a promise
    axios({
      url: "payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token,
      },
    })
      .then((response) => {
        alert("Payement Successful");
      })
      .catch((error) => {
        console.log("Payement error: ", JSON.parse(error));
        alert(
          "there was an issue with your payment, please make sure you use the provided credit card."
        );
      });
  };

  //this component have multiple properties that enable or disable diffrent features that we have access to inside our checkourt dropdown
  //https://github.com/azmenak/react-stripe-checkout see here for all of them
  return (
    <StripeCheckout
      label="Pay Now "
      name="CROWN Clothing"
      description={`Your total is $${price}`}
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg
      "
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
