import React, { useContext } from 'react';
import { CustomerContext } from '../../Context/CustomerContext';
import { LangContext } from '../../Context/LangContext';
import Field from './Input/Field';

const CustomerForm = ({ errors, setCustomerEmail }) => {

    const { lang } = useContext(LangContext);
    const { customer, setCustomer } = useContext(CustomerContext);

    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setCustomer({ ...customer, [name]: value });
    };

    return (
        <>
            <div className="row">
                <div className="col-sm-12 col-md-6">
                    <Field
                        label={lang.lastName}
                        name="lastName"
                        value={customer.lastName}
                        onChange={handleChange}
                        placeholder={lang.lastName}
                        error={errors.lastName}
                    />
                </div>
                <div className="col-sm-12 col-md-6">
                    <Field
                        label={lang.firstName}
                        name="firstName"
                        value={customer.firstName}
                        onChange={handleChange}
                        placeholder={lang.firstName}
                        error={errors.firstName}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Field
                        label={lang.email}
                        name="email"
                        value={customer.email}
                        onChange={handleChange}
                        type="email"
                        placeholder={lang.email}
                        error={errors.email}
                        size="col-3"
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12 col-md-6">
                    <Field
                        label={lang.address}
                        name="address"
                        value={customer.address}
                        onChange={handleChange}
                        placeholder={lang.address}
                        error={errors.address}
                    />
                </div>
                <div className="col-sm-12 col-md-6">

                    <Field
                        type="number"
                        label={lang.zipcode}
                        name="zipcode"
                        value={customer.zipcode}
                        onChange={handleChange}
                        placeholder={lang.zipcode}
                        error={errors.zipcode}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12 col-md-6">

                    <Field
                        label={lang.city}
                        name="city"
                        value={customer.city}
                        onChange={handleChange}
                        placeholder={lang.city}
                        error={errors.city}
                    />
                </div>
                <div className="col-sm-12 col-md-6">

                    <Field
                        label={lang.phoneNumber}
                        name="phoneNumber"
                        value={customer.phoneNumber}
                        onChange={handleChange}
                        placeholder={lang.phoneNumber}
                        error={errors.phoneNumber}
                    />
                </div>
            </div>
        </>);
}

export default CustomerForm;