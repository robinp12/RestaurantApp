import React from 'react';
//Composant d'input
const Field = ({ name, label, value, onChange, placeholder, type = "text", error = "", step, min, max }) => (
    <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input
            value={value}
            name={name}
            onChange={onChange}
            type={type}
            className={"form-control" + (error && " is-invalid")}
            id={name}
            placeholder={placeholder}
            step={step}
            min={min}
            max={max}
        />
        { error && <p className="invalid-feedback">{error}</p>}
    </div>
);

export default Field;