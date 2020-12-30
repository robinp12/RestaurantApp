import QrCode from "qrcode.react";
import React, { useContext, useEffect, useState } from 'react';
import { API_URL } from "../../../config";
import { CustomerContext } from '../../Context/CustomerContext';
import { LangContext } from '../../Context/LangContext';
import Cart from '../Cart';
const OrderSummary = ({ isReservation = false, reservation, setReservation, takeAway, toPrint = false }) => {

    const { lang } = useContext(LangContext);
    const { customer, setCustomer } = useContext(CustomerContext);

    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setReservation({ ...reservation, [name]: value });
    };

    return (
        <>
            <div className="row">
                <div className="col">
                    {!toPrint &&
                        <h3>{lang.information}</h3>
                        ||
                        isReservation &&
                        <h3>{lang.reservationConfirmation}</h3>
                        ||
                        <h3>{lang.orderConfirmation}</h3>}
                    <div className="row">
                        <div className="col mr-4">
                            {customer.email && <>
                                <address>
                                    <strong>{customer.firstName} {customer.lastName}</strong>
                                    <br />
                                    {customer.address}
                                    <br />{customer.zipcode} {customer.city}
                                    <br />
                                    <><abbr title="Phone">N: </abbr>{customer.phoneNumber}</>
                                    <br />
                                    <a>{customer.email}</a>
                                </address>
                            </>
                                ||
                                <>
                                    <h5><em>{"Table"} : <b>{reservation}</b></em></h5>
                                </>
                            }
                            <p>
                                {!takeAway && <><em>{lang.date} : <b>{new Date(reservation.reservationAt).toLocaleString().slice(0, -3)}</b></em><br /></>}
                                {isReservation && (<>
                                    <span>{lang.peopleNumber} : <b>{reservation.peopleNumber}</b></span><br />
                                    {toPrint && <span>{"Commentaire"} : <br /><b>{reservation.comment}</b></span>}
                                </>
                                )}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col d-flex flex-column pl-4">
                    {!isReservation &&
                        <>
                            <h3>{lang.cart}</h3>
                            <div className="row">
                                <Cart />
                            </div>
                        </>
                        ||
                        <>{!toPrint &&
                            <div className="form-group">
                                <label htmlFor="comment">Commentaire</label>
                                <textarea
                                    value={reservation.comment}
                                    name="comment"
                                    onChange={handleChange}
                                    maxLength="250"
                                    className={"form-control"}
                                    id="comment"
                                    rows="5"
                                    placeholder={"Ecrire un commmentaire à propos de la réservation ..."} />
                            </div> ||
                            <div className="form-group">
                                <QrCode
                                    value={
                                        "RESERVATION" + "\n" +
                                        customer.lastName + " " + customer.firstName +
                                        "\n" +
                                        customer.email +
                                        "\n" +
                                        "Tel :" + customer.phoneNumber +
                                        "\n" +
                                        `Personnes : ${reservation.peopleNumber}` +
                                        "\n" +
                                        `Date : ${new Date(reservation.reservationAt).toLocaleString().slice(0, -3)}`
                                        + "\n \n" +
                                        "Commentaire : " + reservation.comment
                                    }
                                />
                            </div>
                        }
                        </>
                    }
                </div>


            </div>
        </>);
}

export default OrderSummary;