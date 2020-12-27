import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Pagination from '../../Components/Pagination';
import ordersAPI from '../../Services/ordersAPI';

const OrdersPage = ({ match, history }) => {

    const { id } = match.params

    const [orders, setOrders] = useState([]);
    const [change, setChange] = useState(false);
    const [last, setLast] = useState();
    const [currentPage, setCurrentPage] = useState(1);

    const fetchAllOrders = async () => {
        try {
            const data = await ordersAPI.getAllOrders();
            setOrders(data);
            history.replace("/commandes/" + data[0]?.id)
        } catch (error) {
            console.log(error.response);
        }
    }

    useEffect(() => {
        fetchAllOrders();
    }, [])

    const handleDelete = async (id) => {
        const originOrders = [...orders];
        setOrders(orders.filter(user => user.id !== id));
        try {
            let rep = await ordersAPI.deleteOrders(id)
            console.log(rep)

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

    const zeroPad = (num) => '#' + num;

    return (
        <>
            <div className="row">
                <div className="col">
                    <table className="table table-responsive-md table-hover ">
                        <thead className="thead-dark">
                            <tr>
                                <th className="text-center hidden-xs">ID</th>
                                <th className="text-center">Produit</th>
                                <th className="text-center">Client</th>
                                <th className="text-center">Montant total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.map(order => <tr key={order.id} onClick={() => history.replace("/commandes/" + order.id)}>
                                <th scope="row" className="text-center align-middle">{zeroPad(order.id)}</th>
                                <td className="text-center align-middle">{order.label} </td>
                                <td className="text-center align-middle">{order.customer_email} </td>
                                <td className="text-center align-middle">{order.totalAmount}€</td>
                            </tr>)}

                        </tbody>
                    </table>
                    {itemsPerPage < orders.length && <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={orders.length} onPageChanged={handleChangePage} />}

                </div>
                <div className="col">
                    {orders.map(order =>
                        ((order.id <= id) && (order.id > id - 5)) &&
                        <div key={order.id} className="card mb-3">
                            <h3 className="card-header">
                                <span>Commande <b>{order.id}</b></span>
                            </h3>
                            <div className="card-body">
                                <span> Produit : <b>{order.label}</b></span><br />
                                <span> Quantité : <b>{order.quantity}</b></span><br />
                                <span> Prix : {order.price}€</span><br />
                                <span> Mail : {order.customer_email}</span><br />
                                <span className="float-right lead"> <b>Prix total : {order.totalAmount}€</b></span><br />
                                <button className="btn btn-secondary" onClick={() => setChange(!change)}>{!change ? "Modifier" : "Valider"}</button>
                                <button className="btn btn-primary" onClick={() => handleDelete(order.id)}>Supprimer</button>
                            </div>
                        </div>

                    )}
                </div>
            </div>
            {/* {orders.map((order, index) =>
                <Accordion defaultActiveKey={3} key={index}>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey={3}>
                            Commande <b>{order.id}</b>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={index}>
                            <Card.Body>{order.label}</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            )} */}
        </>
    );
}

export default OrdersPage;