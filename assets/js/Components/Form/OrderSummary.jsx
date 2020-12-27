import React, { useContext } from 'react';
import { CustomerContext } from '../../Context/CustomerContext';
import { LangContext } from '../../Context/LangContext';
import Cart from '../Cart';
import Field from './Input/Field';
const OrderSummary = ({ isReservation = false, reservation, setReservation }) => {

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
                    <h3>{lang.information}</h3>
                    <div className="row">
                        <div className="col-xs-6 col-sm-6 col-md-6">
                            <address>
                                <strong>{customer.firstName} {customer.lastName}</strong>
                                <br />
                                {customer.address}
                                <br />{customer.zipcode} {customer.city}
                                <br />
                                <abbr title="Phone">N: </abbr>{customer.phoneNumber}
                                <br />
                                <a>{customer.email}</a>
                            </address>
                            <p>
                                <em>{lang.date} : <b>{new Date(reservation.reservationAt).toLocaleString().slice(0, -3)}</b></em><br />
                                {isReservation && (<span>{lang.peopleNumber} : <b>{reservation.peopleNumber}</b></span>)}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col d-flex flex-column border-left pl-4 ml-4">
                    {!isReservation &&
                        <>
                            <h3>{lang.cart}</h3>
                            <div className="row">
                                <Cart />
                            </div>
                        </>
                        ||
                        <>
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
                            </div>
                        </>
                    }
                </div>


            </div>
        </>);
}

export default OrderSummary;