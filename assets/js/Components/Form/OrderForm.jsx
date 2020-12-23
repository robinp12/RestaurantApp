import React, { useContext, useState } from 'react';
import { LangContext } from '../../Context/LangContext';
import Field from './Input/Field';

let max = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().slice(0, 16)

const OrderForm = ({ isReservation = false, reservation, setReservation, now }) => {

    const { lang } = useContext(LangContext);

    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setReservation({ ...reservation, [name]: value })
    };

    return (
        <>
            <div className="row">
                <div className="col">
                    <div className="form-group">
                        <label htmlFor={"time"}>{"Date"}</label>
                        <input name="reservationAt" type="datetime-local" className="form-control"
                            min={now} max={max} value={reservation.reservationAt} onChange={handleChange} placeholder={now} />
                    </div>
                </div>
            </div>
            {
                isReservation &&
                <div className="row">
                    <div className="col">
                        <Field label={lang.peopleNumber} type="number" value={reservation.peopleNumber} name="peopleNumber" onChange={handleChange} />
                    </div>
                </div>
            }
        </>);
}

export default OrderForm;