import React, { useContext, useRef } from 'react';
import { LangContext } from '../../Context/LangContext';
import Field from './Input/Field';

let maxReserve = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().slice(0, 16)
let maxOrder = new Date(new Date().setHours(new Date().getHours() + 168)).toISOString().slice(0, 16)

const OrderForm = ({ isReservation = false, reservation, setReservation, now, errors = "" }) => {

    const { lang } = useContext(LangContext);

    let date;
    let heure;
    const handleChange = ({ currentTarget }) => {
        const { name, value, type } = currentTarget;

        let jourFR = new Date(ref.current?.value).toLocaleString('fr-be', { weekday: 'long' });
        let heureFR = ref1.current?.value.slice(0, -3)

        if (name == "reservationAt") {
            heure = ref1.current?.value;
            date = ref.current?.value;
            if (
                jourFR !== "mercredi" && jourFR !== "jeudi" &&
                heureFR >= 11 && heureFR <= 21) {
                setReservation({ ...reservation, [name]: date + "T" + heure })
            }
            else {
                setReservation({ ...reservation, [name]: "" })
            }
        }
        else {
            setReservation({ ...reservation, [name]: value })
        }
    };

    const ref = useRef();
    const ref1 = useRef();

    return (
        <>
            <div className="row justify-content-center text-center">
                <div className="col-12">
                    <div className="form-group">
                        {isReservation && <label htmlFor={"time"}>{lang.reserveDate}</label> || <label htmlFor={"time"}>{lang.receptionDate}</label>}
                        {isReservation && <>
                            <div className="row">
                                <div className="col-md-7 col-sm-12 my-2">
                                    <input ref={ref} name="reservationAt" type="date" className={"form-control " + (errors.reservation_at && " is-invalid")}
                                        min={now} max={maxReserve} onChange={handleChange} placeholder={"mm/jj/aaaa"} required />
                                </div>
                                <div className="col-md-5 col-sm-12 my-2">
                                    <input ref={ref1} name="reservationAt" type="time" className={"form-control " + (errors.reservation_at && " is-invalid")}
                                        min="11:00" max="21:00" onChange={handleChange} required />
                                </div>
                            </div>
                            {errors.reservation_at &&
                                <p className="invalid-feedback">{errors.reservation_at}</p> ||
                                <p className={"text-muted float-left"}>Veuillez vérifier l'horaire</p>}
                        </>
                            ||
                            <>
                                <div className="row">

                                    <input ref={ref} name="reservationAt" type="date" className={"col form-control " + (errors.timeToReceive && " is-invalid")}
                                        min={now} max={maxOrder} onChange={handleChange} placeholder={"mm/jj/aaaa"} />
                                    <input ref={ref1} name="reservationAt" type="time" className={"mx-2 col-4 form-control " + (errors.timeToReceive && " is-invalid")}
                                        min="11:00" max="21:00" onChange={handleChange} />
                                </div>
                                {errors.timeToReceive &&
                                    <p className="invalid-feedback">{errors.timeToReceive}</p> ||
                                    <p className={"text-muted float-left"}>Veuillez vérifier l'horaire</p>}
                            </>
                        }
                    </div>
                </div>
            </div>
            {
                isReservation &&
                <div className="row justify-content-center text-center">
                    <div className="col-12">
                        <Field label={lang.peopleNumber} type="number" value={reservation.peopleNumber} name="peopleNumber" error={errors.peopleNumber} onChange={handleChange} />
                    </div>
                </div>
            }
        </>);
}

export default OrderForm;