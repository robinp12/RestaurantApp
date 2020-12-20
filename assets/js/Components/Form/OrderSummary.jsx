import React, { useContext } from 'react';
import { CustomerContext } from '../../Context/CustomerContext';
import { LangContext } from '../../Context/LangContext';
import Cart from '../Cart';
const OrderSummary = ({ reservation = false, orderInfo }) => {

    const { lang } = useContext(LangContext);
    const { customer, setCustomer } = useContext(CustomerContext);

    return (
        <>
            <div className="row">
                <div className="col d-flex flex-column m-2">
                    <h3>{lang.information}</h3>
                    <span>{lang.lastName} : <b>{customer.lastName}</b></span>
                    <span>{lang.firstName} : <b>{customer.firstName}</b></span>
                    <span>{lang.email} : <b>{customer.email}</b></span>
                    <span>{lang.phoneNumber} : <b>{customer.phoneNumber}</b></span>
                    <br />
                    <span>{lang.address} : <b>{customer.address}</b></span>
                    <span>{lang.city} : <b>{customer.city}</b></span>
                    <span>{lang.zipcode} : <b>{customer.zipcode}</b></span>
                    <br />
                    <span>{lang.date} : <b>{new Date(orderInfo.time).toLocaleString().slice(0, -3)}</b></span>
                    {reservation && (<span>{lang.peopleNumber} : <b>{orderInfo.numberOfPeople}</b></span>)}
                </div>
                {!reservation &&
                    <div className="col d-flex flex-column m-2">
                        <h3>{lang.cart}</h3>
                        <Cart />
                    </div>}
            </div>
        </>);
}

export default OrderSummary;