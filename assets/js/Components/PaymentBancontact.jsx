import React, { useEffect, useState } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import Axios from 'axios';

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');
    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        Axios.post("/pay/" + 217)
            .then(res => {
                return res;
            })
            .then(data => {
                setClientSecret(data.data.client_secret);
            });
    }, []);

    const handleSubmit = async (event) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }


        const accountholderName = event.target['accountholder-name'];

        const { error } = await stripe.confirmBancontactPayment(clientSecret, {
            payment_method: {
                billing_details: {
                    name: "Rob",
                },
            },
        });

        if (error) {
            // Show error to your customer.
            console.log(error.message);
        }

        // Otherwise the customer will be redirected away from your
        // page to complete the payment with their bank.
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-row">
                <label>
                    Name
          <input name="accountholder-name" placeholder="Jenny Rosen" required />
                </label>
            </div>
            <button type="submit" disabled={!stripe}>
                Submit Payment
      </button>
        </form>
    );
}