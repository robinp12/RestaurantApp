import React, { useContext } from 'react';
import { LangContext } from '../../Context/LangContext';
import Field from './Input/Field';

let maxReserve = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().slice(0, 16)
let maxOrder = new Date(new Date().setHours(new Date().getHours() + 168)).toISOString().slice(0, 16)

const OrderForm = ({ isReservation = false, reservation, setReservation, now }) => {

    const { lang } = useContext(LangContext);

    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setReservation({ ...reservation, [name]: value })
    };

    return (
        <>
            <div className="row justify-content-center text-center">
                <div className="col-sm-12 col-md-5">
                    <div className="form-group">
                        <label htmlFor={"time"}>{"Date"}</label>
                        <input name="reservationAt" type="datetime-local" className="form-control"
                            min={now} max={isReservation ? maxReserve : maxOrder} value={reservation.reservationAt} onChange={handleChange} placeholder={now} />
                    </div>{console.log(reservation.reservationAt)
                    }
                </div>
            </div>
            {
                isReservation &&
                <div className="row justify-content-center text-center">
                    <div className="col-sm-12 col-md-5">
                        <Field label={lang.peopleNumber} type="number" value={reservation.peopleNumber} name="peopleNumber" onChange={handleChange} />
                    </div>
                </div>
            }
        </>);
}

export default OrderForm;