import React from 'react';
import Field from './Input/Field';

const CustomerForm = ({ client, handleChange, errors }) => {

    return (
        <>
            <div className="row">
                <div className="col">
                    <Field
                        label="Nom"
                        name="lastName"
                        value={client.lastName}
                        onChange={handleChange}
                        placeholder="Nom"
                        error={errors.lastName}
                    />
                </div>
                <div className="col">
                    <Field
                        label="Prénom"
                        name="firstName"
                        value={client.firstName}
                        onChange={handleChange}
                        placeholder="Prénom"
                        error={errors.firstName}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Field
                        label="Adresse mail"
                        name="email"
                        value={client.email}
                        onChange={handleChange}
                        type="email"
                        placeholder="Email"
                        error={errors.email}
                        size="col-3"
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Field
                        label="Adresse"
                        name="address"
                        value={client.address}
                        onChange={handleChange}
                        placeholder="Adresse"
                        error={errors.address}
                    />
                    <Field
                        label="Code postal"
                        name="zipcode"
                        value={client.zipcode}
                        onChange={handleChange}
                        placeholder="Code postal"
                        error={errors.zipcode}
                    />
                </div>
                <div className="col">
                    <Field
                        label="Ville"
                        name="city"
                        value={client.city}
                        onChange={handleChange}
                        placeholder="Ville"
                        error={errors.city}
                    />
                    <Field
                        label="Numéro de téléphone"
                        name="phoneNumber"
                        value={client.phoneNumber}
                        onChange={handleChange}
                        placeholder="Numéro de téléphone"
                        error={errors.phoneNumber}
                    />
                </div>
            </div>
        </>);
}

export default CustomerForm;