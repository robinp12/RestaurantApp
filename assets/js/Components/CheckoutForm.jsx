import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import invoicesAPI from "../Services/invoicesAPI";
import ordersAPI from "../Services/ordersAPI";
export default function CheckoutForm({ id, setAway }) {
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        Axios.post("/pay/" + id)
            .then(res => {
                return res;
            })
            .then(data => {
                setClientSecret(data.data.client_secret);
            });
    }, []);
    const CARD_ELEMENT_OPTIONS = {
        style: {
            base: {
                color: '#32325d',
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '16px',
                '::placeholder': {
                    color: '#aab7c4'
                }
            },
            invalid: {
                color: '#fa755a',
                iconColor: '#fa755a'
            }
        }
    };
    const cardStyle = {
        style: {
            base: {
                color: "#32325d",
                fontFamily: 'Arial, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#32325d"
                }
            },
            invalid: {
                color: "#fa755a",
                iconColor: "#fa755a"
            }
        }
    };
    const handleChange = async (event) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    };
    const handleSubmit = async e => {
        e.preventDefault();
        setProcessing(true);
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: { card: elements.getElement(CardElement) }
        });
        if (payload.error) {
            setError(`Paiement refusé. ${payload.error.message}`);
            setProcessing(false);
        } else {
            setError(null);
            try {
                const rep = await invoicesAPI.update(id, { status: "PAID" });
                //Envoi du mail de confirmation 
                const mail = await ordersAPI.sendMail(id);
                console.log(rep, mail)

                setProcessing(false);
                setAway(step => step + 1)
            } catch (error) {
                console.error("Error on invoice update to paid")
            }
            setSucceeded(true);
        }
    };
    return (
        <>
            <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
            <button onClick={handleSubmit} className="btn btn-primary m-1 mt-3 stripe" disabled={processing || disabled || succeeded} id="submit" >
                <span id="button-text">
                    {processing ? (<div className="spinner" id="spinner"></div>) : ("Payer")}
                </span>
            </button>
            {/* Show any error that happens when processing the payment */}
            {error && (<div className="card-errors" role="alert">{error}</div>)}
            {/* Show a success message upon completion */}
            {succeeded && <p className={succeeded ? "result-message" : "result-message hidden"}>
                Paiement réussi.
            </p>}
        </>
    );
}