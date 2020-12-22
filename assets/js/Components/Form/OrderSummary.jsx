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
                <div className="col">
                    <h3>{lang.information}</h3>
                    <div className="row">
                        <div className="col-xs-6 col-sm-6 col-md-6">
                            <address>
                                <strong>{customer.firstName} {customer.lastName}</strong>
                                <br />
                                {customer.address}
                                <br />{customer.zipcode} {customer.city}
                                <br />
                                <abbr title="Phone">N: </abbr>{customer.phoneNumber}
                                <br />
                                <a>{customer.email}</a>
                            </address>
                            <p>
                                <em>{lang.date} : <b>{new Date(orderInfo.time).toLocaleString().slice(0, -3)}</b></em><br />
                                {reservation && (<span>{lang.peopleNumber} : <b>{orderInfo.numberOfPeople}</b></span>)}
                            </p>
                        </div>
                    </div>
                </div>
                {!reservation &&
                    <div className="col d-flex flex-column border-left pl-4 ml-4">
                        <h3>{lang.cart}</h3>
                        <div className="row">
                            <Cart />
                        </div>
                    </div>}
            </div>
        </>);
}

export default OrderSummary;