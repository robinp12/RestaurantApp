import React, { useState } from 'react';
import ClientForm from '../Components/Form/ClientForm';
import OrderInformation from '../Components/Form/OrderInformation';
import OrderSummary from '../Components/Form/OrderSummary';
import Header from '../Components/Header';

const ReservationPage = () => {
    const [step, setStep] = useState(0);

    function reserve() {
        switch (step) {
            case 1: // Client informations
                return (
                    <>
                        <div className="container">
                            <ClientForm />
                            <button className="btn-primary btn float-left" onClick={() => setStep(step => step - 1)}>Retour</button>
                            <button className="btn-primary btn float-right" onClick={() => setStep(step => step + 1)}>Suivant</button>
                        </div>
                    </>);
            case 2: // Reservation summary
                return (
                    <>
                        <div className="container">
                            <OrderSummary reservation />
                            <button className="btn-primary btn float-left" onClick={() => setStep(step => step - 1)}>Retour</button>
                            <button className="btn-primary btn float-right" onClick={() => setStep(step => step + 1)}>Réserver</button>
                        </div>
                    </>);
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
                            <OrderInformation reservation />
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