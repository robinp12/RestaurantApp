import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import invoicesAPI from "../../Services/invoicesAPI"

const InvoicesPage = ({ history }) => {

    const [invoices, setInvoices] = useState([]);
    const [change, setChange] = useState(false);
    let invoice_id = +window.location.hash.slice(10);

    const fetchAllInvoices = async () => {

        try {
            const data = await invoicesAPI.getAllInvoices();
            setInvoices(data);
        } catch (error) {
            console.log(error.response);
        }
    }

    useEffect(() => {
        fetchAllInvoices();
    }, [])

    const handleDelete = async (id) => {
        const originInvoices = [...invoices];

        setInvoices(invoices.filter(user => user.id !== id));
        try {
            await invoicesAPI.deleteInvoices(id)
        } catch (error) {
            setInvoices(originInvoices);
        }
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
                            {invoices.map(invoice => <tr key={invoice.id} onClick={() => history.replace("/factures/" + invoice.chrono)}>
                                <th scope="row" className="text-center align-middle">{zeroPad(invoice.chrono)}</th>
                                <td className="text-center align-middle">{invoice.amount}€</td>
                                <td className="text-center align-middle">{invoice.status} </td>
                                <td className="text-center align-middle">{new Date(invoice.sentAt).toLocaleString()} </td>
                            </tr>)}

                        </tbody>
                    </table>
                </div>
                <div className="col">
                    {invoices.map(invoice =>
                        invoice.chrono == invoice_id &&
                        <div key={invoice.chrono}>
                            <h2>Factures <b>{invoice.chrono}</b></h2>
                            <div className="container form">
                                <div className="row justify-content-center">
                                    <div className="col">
                                        <span>Id : {invoice.chrono}</span><br />
                                        <span>Montant : {invoice.amount}€</span><br />
                                        <span>Date : {new Date(invoice.sentAt).toLocaleString()}</span><br />
                                    </div>
                                    <div className="col">
                                        <span>Client : {invoice.customer.firstName} {invoice.customer.lastName}</span><br />
                                    </div>
                                </div>
                                <div className="row">
                                    <button className="btn btn-secondary" onClick={() => setChange(!change)}>{!change ? "Modifier" : "Valider"}</button>
                                    <button className="btn btn-primary" onClick={() => handleDelete(invoice.id)} disabled={invoice}>Supprimer</button>
                                </div>
                            </div>
                        </div >
                    )}
                </div>
            </div>
        </>
    );
}

export default InvoicesPage;