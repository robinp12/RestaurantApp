import React, { useState } from 'react';
import Field from './Input/Field';

const OrderForm = ({ reservation = false }) => {

    const [today, setToday] = useState(new Date().toJSON().substring(0, 10));
    const [maxDate, setMaxDate] = useState(new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toJSON().substring(0, 10));

    return (
        <>
            <div className="row">
                <div className="col">
                    <Field label="Heure" type="number" min="11" max="23" step="1" placeholder={new Date().getHours()} />
                </div>
                <div className="col">
                    <Field label="Min" type="number" min="0" max="59" step="15" placeholder={new Date().getMinutes()} />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Field label="Date" type="date" min={today} max={maxDate} />
                </div>
            </div>
            {reservation &&
                <div className="row">
                    <div className="col">
                        <Field label="Nombre de personne" type="number" placeholder={2} />
                    </div>
                </div>
            }
        </>);
}

export default OrderForm;