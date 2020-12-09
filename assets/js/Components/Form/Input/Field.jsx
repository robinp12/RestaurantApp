import React from 'react';
//Composant d'input
const Field = ({ name, label, value, onChange, placeholder, type = "text", error = "", id }) => (
    <div className="form-group">
        {label && <label htmlFor={name}>{label}</label>}
        <input
            value={value}
            name={name}
            onChange={onChange}
            type={type}
            className={"form-control" + (error && " is-invalid")}
            id={id || name}
            placeholder={placeholder}
        />
        { error && <p className="invalid-feedback">{error}</p>}
    </div>
);

export default Field;