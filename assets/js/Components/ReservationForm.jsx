import React, { useContext, useRef, useState } from 'react';
import CustomerForm from '../Components/Form/CustomerForm';
import OrderForm from '../Components/Form/OrderForm';
import OrderSummary from '../Components/Form/OrderSummary';
import { CustomerContext } from '../Context/CustomerContext';
import { LangContext } from '../Context/LangContext';
import customersAPI from '../Services/customersAPI';
import reservationsAPI from '../Services/reservationsAPI';
import { toast } from "react-toastify";


let now = new Date(new Date().setHours(new Date().getHours() + 1)).toISOString().slice(0, 16);

const ReservationForm = () => {
    const [step, setStep] = useState(0);
    const { lang } = useContext(LangContext);
    const reserveConfirm = useRef();


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

    const [reservation, setReservation] = useState({
        peopleNumber: 2,
        customerEmail: "",
        reservationAt: now,
        comment: "",
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const rep = await customersAPI.register(customer);
            handleSubmitReservation()
        } catch (error) {
            console.error("Customer's form error")
            if (error.response.data.violations) {
                const apiErrors = {};
                setStep(1)
                error.response.data.violations.forEach((violation) => {
                    apiErrors[violation.propertyPath] = violation.message;
                });
                setErrors(apiErrors);
            }
        }

    }

    const handleSubmitReservation = async () => {
        reservation.customerEmail = customer.email;
        reservation.peopleNumber = parseInt(reservation.peopleNumber);

        reserveConfirm.current.setAttribute("disabled", "")

        try {
            const rep = await reservationsAPI.add(reservation);
            reserveConfirm.current.removeAttribute("disabled")
            toast("Réservation envoyée");
            setStep(step => step + 1);
        } catch (error) {
            console.error("Reservation's form error")
        }
    }
    const oneTimeClick = (e) => {
        e.preventDefault()
        reserveConfirm.current.setAttribute("disabled", "")
    }

    const Back = (e) => {
        e.preventDefault();
        setStep(step => step - 1)
    }
    const Next = (e) => {
        e.preventDefault();
        setStep(step => step + 1)
    }

    function reserve() {
        switch (step) {
            case 1: // Client informations
                return (
                    <div className="container">
                        <CustomerForm errors={errors} />
                        <button className="btn-primary btn float-left" onClick={Back}>{lang.back}</button>
                        <button className="btn-primary btn float-right" onClick={Next}
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
                    <div className="container">
                        <OrderSummary isReservation reservation={reservation} />
                        <button className="btn-primary btn float-left" onClick={Back}>{lang.back}</button>
                        <button className="btn-primary btn float-right" ref={reserveConfirm} onClick={(e) => {
                            handleSubmit(e);
                            oneTimeClick(e)
                        }}>{lang.confirm}</button>
                    </div>);
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
                            <OrderForm isReservation setReservation={setReservation} reservation={reservation} now={now} />
                            <button className="btn-primary btn float-right" onClick={Next}>{lang.next}</button>
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