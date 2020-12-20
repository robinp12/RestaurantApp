import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../Context/CartContext';
import Field from './Form/Input/Field';

const Cart = () => {
    const { cart, setCart } = useContext(CartContext);
    const [refresh, setRefresh] = useState(true);

    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setRefresh(!refresh)
        for (var item in cart) {
            console.log(+Number(cart[item].price * cart[item].quantity).toFixed(2));

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

    const deleteItem = (product) => {
        for (var item in cart) {
            if (cart[item].product === product) {
                cart.splice(item, 1);
                break;
            }
        }
        setCart([...cart])
    }
    useEffect(() => { }, [refresh])

    return (
        <>
            <div className="row">
                <div className="col">
                    <table className="table text-center align-middle">
                        <tbody>
                            {cart.map((e, index) =>
                                <tr className="text-center align-middle" key={e.product}>
                                    <td className="text-center align-middle">{e.name}</td>
                                    <td className="text-center align-middle">
                                        {e.totalAmount}€
                                    </td>
                                    <td className="text-center align-middle">
                                        <input
                                            className={"form-control"}
                                            value={e.quantity}
                                            name={e.product}
                                            onChange={handleChange}
                                            type={"number"}
                                            placeholder={e.quantity}
                                        />
                                    </td>
                                    <td className="text-center align-middle">
                                        <a className="badge badge-primary" onClick={() => deleteItem(e.product)}>
                                            <em className="fa fa-times"></em>
                                        </a>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Cart;