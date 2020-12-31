import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from 'react';
import Cart from "../Cart";
import CheckoutForm from '../CheckoutForm';

const promise = loadStripe("pk_test_51HCndUCDUj22MdGMszaBAdLuvPJf8o56sbzBJpYRzLfpqQvwLjJh9vHMNDAThlRWMe2SjbdUfNksbGkNGrp7A40600Up8Wr58j");

const PaymentForm = ({ id, setAway }) => {

    return (
        <>
            <div className="row">
                <div className="col">
                    <div className="row">
                        <div className="col">
                            <Cart pay />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col">
                            <Elements stripe={promise}>
                                <CheckoutForm id={id} setAway={setAway} />
                            </Elements>
                        </div>
                    </div>
                </div>
            </div>
        </>);
}

export default PaymentForm;