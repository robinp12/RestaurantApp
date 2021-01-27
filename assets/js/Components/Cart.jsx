import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../Context/CartContext';
import { LangContext } from '../Context/LangContext';

const Cart = ({ pay }) => {
    const { cartLocal, setCartLocal } = useContext(CartContext);

    const { lang } = useContext(LangContext);

    const [refresh, setRefresh] = useState(true);

    const totalCart = function () {
        var totalCart = 0;
        for (var item in cartLocal) {
            totalCart += cartLocal[item].price * cartLocal[item].quantity;
        }
        return Number(totalCart.toFixed(2));
    }

    const deleteItem = (product) => {

        for (var item in cartLocal) {
            if (cartLocal[item].product === product) {
                cartLocal.splice(item, 1);
                break;
            }
        }
        setCartLocal([...cartLocal]);
    }

    const addItemToCart = function (product, name, price, quantity) {
        setRefresh(!refresh)

        for (var item in cartLocal) {
            if (cartLocal[item].product === product) {
                if (cartLocal[item].quantity < 10) cartLocal[item].quantity++;
                cartLocal[item].totalAmount = +Number(cartLocal[item].price * cartLocal[item].quantity).toFixed(2);
                return;
            }
        }
        price = parseFloat(price)
        var item = { product, name, price, quantity };
        cartLocal.push(item);
    }

    const removeItemFromCart = function (product, name, price, quantity) {
        setRefresh(!refresh)

        for (var item in cartLocal) {
            if (cartLocal[item].product === product) {
                cartLocal[item].quantity--;
                if (cartLocal[item].quantity == 0) {
                    deleteItem(cartLocal[item].product)
                    break;
                }
                else {
                    cartLocal[item].totalAmount = +Number(cartLocal[item].price * cartLocal[item].quantity).toFixed(2);
                    break;
                }
            }
        }
    }

    useEffect(() => { }, [refresh])

    return (
        <>
            <div className="row">
                <div className="col">
                    <div className="row outside">
                        <div className="col insidecart">
                            <table className="table table-responsive-md table-hover">
                                <thead>
                                    <tr>
                                        <th className="text-center">{lang.product}</th>
                                        <th className="text-center">#</th>
                                        <th className="text-center">{lang.price}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartLocal.map((e) =>
                                        <tr key={e.product}>
                                            <td className="text-center">{e.name}</td>
                                            {pay && <td className=" text-center">{e.quantity}</td> ||
                                                <td>

                                                    <ul className="pagination pagination-sm">
                                                        <li className="page-item" onClick={() => removeItemFromCart(e.product, e.name, e.totalAmount, e.quantity)}>
                                                            <a className="page-link">&laquo;</a>
                                                        </li>
                                                        <li className="page-item disabled">
                                                            <a className="page-link">{e.quantity}</a>
                                                        </li>
                                                        {e.quantity < 10 &&
                                                            <li className="page-item" onClick={() => addItemToCart(e.product, e.name, e.price, e.quantity)}>
                                                                <a className="page-link">&raquo;</a>
                                                            </li>
                                                        }
                                                    </ul>

                                                </td>
                                            }
                                            <td className=" text-center">{e.totalAmount} €</td>

                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col mx-1 ">
                            <strong className="float-left lead">Total: </strong>
                            <strong className="float-right lead">{totalCart()} €</strong>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

export default Cart;