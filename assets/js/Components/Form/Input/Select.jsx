import React from 'react';

const Select = ({ name, label, value, onChange, error = "", defaut, children, disabled = false }) => {

    return (
        <>
            {label && <label htmlFor={name}>{label}</label>}
            <select
                className={"form-control " + (error && " is-invalid")}
                id={name}
                name={name}
                onChange={onChange}
                value={value}
                disabled={disabled}
            >
                <option hidden value>{defaut}</option>
                {children}
            </select>
            <p className="invalid-feedback">{error}</p>
        </>
    )
};

export default Select;