import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Field from '../Components/Form/Field';

const InvoicesPage = () => {

    const [invoices, setInvoices] = useState([]);
    const [invoiceInfo, setInvoicesInfo] = useState([]);
    const [change, setChange] = useState(false);


    useEffect(() => {
        axios
            .get("http://localhost:8000/api/invoices")
            .then(rep => rep.data["hydra:member"])
            .then(data => setInvoices(data))
            .catch(err => console.log(err.response));
    }, [])


    const handleDelete = (id) => {
        const originInvoices = [...invoices];

        setInvoices(invoices.filter(user => user.id !== id));
        axios
            .delete("http://localhost:8000/api/invoices/" + id)
            .then(rep => console.log(rep))
            .catch(err => {
                setInvoices(originInvoices);
                console.log(err.response);
            });
        ;
    }
    console.log(invoices)

    return (
        <>
            <div className="row">
                <div className="col-4">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead className="thead-dark">
                                <tr>
                                    <th className="text-center">Numéro</th>
                                    <th className="text-center">Montant</th>
                                    <th className="text-center">Etat</th>
                                    <th className="text-center">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoices.map(invoice => <tr key={invoice.id} onClick={() => setInvoicesInfo(invoice)}>
                                    <th scope="row" className="text-center">{invoice.id}</th>
                                    <td className="text-center">{invoice.amount} </td>
                                    <td className="text-center">{invoice.status} </td>
                                    <td className="text-center">{new Date(invoice.sentAt).toLocaleString()} </td>
                                </tr>)}

                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col">
                    <h2>Factures <b>{invoiceInfo.id}</b></h2>
                    {isNaN(invoiceInfo) &&
                        <div className="container">
                            <span>Id : {invoiceInfo.id}</span><br />
                            <span>Montant : {invoiceInfo.amount}</span><br />
                            <span>Date : {new Date(invoiceInfo.sentAt).toLocaleString()}</span><br />
                            <span>Client : {invoiceInfo.customer.firstName} {invoiceInfo.customer.lastName}</span><br />
                            <div className="row">
                                <div className="col">
                                    <button className="btn btn-secondary" onClick={() => setChange(!change)}>{!change ? "Modifier" : "Valider"}</button>
                                    <button className="btn btn-primary" onClick={() => handleDelete(invoiceInfo.id)} disabled={invoiceInfo}>Supprimer</button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    );
}

export default InvoicesPage;