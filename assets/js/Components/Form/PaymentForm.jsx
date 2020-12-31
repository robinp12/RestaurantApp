import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from 'react';
import Cart from "../Cart";
import CheckoutForm from '../CheckoutForm';
import PaymentBancontact from '../PaymentBancontact';

const promise = loadStripe("pk_test_51HCndUCDUj22MdGMszaBAdLuvPJf8o56sbzBJpYRzLfpqQvwLjJh9vHMNDAThlRWMe2SjbdUfNksbGkNGrp7A40600Up8Wr58j");

const PaymentForm = ({ id, setAway }) => {

    return (
        <>
            <div className="row">
                <div className="col">
                    <div className="row">
                        <div className="col payment">
                            <h3 className={"mb-3"}>Résumé </h3>
                            <Cart pay />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col payment">
                            <h3 className={"mb-4"}>Paiement </h3>
                            <Elements stripe={promise}>
                                <CheckoutForm id={id} setAway={setAway} />
                                {console.log(id)}

                                {/* <PaymentBancontact stripe={promise} /> */}
                            </Elements>
                        </div>
                    </div>
                </div>
            </div>
        </>);
}

export default PaymentForm;