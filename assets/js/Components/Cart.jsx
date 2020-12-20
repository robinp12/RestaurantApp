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
            {cart.map((e, index) =>
                <div key={e.product} className="row">
                    <div className="col">
                        <span className="align-middle">{e.name}</span>
                    </div>
                    <div className="col-3 float-right">
                        <Field name={e.product} type="number" value={e.quantity} placeholder={e.quantity} onChange={handleChange}
                        />
                    </div>
                    <div className="col">
                        <span className="align-middle">{e.totalAmount}€</span>
                    </div>
                    <div className="col">
                        <button onClick={() => deleteItem(e.product)} className='btn btn-primary btn-sm float-right'>x</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Cart;