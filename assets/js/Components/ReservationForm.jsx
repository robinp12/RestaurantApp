import Axios from 'axios';
import React, { useContext, useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';
import { toast } from "react-toastify";
import CustomerForm from '../Components/Form/CustomerForm';
import OrderForm from '../Components/Form/OrderForm';
import OrderSummary from '../Components/Form/OrderSummary';
import { CustomerContext } from '../Context/CustomerContext';
import { LangContext } from '../Context/LangContext';
import customersAPI from '../Services/customersAPI';
import reservationsAPI from '../Services/reservationsAPI';


let now = new Date().toISOString().slice(0, 16);

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
        reservationAt: "",
        comment: "",
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const rep = await customersAPI.register(customer);
            handleSubmitReservation(rep.data.id)
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

    const handleSubmitReservation = async (id) => {
        reservation.customer = "/api/customers/" + id;
        reservation.peopleNumber = parseInt(reservation.peopleNumber);
        reserveConfirm.current.setAttribute("disabled", "")
        try {
            const rep = await reservationsAPI.add(reservation);
            try {
                //Envoi du mail de confirmation
                await reservationsAPI.sendMail(rep.data.id);
                reserveConfirm.current.removeAttribute("disabled");
            } catch (error) {
                console.error("Error on email sending")
            }
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
    const componentRef2 = useRef();

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
                        <OrderSummary isReservation reservation={reservation} id={id} setReservation={setReservation} />
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
                            <div ref={componentRef2}>
                                <OrderSummary isReservation reservation={reservation} setReservation={setReservation} toPrint={true} />
                            </div>
                            <ReactToPrint bodyClass={"m-5 p-5"}
                                trigger={() => <a className="btn-outline-primary btn float-right">{lang.print}</a>}
                                content={() => componentRef2.current}
                                documentTitle={"Réservation-Le-Cheval-Blanc"}
                            />
                        </div>
                    </>);

            default: // Order informations
                return (
                    <>
                        <div className="container text-center">
                            {console.log(reservation.reservationAt)
                            }
                            <OrderForm isReservation setReservation={setReservation} reservation={reservation} now={now} />
                            <button className="btn-primary btn" onClick={Next} disabled={!reservation.reservationAt}>{lang.next}</button>

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