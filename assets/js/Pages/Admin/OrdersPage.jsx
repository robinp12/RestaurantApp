import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import ordersAPI from '../../Services/ordersAPI';

const OrdersPage = ({ match, history }) => {

    const { id } = match.params

    const [orders, setOrders] = useState([]);
    const [change, setChange] = useState(false);

    const fetchAllOrders = async () => {
        try {
            const data = await ordersAPI.getAllOrders();
            setOrders(data);
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
    const zeroPad = (num) => '#' + num;

    return (
        <>
            <div className="row">
                <div className="col">
                    <table className="table table-responsive-md table-hover ">
                        <thead className="thead-dark">
                            <tr>
                                <th className="text-center"><em className="fa fa-cog"></em></th>
                                <th className="text-center hidden-xs">ID</th>
                                <th className="text-center">Produit</th>
                                <th className="text-center">Client</th>
                                <th className="text-center">Montant total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => <tr key={order.id} onClick={() => history.replace("/commandes/" + order.id)}>
                                <td align="center">
                                    <a className="btn btn-secondary"><em className="fa fa-pencil"></em></a>
                                    <a className="btn btn-primary" onClick={() => handleDelete(order.id)}><em className="fa fa-trash"></em></a>
                                </td>
                                <th scope="row" className="text-center align-middle">{zeroPad(order.id)}</th>
                                <td className="text-center align-middle">{order.label} </td>
                                <td className="text-center align-middle">{order.customer_email} </td>
                                <td className="text-center align-middle">{order.totalAmount}€</td>
                            </tr>)}

                        </tbody>
                    </table>
                </div>
                <div className="col">
                    {orders.map(order =>
                        order.id == id &&
                        <div key={order.id}>
                            <h2>Commande <b>{order.id}</b></h2>
                            <div className="container form">
                                <div className="row justify-content-center">
                                    <div className="col">
                                        <span>Produit : {order.label}</span><br />
                                        <span>Quantité: {order.quantity} x {order.price}€</span><br />
                                        <span>Montant total: {order.totalAmount}€</span><br />
                                        <span>Client: {order.customer_email}</span><br />
                                    </div>
                                    <div className="col">
                                        {/* <span>Client : {order.customer.firstName} {order.customer.lastName}</span><br /> */}
                                    </div>
                                </div>
                                <div className="row">
                                    <button className="btn btn-secondary" onClick={() => setChange(!change)}>{!change ? "Modifier" : "Valider"}</button>
                                    <button className="btn btn-primary" onClick={() => handleDelete(order.id)}>Supprimer</button>
                                </div>
                            </div>
                        </div >
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