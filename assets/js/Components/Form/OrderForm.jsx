import React, { useContext, useRef } from 'react';
import { LangContext } from '../../Context/LangContext';
import Field from './Input/Field';

let maxReserve = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().slice(0, 16)
let maxOrder = new Date(new Date().setHours(new Date().getHours() + 168)).toISOString().slice(0, 16)

const OrderForm = ({ isReservation = false, reservation, setReservation, now, errors = "" }) => {

    const { lang } = useContext(LangContext);

    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setReservation({ ...reservation, [name]: value })
    };

    const ref = useRef();

    return (
        <>
            <div className="row justify-content-center text-center">
                <div className="col-sm-12 col-md-6">
                    <div className="form-group">
                        {isReservation && <label htmlFor={"time"}>{lang.reserveDate}</label> || <label htmlFor={"time"}>{lang.receptionDate}</label>}
                        <input ref={ref} name="reservationAt" type="datetime-local" className={"form-control" + (errors && " is-invalid")}
                            min={now} max={isReservation ? maxReserve : maxOrder} value={reservation.reservationAt} onChange={handleChange} placeholder={"mm/jj/aaaa HH:mm"} />
                        {errors && <p className="invalid-feedback">{errors}</p> || <p className={"text-muted float-left"}>{lang.date} : {new Date(reservation.reservationAt || now).toLocaleString()}</p>}
                    </div>
                </div>
            </div>
            {
                isReservation &&
                <div className="row justify-content-center text-center">
                    <div className="col-sm-12 col-md-6">
                        <Field label={lang.peopleNumber} type="number" value={reservation.peopleNumber} name="peopleNumber" onChange={handleChange} />
                    </div>
                </div>
            }
        </>);
}

export default OrderForm;