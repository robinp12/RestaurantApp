import React, { useContext } from 'react';
import Header from '../Components/Header';
import ReservationForm from '../Components/ReservationForm';
import { LangContext } from '../Context/LangContext';


const ReservationPage = () => {

    const { lang } = useContext(LangContext);

    return (
        <>
            <Header title={lang.reservation} />
            <div className="container">
                <div className="row justify-content-center">
                    <form className="d-flex blockStep">
                        <ReservationForm />
                    </form>
                </div>
            </div>
        </>
    )
}

export default ReservationPage;