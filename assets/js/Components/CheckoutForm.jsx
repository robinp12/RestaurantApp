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
            const rep = await Axios.post("/pay/" + 239)
                .then(res => {
                    return res;
                });
            setClientSecret(rep.data.client_secret)
        } catch (error) {
            console.error("Error on client's payment fetching")
        }
    }
    useEffect(() => {
        fetchSecret()
    }, []);

    const cardStyle = {
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
    const handleSubmit = async e => {
        e.preventDefault();
        setProcessing(true);
        var payload;
        try {
            payload = await stripe.confirmCardPayment(clientSecret, {
                payment_method: { card: elements.getElement(CardElement) }
            });
        } catch (error) {
            console.log(error)
        }
        if (payload.error) {
            console.log(payload.error)

            setError(`${lang.refusedPayment}. ${payload.error.message}`);
            setProcessing(false);
        } else {
            setError(null);
            try {
                const rep = await invoicesAPI.update(id, { status: "PAID" });
                //Envoi du mail de confirmation 
                const mail = await ordersAPI.sendMail(id);
                toast(lang.paymentConfirmation);

                setProcessing(false);
                setAway(step => step + 1)
            } catch (error) {
                setProcessing(false);

                console.error("Error on invoice update to paid")
            }
            setSucceeded(true);
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
            {/* Show any error that happens when processing the payment */}
            {error && (<div className="card-errors" role="alert">{error}</div>)}
            {/* Show a success message upon completion */}
            {succeeded && <p className={succeeded ? "result-message" : "result-message hidden"}>
                {LangContext.paymentSucceed}
            </p>}
        </>
    );
}