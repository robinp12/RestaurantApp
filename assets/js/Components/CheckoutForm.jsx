import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { LangContext } from "../Context/LangContext";
import invoicesAPI from "../Services/invoicesAPI";
import ordersAPI from "../Services/ordersAPI";
import { toast } from "react-toastify";

export default function CheckoutForm({ id, setAway }) {
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');
    const { lang } = useContext(LangContext);

    const stripe = useStripe();
    const elements = useElements();

    const fetchSecret = async () => {
        // Create PaymentIntent as soon as the page loads
        try {
            const rep = await Axios.post("/pay/" + id)
                .then(res => {
                    return res;
                });
            setClientSecret(rep.data.client_secret)
        } catch (error) {
            setError("Erreur de récupération de la facture")
            setDisabled(false);
            console.error("Error on client's payment fetching")
        }
    }
    useEffect(() => {
        fetchSecret()
    }, []);

    const cardStyle = {
        hidePostalCode: true,
        style: {
            base: {
                color: "#32325d",
                fontFamily: 'Arial, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "12px",
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
        setDisabled(false);
        setProcessing(false)
        setError(event.error ? event.error.message : "");
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        setDisabled(true);

        if (!stripe || !elements) {
            return;
        }

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: { card: elements.getElement(CardElement) }
        });

        console.log(result)

        if (result.error) {
            setError(result.error.message + " " + lang.refusedPayment);
            setDisabled(false);

            console.log(result.error.message);
        } else {
            // The payment has been processed!
            setProcessing(true);
            setDisabled(true);
            if (result.paymentIntent.status === 'succeeded') {
                setSucceeded(true);
                setProcessing(false);
                // Show a success message to your customer
                // There's a risk of the customer closing the window before callback
                // execution. Set up a webhook or plugin to listen for the
                // payment_intent.succeeded event that handles any business critical
                // post-payment actions.
                try {
                    const rep = await invoicesAPI.update(id, { status: "PAID" });
                    toast(lang.paymentConfirmation);
                    //Envoi du mail de confirmation 
                    const mail = await ordersAPI.sendMail(id);
                    setAway(step => step + 1)
                } catch (error) {
                    console.error("Error on invoice update to paid")
                }
            }
        }
    };
    return (
        <>
            <CardElement id="card-element" className="bg-light m-1 p-3" options={cardStyle} onChange={handleChange} />
            <button onClick={handleSubmit} className="btn btn-primary mt-3 stripe" disabled={processing || disabled || succeeded} id="submit" >
                <span id="button-text">
                    {processing ? (lang.verification + " ...") : (lang.confirmPayment)}
                </span>
            </button>
            {error && (<div className="card-errors" role="alert">{error}</div>)}
            {succeeded && <p className={succeeded ? "result-message" : "result-message hidden"}>
                {LangContext.paymentSucceed}
            </p>}
        </>
    );
}