import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../Context/CartContext';
import { LangContext } from '../Context/LangContext';

const Cart = ({ pay }) => {
    const { cart, setCart } = useContext(CartContext);
    const { lang } = useContext(LangContext);

    const [refresh, setRefresh] = useState(true);

    const totalCart = function () {
        var totalCart = 0;
        for (var item in cart) {
            totalCart += cart[item].price * cart[item].quantity;
        }
        return Number(totalCart.toFixed(2));
    }

    const deleteItem = (product) => {
        for (var item in cart) {
            if (cart[item].product === product) {
                cart.splice(item, 1);
                break;
            }
        }
        setCart([...cart])
    }

    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setRefresh(!refresh)
        for (var item in cart) {
            if (cart[item].product == name) {
                cart[item].quantity = +value
                if (cart[item].quantity == 0) {
                    deleteItem(cart[item].product)
                    break;
                }
                else {
                    cart[item].totalAmount = +Number(cart[item].price * cart[item].quantity).toFixed(2);
                    break;
                }
            }
        }
    };

    useEffect(() => { }, [refresh])

    return (
        <>
            <div className="row">
                <div className="col">
                    <div className="row">
                        <div className="col">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th className="text-center">{lang.product}</th>
                                        <th className="text-center">#</th>
                                        <th className="text-center">{lang.price}</th>
                                        <th className="text-center"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map((e) =>
                                        <tr key={e.product}>
                                            <td className="text-center">{e.name}</td>
                                            {pay && <td className=" text-center">{e.quantity}</td> ||
                                                <td>
                                                    <input
                                                        className={"form-control"}
                                                        value={e.quantity}
                                                        name={e.product}
                                                        onChange={handleChange}
                                                        type={"number"}
                                                        placeholder={e.quantity}
                                                    />
                                                </td>
                                            }
                                            <td className=" text-center">{e.totalAmount} €</td>
                                            <td className=" text-center">
                                                {!pay &&
                                                    <a className="badge badge-primary" onClick={() => deleteItem(e.product)}>
                                                        <em className="fa fa-times fa-sm"></em>
                                                    </a>}
                                            </td>
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