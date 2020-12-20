import React, { useContext, useState } from 'react';
import CustomerForm from '../Components/Form/CustomerForm';
import OrderForm from '../Components/Form/OrderForm';
import OrderSummary from '../Components/Form/OrderSummary';
import Header from '../Components/Header';
import { CustomerContext } from '../Context/CustomerContext';
import { LangContext } from '../Context/LangContext';

let now = new Date(new Date().setHours(new Date().getHours() + 1)).toISOString().slice(0, 16);

const ReservationForm = () => {
    const [step, setStep] = useState(0);
    const { lang } = useContext(LangContext);

    const [orderInfo, setOrderInfo] = useState({ time: now, numberOfPeople: 2 });

    const [customer, setCustomer] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        city: "",
        zipcode: "",
        phoneNumber: "",
    });

    const [errors, setErrors] = useState({
        lastName: "",
        firstName: "",
        email: "",
        address: "",
        zipcode: "",
        city: "",
        phoneNumber: ""
    });

    const ButtonReservation = ({ children, next, back }) => {
        return (
            <div className="container">
                {children}
                <button className="btn-primary btn float-left" onClick={() => setStep(step => step - 1)}>{back}</button>
                <button className="btn-primary btn float-right" onClick={() => setStep(step => step + 1)}>{next}</button>
            </div>
        )
    }

    function reserve() {
        switch (step) {
            case 1: // Client informations
                return (
                    <div className="container">
                        <CustomerForm errors={errors} />
                        <button className="btn-primary btn float-left" onClick={() => setStep(step => step - 1)}>{lang.back}</button>
                        <button className="btn-primary btn float-right" onClick={() => setStep(step => step + 1)}
                            disabled={!(
                                customer.firstName &&
                                customer.lastName &&
                                customer.email &&
                                customer.zipcode &&
                                customer.city &&
                                customer.phoneNumber &&
                                customer.address
                            )}
                        >{lang.next}</button>

                    </div>);
            case 2: // Reservation summary
                return (
                    <ButtonReservation back={lang.back} next={lang.next}>
                        <OrderSummary reservation orderInfo={orderInfo} />
                    </ButtonReservation>);
            case 3: // Reservation validation
                return (
                    <>
                        <div className="container">
                            <h3>{lang.orderConfirmation}</h3>
                            <div className="row">
                                <div className="col d-flex flex-column m-2">
                                </div>
                            </div>
                            <button className="btn-primary btn float-right" onClick={() => setStep(0)}>OK</button>
                        </div>
                    </>);

            default: // Order informations
                return (
                    <>
                        <div className="container">
                            <OrderForm reservation setOrderInfo={setOrderInfo} orderInfo={orderInfo} now={now} />
                            <button className="btn-primary btn float-right" onClick={(e) => { setStep(step => step + 1); e.preventDefault() }}>{lang.next}</button>
                        </div>
                    </>);
        }
    }

    return (
        <>
            <CustomerContext.Provider
                value={{ customer, setCustomer }}
            >
                {reserve()}
            </CustomerContext.Provider>
        </>
    );
}

export default ReservationForm;