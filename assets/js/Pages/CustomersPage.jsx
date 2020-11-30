import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Field from '../Components/Form/Field';

const CustomersPage = () => {

    const [customers, setCustomers] = useState([]);
    const [customerInfo, setCustomersInfo] = useState([]);
    const [change, setChange] = useState(false);


    useEffect(() => {
        axios
            .get("http://localhost:8000/api/customers")
            .then(rep => rep.data["hydra:member"])
            .then(data => setCustomers(data))
            .catch(err => console.log(err.response));
    }, [])


    const handleDelete = (id) => {

        const originCustomers = [...customers];

        setCustomers(customers.filter(customer => customer.id !== id));
        axios
            .delete("http://localhost:8000/api/customers/" + id)
            .then(rep => console.log(rep))
            .catch(err => {
                setCustomers(originCustomers);
                console.log(err.response);
            });
        ;
    }

    return (
        <>
            <div className="row">
                <div className="col-4">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead className="thead-dark">
                                <tr>
                                    <th className="text-center">Numéro client</th>
                                    <th className="text-center">Client</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers.map(customer => <tr key={customer.id} onClick={() => setCustomersInfo(customer)}>
                                    <th scope="row" className="text-center">{customer.id}</th>
                                    <td className="text-center">{customer.firstName} {customer.lastName.toUpperCase()}</td>
                                </tr>)}

                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col">
                    <h2>Clients <b>{customerInfo.id}</b></h2>
                    {customerInfo.length !== 0 &&
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div className="row">
                                        {change &&
                                            <>
                                                <Field label="Prénom" placeholder={customerInfo.lastName} />
                                                <Field label="Nom" placeholder={customerInfo.firstName} />
                                                <Field label="Téléphone" placeholder={customerInfo.phoneNumber} />
                                                <Field label="Email" placeholder={customerInfo.email} />
                                            </>
                                            ||
                                            <>
                                                <div className="col">
                                                    <span>Nom : {customerInfo.lastName}</span><br />
                                                    <span>Prénom : {customerInfo.firstName}</span><br />
                                                    <span>Téléphone : {customerInfo.phoneNumber}</span><br />
                                                    <span>email : {customerInfo.email}</span><br />
                                                </div>
                                                <div className="col">
                                                    <span>Adresse : {customerInfo.address}</span><br />
                                                    <span>Ville : {customerInfo.city}</span><br />
                                                    <span>Code postal : {customerInfo.zipcode}</span><br />
                                                </div>
                                            </>
                                        }
                                    </div>
                                    <div className="row">
                                        <div className="col">

                                            <span>{customerInfo.invoices}</span><br />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <button className="btn btn-secondary" onClick={() => setChange(!change)}>{!change ? "Modifier" : "Valider"}</button>
                                    <button className="btn btn-primary" onClick={() => handleDelete(customerInfo.id)} disabled={customerInfo.invoices.length}>Supprimer</button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    );
}

export default CustomersPage;