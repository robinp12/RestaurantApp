import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import Loader from '../../Components/Loader';
import Pagination from '../../Components/Pagination';
import ordersAPI from '../../Services/ordersAPI';
import useLocalStorage from '../../Services/useLocalStorage';


const OrdersPage = ({ match, history }) => {

    const { id } = match.params

    const [orders, setOrders] = useState([]);
    const [change, setChange] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [show, setShow] = useLocalStorage("show-orders", false);
    const [load, setLoad] = useState(true);

    const paddingNumber = (num) => '#' + num;

    const fetchAllOrders = async () => {
        try {
            const data = await ordersAPI.getAllOrders();
            setOrders(data);
            if (!id) history.replace("/commandes/" + data[0]?.id)
            setLoad(false);
        } catch (error) {
            console.log(error.response);
        }
    }
    const handleDelete = async (id) => {
        const originOrders = [...orders];
        setOrders(orders.filter(order => order.id !== id));
        try {
            let rep = await ordersAPI.deleteOrders(id)
            toast("Commande n°" + id + " supprimé");
            history.replace("/commandes/" + orders[0].id)

        } catch (error) {
            console.log(error)
            setOrders(originOrders);
        }
    }

    const handleChangePage = (page) => {
        setCurrentPage(page)
    }
    const itemsPerPage = 20;
    const paginated = Pagination.getData(orders, currentPage, itemsPerPage)


    useEffect(() => {
        fetchAllOrders();
    }, [])

    return (
        <>
            {load &&
                <Loader />
                ||
                <div className="row">
                    <div className="col">
                        <h4>
                            {show ? "Masquer la liste" : "Afficher la liste des commandes"}
                            <button className="btn btn-dark ml-2" onClick={() => setShow(!show)}>
                                {show ?
                                    <i className="fa fa-caret-down" aria-hidden="true"></i>
                                    :
                                    <i className="fa fa-caret-right" aria-hidden="true"></i>
                                }
                            </button>
                        </h4>
                        {show &&
                            <>
                                <table className="table table-responsive-md table-hover ">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th className="text-center hidden-xs">ID</th>
                                            <th className="text-center">Produit</th>
                                            <th className="text-center">Quantité</th>
                                            <th className="text-center">Table</th>
                                            <th className="text-center">Montant total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginated.map(order => <tr className={(order.id == id ? "actif" : ((order.id <= id) && (order.id > id - 5)) ? "actif2" : "")} key={order.id} onClick={() => history.replace("/commandes/" + order.id)}>
                                            <th scope="row" className="text-center align-middle {">{paddingNumber(order.id)}</th>
                                            <td className="text-center align-middle">{order.label} </td>
                                            <td className="text-center align-middle">{order.quantity} </td>
                                            <td className="text-center align-middle">{order.orderTable || <>À emporter</>} </td>
                                            <td className="text-center align-middle">{order.totalAmount}€</td>
                                        </tr>)}

                                    </tbody>
                                </table>
                                {itemsPerPage < orders.length && <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={orders.length} onPageChanged={handleChangePage} />}
                            </>
                        }
                    </div>
                    <div className={"col-sm-12 col-md-" + (show ? "6" : "12")} >
                        {/* PROBLEME D'HEURE COMMANDE /RESERVATION
                        PROBLEME D'HEURE COMMANDE /RESERVATION
                        PROBLEME D'HEURE COMMANDE /RESERVATION
                        PROBLEME D'HEURE COMMANDE /RESERVATION
                        PROBLEME D'HEURE COMMANDE /RESERVATION */}
                        {orders.map(order =>
                            ((order.id <= id) && (order.id > id - 5)) &&
                            <div key={order.id} className="card mb-3">
                                <h3 className="card-header">
                                    <span>Commande <b>{order.id}</b></span>
                                </h3>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            <span> Produit : <b>{order.label}</b></span><br />
                                            <span> Quantité : <b>{order.quantity}</b></span><br />
                                            <span> Prix : {order.price}€</span><br />
                                            <span> Facture : <Link to={`/factures/${order.invoice.id}`}>{order.invoice.id}</Link></span><br />
                                            {typeof (order.invoice.client) !== "undefined" && <>
                                                <span> Client : <Link to={`/clients/${order.invoice.client.id}`}>{order.invoice.client.firstName} {order.invoice.client.lastName}</Link></span><br />
                                            </> || <></>}
                                            {order.orderTable && <><span> Table : <b>{order.orderTable}</b></span><br /></> || <></>}
                                        </div>
                                        <div className="col text-right">
                                            {order.orderTable && <b className="">Sur place</b> || <b className="">À emporter</b>}<br />
                                        </div>
                                    </div>
                                    <div className="row ">
                                        <div className="col text-right">
                                            <span className="lead"> <b>Prix total : {order.totalAmount}€</b></span>

                                        </div>

                                    </div>
                                    <button className="btn btn-primary" onClick={() => handleDelete(order.id)}>Supprimer</button>
                                    <button className="btn btn-secondary float-right" onClick={() => setChange(!change)}>{!change ? "Modifier" : "Valider"}</button>
                                </div>
                            </div>

                        )}
                    </div>
                </div>}

        </>
    );
}

export default OrdersPage;