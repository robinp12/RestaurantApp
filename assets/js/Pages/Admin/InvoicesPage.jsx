import React, { useEffect, useState } from 'react';
import Pagination from '../../Components/Pagination';
import invoicesAPI from "../../Services/invoicesAPI";
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import Select from '../../Components/Form/Input/Select';
import Field from '../../Components/Form/Input/Field';
import Loader from '../../Components/Loader';

const InvoicesPage = ({ match, history }) => {

    const { id } = match.params

    const [invoices, setInvoices] = useState([]);
    const [search, setSearch] = useState("");

    const [change, setChange] = useState(false);
    const [refresh, setRefresh] = useState();
    const [changedStatus, setChangedStatus] = useState({ status: "" });
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;

    const filtered = invoices.filter(c =>
        c.customer_email.toLowerCase().includes(search.toLowerCase()) ||
        c.client.firstName.toLowerCase().includes(search.toLowerCase()) ||
        c.client.lastName.toLowerCase().includes(search.toLowerCase())
    );
    const paginatedInvoices = Pagination.getData(filtered, currentPage, itemsPerPage)

    const paddingNumber = (num) => '#' + String(num).padStart(5, '0');

    const fetchAllInvoices = async () => {
        try {
            const data = await invoicesAPI.getAllInvoices();
            setInvoices(data);
            history.replace("/factures/" + data[0]?.id)
        } catch (error) {
            console.log(error.response);
        }
    }

    const handleChangePage = (page) => {
        setCurrentPage(page)
    }
    const handleChangeStatus = async (invoice, status) => {
        try {
            await invoicesAPI.update(invoice, { status: status });
            toast(`Etat de la facture ${invoice} changé à payé`);
            setRefresh(!refresh)
        } catch (error) {
            console.log(error)
        }
    }
    const handleSearch = ({ currentTarget }) => {
        setSearch(currentTarget.value)
        setCurrentPage(1)
    }

    const status = (status) => {
        switch (status) {
            case "PAID":
                return "Payé";
            case "CANCELLED":
                return "Supprimé";
            default:
                return "Envoyé";
        }
    }
    const [statusList, setStatusList] = useState([
        'PAID',
        'SENT',
        'CANCELLED']
    )

    useEffect(() => {
        fetchAllInvoices();
    }, [])

    return (
        <>
            {!paginatedInvoices.length &&
                <Loader />
                ||
                <div className="row">
                    <div className="col-sm-12 col-md-4">
                        <Field placeholder={"Chercher une facture ..."} onChange={handleSearch} value={search} className="form-control" />

                        <table className="table table-responsive-md table-hover ">
                            <thead className="thead-dark">
                                <tr>
                                    <th className="text-center hidden-xs">ID</th>
                                    <th className="text-center">Status</th>
                                    <th className="text-center">Montant total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedInvoices.map(invoice => <tr key={invoice.id}
                                    onClick={() => history.replace("/factures/" + invoice.id)}
                                >
                                    <th scope="row" className="text-center align-middle">{paddingNumber(invoice.chrono)}</th>
                                    <td className="text-center align-middle">{status(invoice.status)} </td>
                                    <td className="text-center align-middle lead">{invoice.amount}€</td>
                                </tr>)}

                            </tbody>
                        </table>
                        {itemsPerPage < invoices.length && <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={filtered.length} onPageChanged={handleChangePage} />}
                    </div>
                    <div className="col-sm-12 col-md-8">
                        {invoices.map(invoice =>
                            invoice.id == id &&
                            <div key={invoice.chrono} className="card mb-3">
                                <h3 className="card-header">
                                    <span>Facture <b>{invoice.id}</b></span>
                                </h3>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-12 col-md-6">
                                            <span>Client : <Link to={`/clients/${invoice.client?.id}`}> {invoice.client?.firstName} {invoice.client?.lastName}</Link></span><br />
                                            <span>Emis le {new Date(invoice.sentAt).toLocaleString()}</span><br /><br />
                                            {change &&
                                                <Select defaut={status(invoice.status)} label={"Status :"} name="status" onChange={(e) => handleChangeStatus(invoice.id, e.currentTarget.value)}>
                                                    {statusList.map((statu, index) => <option value={statu} key={index}>{status(statu)}</option>)}
                                                </Select>
                                                ||
                                                <><span>Status : <b>{status(invoice.status)}</b></span><br /></>
                                            }
                                            <span>Date de réception de la commande :<br /> <b>{new Date(invoice.timeToReceive).toLocaleString()}</b></span><br />
                                        </div>
                                        <div className="col-sm-12 col-md-6">
                                            <div className="card mb-3" >
                                                <ul className="list-group list-group-flush">
                                                    {invoice?.orders.map((e) =>
                                                        <li key={e.id} className="list-group-item"><Link to={`/commandes/${e.id}`}>{e.quantity + " x  " + e.label + " à " + e.price + "€"}</Link></li>
                                                    )}
                                                    <li className="list-group-item text-center lead"><b> Prix Total : {invoice.amount}€ </b></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row justify-content-between">
                                        {invoice.status !== "PAID" &&
                                            <button className="btn btn-primary" onClick={() => handleChangeStatus(invoice.id, "PAID")}>Payer</button>
                                            ||
                                            <button className="btn btn-link" disabled>{status(invoice.status)}</button>
                                        }
                                        {!change ?
                                            <button className="btn btn-secondary" onClick={() => setChange(!change)}>{"Modifier"}</button>
                                            :
                                            <button className="btn btn-secondary" onClick={() => { setChange(!change) }}>{"Valider"}</button>
                                        }
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>}
        </>
    );
}

export default InvoicesPage;