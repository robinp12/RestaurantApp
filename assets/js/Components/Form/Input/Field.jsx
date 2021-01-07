import React from 'react';
//Composant d'input
const Field = ({ name, label, value, onChange, placeholder, type = "text", error = "", id, disabled = false, className = false }) => (
    <div className="form-group">
        {label && <label htmlFor={name}>{label}</label>}
        <input
            value={value}
            name={name}
            onChange={onChange}
            type={type}
            className={"form-control " + (className && className) + (error && " is-invalid")}
            id={id || name}
            placeholder={placeholder}
            disabled={disabled}
        />
        { error && <p className="invalid-feedback">{error}</p>}
    </div>
);

export default Field;