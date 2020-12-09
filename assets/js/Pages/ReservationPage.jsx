import React, { useState } from 'react';
import CustomerForm from '../Components/Form/CustomerForm';
import OrderForm from '../Components/Form/OrderForm';
import OrderSummary from '../Components/Form/OrderSummary';
import Header from '../Components/Header';

const ReservationPage = () => {
    const [step, setStep] = useState(0);

    const [client, setClient] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        city: "",
        zipcode: "",
        phoneNumber: ""
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

    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setClient({ ...client, [name]: value });
    };

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
                    <ButtonReservation back={"Retour"} next={"Suivant"}>
                        <CustomerForm client={client} errors={errors} handleChange={handleChange} />
                    </ButtonReservation>);
            case 2: // Reservation summary
                return (
                    <ButtonReservation back={"Retour"} next={"Suivant"}>
                        <OrderSummary reservation client={client} />
                    </ButtonReservation>);
            case 3: // Reservation validation
                return (
                    <>
                        <div className="container">
                            <h3>Confirmation de la réservation</h3>
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
                            <OrderForm reservation />
                            <button className="btn-primary btn float-right" onClick={() => setStep(step => step + 1)}>Suivant</button>
                        </div>
                    </>);
        }
    }

    return (
        <>
            <h2 className="card-title"><Header title={"Réservation"} /></h2>
            <div className="row justify-content-center">
                <form className="formBlock form">
                    {reserve()}
                </form>
            </div>
        </>
    );
}

export default ReservationPage;