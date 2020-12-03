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
    const zeroPad = (num) => '#' + String(num).padStart(5, '0');

    return (
        <>
            <div className="row">
                <div className="col">
                    <table className="table table-responsive-md table-hover">
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
                                <th scope="row" className="text-center align-middle">{zeroPad(invoice.chrono)}</th>
                                <td className="text-center align-middle">{invoice.amount} </td>
                                <td className="text-center align-middle">{invoice.status} </td>
                                <td className="text-center align-middle">{new Date(invoice.sentAt).toLocaleString()} </td>
                            </tr>)}

                        </tbody>
                    </table>
                </div>
                <div className="col">
                    <h2>Factures <b>{invoiceInfo.chrono}</b></h2>
                    {isNaN(invoiceInfo) &&
                        <div className="container form">
                            <div className="row justify-content-center">
                                <div className="col">
                                    <span>Id : {invoiceInfo.chrono}</span><br />
                                    <span>Montant : {invoiceInfo.amount}</span><br />
                                    <span>Date : {new Date(invoiceInfo.sentAt).toLocaleString()}</span><br />
                                </div>
                                <div className="col">
                                    <span>Client : {invoiceInfo.customer.firstName} {invoiceInfo.customer.lastName}</span><br />
                                </div>
                            </div>
                            {console.log(invoiceInfo.customer)}
                            <div className="row">
                                <button className="btn btn-secondary" onClick={() => setChange(!change)}>{!change ? "Modifier" : "Valider"}</button>
                                <button className="btn btn-primary" onClick={() => handleDelete(invoiceInfo.id)} disabled={invoiceInfo}>Supprimer</button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    );
}

export default InvoicesPage;