import React from 'react';
import { Elements, CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Axios from 'axios';

const stripePromise = loadStripe("pk_test_51HCndUCDUj22MdGMszaBAdLuvPJf8o56sbzBJpYRzLfpqQvwLjJh9vHMNDAThlRWMe2SjbdUfNksbGkNGrp7A40600Up8Wr58j");

const Stripe = () => {
    const handleClick = async () => {
        console.log(Axios.post("/api/stripeServer", {
            amount: 100,
        }))

        try {
            const amount = 99;
            const paymentintent = await Axios.post("/api/stripeServer", {
                amount: 100,
            });
            console.log(paymentintent)

        } catch (error) {
            console.log(error)

        }
    }
    return (<>
        <Elements stripe={stripePromise}>
            <br />
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <br />
            <button className="btn btn-primary" onClick={handleClick}>Envoyer</button>

        </Elements>
    </>);
}

export default Stripe;