import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useContext } from 'react';
import { STRIPE_PK } from "../../../config";
import { LangContext } from "../../Context/LangContext";
import Cart from "../Cart";
import CheckoutForm from '../CheckoutForm';

const promise = loadStripe(STRIPE_PK);

const PaymentForm = ({ id, setAway }) => {
    const { lang } = useContext(LangContext);

    return (
        <>
            <div className="row">
                <div className="col">
                    <div className="row">
                        <div className="col payment">
                            <h3 className={"mb-3"}>{lang.summary} </h3>
                            <Cart pay />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col my-2">
                            <h3 className={"mb-4"}>{lang.payment} </h3>
                            <Elements stripe={promise}>
                                <CheckoutForm id={id} setAway={setAway} />
                                {/* <PaymentBancontact stripe={promise} /> */}
                            </Elements>
                        </div>
                    </div>
                </div>
            </div>
        </>);
}

export default PaymentForm;