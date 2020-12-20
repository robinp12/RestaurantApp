import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import invoicesAPI from "../../Services/invoicesAPI";
import { toast } from "react-toastify";


const InvoicesPage = ({ match, history }) => {

    const { id } = match.params

    const [invoices, setInvoices] = useState([]);
    const [change, setChange] = useState(false);
    let invoice_id = id;

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
            history.replace("/factures/" + invoices[invoices.length - 1 - 1].i)

        } catch (error) {
            setInvoices(originInvoices);
        }
    }
    const zeroPad = (num) => '#' + String(num).padStart(5, '0');

    return (
        <>
            <div className="row">
                <div className="col">
                    <table className="table table-responsive-md table-hover ">
                        <thead className="thead-dark">
                            <tr>
                                <th className="text-center hidden-xs">ID</th>
                                <th className="text-center">Etat</th>
                                <th className="text-center">Envoyé</th>
                                <th className="text-center">Recevoir</th>
                                <th className="text-center">Montant</th>
                                <th className="text-center"><em className="fa fa-cog"></em></th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.map(invoice => <tr key={invoice.id}
                                onClick={() => history.replace("/factures/" + invoice.id)}
                            >
                                <th scope="row" className="text-center align-middle">{zeroPad(invoice.chrono)}</th>
                                <td className="text-center align-middle">{invoice.status} </td>
                                <td className="text-center align-middle">{new Date(invoice.sentAt).toLocaleString()} </td>
                                <td className="text-center align-middle">{new Date(invoice?.timeToReceive).toLocaleString()} </td>
                                <td className="text-center align-middle">{invoice.amount}€</td>
                                <td align="center">
                                    <a className="btn btn-secondary"><em className="fa fa-pencil"></em></a>
                                    <a className="btn btn-primary" onClick={() => handleDelete(invoice.id)}><em className="fa fa-trash"></em></a>
                                </td>
                            </tr>)}

                        </tbody>
                    </table>
                </div>
                <div className="col">
                    {invoices.map(invoice =>
                        invoice.id == invoice_id &&
                        <div className="row card p-3" key={invoice.chrono}>
                            <h2>Factures <b>{invoice.id}</b></h2>
                            {/* <h2>Factures <b>{invoice.chrono}</b></h2> */}
                            {console.log(invoice)
                            }
                            <div className="container form">
                                <div className="row justify-content-center">
                                    <div className="col">
                                        <span>Chrono : {invoice.chrono}</span><br />
                                        <span>Prix Total : {invoice.amount}€</span><br />
                                        <span>Date : {new Date(invoice.sentAt).toLocaleString()}</span><br />
                                        <span>Client : {invoice.client?.firstName} {invoice.client?.lastName}</span><br />
                                    </div>
                                    <div className="col">
                                        Commande :
                                            {invoice?.orders.map((e) =>
                                        <ul key={e.id}>
                                            <li>Id : <b>{e.id}</b> {" | " + e.label + " | " + e.quantity + " x " + e.price + "€ = " + e.totalAmount}</li>
                                        </ul>)}
                                        <br />
                                    </div>
                                </div>
                                <div className="row">
                                    <button className="btn btn-secondary" onClick={() => setChange(!change)}>{!change ? "Modifier" : "Valider"}</button>
                                    <button className="btn btn-primary" onClick={() => handleDelete(invoice.id)}>Supprimer</button>
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