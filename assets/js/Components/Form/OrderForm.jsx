import React, { useContext, useState } from 'react';
import { LangContext } from '../../Context/LangContext';
import Field from './Input/Field';

let max = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().slice(0, 16)

const OrderForm = ({ reservation = false, orderInfo, setOrderInfo, now }) => {
    console.log(max)

    const { lang } = useContext(LangContext);

    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setOrderInfo({ ...orderInfo, [name]: value })
    };

    return (
        <>
            <div className="row">
                <div className="col">
                    <div className="form-group">
                        <label htmlFor={"time"}>{"Date"}</label>
                        <input name="time" type="datetime-local" className="form-control"
                            min={now} max={max} value={orderInfo.time} onChange={handleChange} placeholder={now} />
                    </div>
                </div>
            </div>
            {
                reservation &&
                <div className="row">
                    <div className="col">
                        <Field label={lang.peopleNumber} type="number" value={orderInfo.numberOfPeople} name="numberOfPeople" onChange={handleChange} placeholder={2} />
                    </div>
                </div>
            }
        </>);
}

export default OrderForm;