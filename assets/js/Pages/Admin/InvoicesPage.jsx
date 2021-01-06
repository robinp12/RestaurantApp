import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import Field from '../../Components/Form/Input/Field';
import Select from '../../Components/Form/Input/Select';
import Loader from '../../Components/Loader';
import Pagination from '../../Components/Pagination';
import invoicesAPI from "../../Services/invoicesAPI";

const InvoicesPage = ({ match, history }) => {

    const { id } = match.params

    const [invoices, setInvoices] = useState([]);
    const [search, setSearch] = useState("");

    const [change, setChange] = useState(false);
    const [refresh, setRefresh] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [load, setLoad] = useState(true);
    const itemsPerPage = 10;

    const paddingNumber = (num) => '#' + String(num).padStart(5, '0');

    const fetchAllInvoices = async () => {
        try {
            const data = await invoicesAPI.getAllInvoices();
            setInvoices(data);
            if (!id) history.replace("/factures/" + data[0]?.id)
            setLoad(false);
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
                return "En attente";
        }
    }
    const filtered = invoices.filter(c =>
        c.client?.email.toLowerCase().includes(search.toLowerCase()) ||
        c.client?.firstName.toLowerCase().includes(search.toLowerCase()) ||
        c.client?.lastName.toLowerCase().includes(search.toLowerCase()) ||
        status(c.status).toLowerCase().includes(search.toLowerCase())
    );
    const paginatedInvoices = Pagination.getData(filtered, currentPage, itemsPerPage)
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
            {load &&
                <Loader />
                ||
                <div className="row">
                    <div className="col-sm-12 col-md-4">
                        <Field placeholder={"Chercher une facture ..."} onChange={handleSearch} value={search} className="form-control" />

                        <table className="table table-responsive-md table-hover ">
                            <thead className="thead-dark">
                                <tr>
                                    <th className=" hidden-xs">ID</th>
                                    <th className="">Status</th>
                                    <th className="text-center">Table</th>
                                    <th className="text-center">Montant total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedInvoices.map(invoice => <tr key={invoice.id} className={invoice.id == id ? "actif" : ""}
                                    onClick={() => history.replace("/factures/" + invoice.id)}
                                >
                                    <th scope="row" className=" align-middle">{paddingNumber(invoice.id)}</th>
                                    <td className="align-middle">{(invoice?.status == "SENT") ? <i className="text-muted">{status(invoice?.status)}</i> : (invoice?.status == "CANCELLED") ? <i className="text-primary font-weight-bold">{status(invoice?.status)}</i> : <i className="text-success font-weight-bold">{status(invoice?.status)}</i>}</td>
                                    <td className="text-center align-middle">{invoice.invoiceTable || "A emporter"} </td>
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
                                            <span>{invoice.invoiceTable && <b>Sur place</b> || <b>À emporter</b>}</span><br />
                                            <span>{invoice.invoiceTable &&
                                                <>Table : <b>{invoice.invoiceTable}</b></>
                                                ||
                                                <><span>Client : <Link to={`/clients/${invoice.client?.id}`}> {invoice.client?.firstName} {invoice.client?.lastName}</Link></span></>
                                            }</span><br />

                                            <span>Emis le {new Date(invoice.sentAt).toLocaleString()}</span><br /><br />

                                            {change &&
                                                <Select defaut={status(invoice.status)} label={"Status :"} name="status" onChange={(e) => handleChangeStatus(invoice.id, e.currentTarget.value)}>
                                                    {statusList.map((statu, index) => <option value={statu} key={index}>{status(statu)}</option>)}
                                                </Select>
                                                ||
                                                <>
                                                    <span>Status :
                                                    {invoice.status == "SENT" ?
                                                            <i className=""> {status(invoice?.status)}
                                                            </i>
                                                            :
                                                            (invoice?.status == "CANCELLED") ? <i className="text-primary font-weight-bold"> {status(invoice?.status)}</i> :
                                                                <i className="font-weight-bold text-success"> {status(invoice?.status)}
                                                                </i >}
                                                    </span>
                                                    <br />
                                                </>}
                                            <span>Réception de la commande : <br />
                                                <b>{new Date(invoice.timeToReceive).toLocaleString()}</b>
                                            </span><br />
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
                                        <div className="col">
                                            {invoice.status !== "PAID" &&
                                                <button className="btn btn-primary" onClick={() => handleChangeStatus(invoice.id, "PAID")}>Payer</button>
                                                ||
                                                <button className="btn btn-link" disabled>{status(invoice.status)}</button>
                                            }
                                        </div>
                                        <div className="col text-right">
                                            {!change ?
                                                <button className="btn btn-secondary" onClick={() => setChange(!change)}>{"Modifier"}</button>
                                                :
                                                <button className="btn btn-secondary" onClick={() => { setChange(!change) }}>{"Valider"}</button>
                                            }

                                        </div>
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