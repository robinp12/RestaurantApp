import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Pagination from '../../Components/Pagination';
import ordersAPI from '../../Services/ordersAPI';
import useLocalStorage from '../../Services/useLocalStorage';
import Loader from '../../Components/Loader';


const OrdersPage = ({ match, history }) => {

    const { id } = match.params

    const [orders, setOrders] = useState([]);
    const [change, setChange] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [show, setShow] = useLocalStorage("show-orders", false);

    const paddingNumber = (num) => '#' + num;

    const fetchAllOrders = async () => {
        try {
            const data = await ordersAPI.getAllOrders();
            setOrders(data);
            if (!id) history.replace("/commandes/" + data[0]?.id)
        } catch (error) {
            console.log(error.response);
        }
    }
    const handleDelete = async (id) => {
        const originOrders = [...orders];
        setOrders(orders.filter(user => user.id !== id));
        try {
            let rep = await ordersAPI.deleteOrders(id)

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

            {!paginated.length &&
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
                                            <th className="text-center">Montant total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginated.map(order => <tr className={(order.id == id ? "actif" : ((order.id <= id) && (order.id > id - 5)) ? "actif2" : "")} key={order.id} onClick={() => history.replace("/commandes/" + order.id)}>
                                            <th scope="row" className="text-center align-middle {">{paddingNumber(order.id)}</th>
                                            <td className="text-center align-middle">{order.label} </td>
                                            <td className="text-center align-middle">{order.quantity} </td>
                                            <td className="text-center align-middle">{order.totalAmount}€</td>
                                        </tr>)}

                                    </tbody>
                                </table>
                                {itemsPerPage < orders.length && <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={orders.length} onPageChanged={handleChangePage} />}
                            </>
                        }
                    </div>
                    <div className={"col-sm-12 col-md-" + (show ? "6" : "12")} >
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
                                            <span> Mail : {order.customer_email}</span><br />
                                            <span className="float-right lead"> <b>Prix total : {order.totalAmount}€</b></span><br />
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