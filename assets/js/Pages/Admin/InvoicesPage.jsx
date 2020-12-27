import React, { useEffect, useState } from 'react';
import Pagination from '../../Components/Pagination';
import invoicesAPI from "../../Services/invoicesAPI";

const InvoicesPage = ({ match, history }) => {

    const { id } = match.params

    const [invoices, setInvoices] = useState([]);
    const [change, setChange] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    let invoice_id = id;

    const fetchAllInvoices = async () => {

        try {
            const data = await invoicesAPI.getAllInvoices();
            setInvoices(data);
            history.replace("/factures/" + data[0]?.id)
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

    const handleChangePage = (page) => {
        setCurrentPage(page)
    }
    const itemsPerPage = 10;
    const paginatedInvoices = Pagination.getData(invoices, currentPage, itemsPerPage)

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
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedInvoices.map(invoice => <tr key={invoice.id}
                                onClick={() => history.replace("/factures/" + invoice.id)}
                            >
                                <th scope="row" className="text-center align-middle">{zeroPad(invoice.chrono)}</th>
                                <td className="text-center align-middle">{invoice.status} </td>
                                <td className="text-center align-middle">{new Date(invoice.sentAt).toLocaleString()} </td>
                                <td className="text-center align-middle">{new Date(invoice?.timeToReceive).toLocaleString()} </td>
                                <td className="text-center align-middle">{invoice.amount}€</td>
                            </tr>)}

                        </tbody>
                    </table>
                    {itemsPerPage < invoices.length && <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={invoices.length} onPageChanged={handleChangePage} />}
                </div>
                <div className="col">
                    {invoices.map(invoice =>
                        invoice.id == invoice_id &&
                        <div key={invoice.chrono} className="card mb-3">
                            <h3 className="card-header">
                                <span>Facture <b>{invoice.id}</b></span>
                            </h3>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-12 col-md-6">
                                        <span>Chrono : {invoice.chrono}</span><br />
                                        <span>Date : {new Date(invoice.sentAt).toLocaleString()}</span><br />
                                        <span>Client : {invoice.client?.firstName} {invoice.client?.lastName}</span><br />
                                    </div>
                                    <div className="col-sm-12 col-md-6">
                                        <div className="card mb-3" >
                                            <ul className="list-group list-group-flush">
                                                {invoice?.orders.map((e) =>
                                                    <li key={e.id} className="list-group-item">{e.quantity + " x  " + e.label + " à " + e.price + "€"}</li>
                                                )}
                                                <li className="list-group-item text-center"><b> Prix Total : {invoice.totalAmount}€ </b></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="row justify-content-between">
                                    <button className="btn btn-secondary" onClick={() => setChange(!change)}>{!change ? "Modifier" : "Valider"}</button>
                                    <button className="btn btn-primary" onClick={() => handleDelete(invoice.id)}>Supprimer</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default InvoicesPage;