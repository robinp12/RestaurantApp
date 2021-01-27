import React, { useContext } from 'react';
import { CartContext } from '../Context/CartContext';
import PopupInfo from './PopupInfo';


const Menu = ({ products, categories, listCart, addItemToCart }) => {

    const { cartLocal, setCartLocal } = useContext(CartContext);

    const actif = (product) => {
        for (var i in cartLocal) {
            if (cartLocal[i].product == product) {
                return cartLocal[i].quantity
            }
        }
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

    return (
        <>
            <div className="card-text">
                <div className="row">
                    {categories.map((cat, index) =>
                        <div key={index} className={"col-sm-12 col-md-" + (index == 2 ? "6" : "6")}>
                            <h4 className="display-5 my-3" id={cat.label}>{cat.label}</h4>
                            <ul className="list-group">
                                {products.map((prod, index) =>
                                    cat.id == prod.category.id &&
                                    <div className="row align-items-center" key={index}>
                                        <div className="col">
                                            <li className={"list-group-item " + (actif(prod.id) && "selected" || "")}
                                            >
                                                <div className="row">
                                                    <div className="col">

                                                        <div className="listeelem justify-content-between align-items-center align-middle d-flex" onClick={() => {
                                                            addItemToCart(prod.id, prod.label, prod.price, 1); setCartLocal(listCart);
                                                        }}>
                                                            <span className="float-left">
                                                                <span>{prod.label}</span>
                                                                <span className="px-1"></span>
                                                                {prod.description && <PopupInfo info={prod.description} />}
                                                            </span>
                                                            <span className="lead">
                                                                <small className={"mr-2"}> {actif(prod.id) && actif(prod.id) + "x"}</small>
                                                                {prod.price}€</span>
                                                        </div>
                                                    </div>
                                                    {actif(prod.id) &&
                                                        <div className="float-right ">
                                                            <a className="badge badge-primary float-right" onClick={() => deleteItem(prod.id)}>
                                                                <em className="fa fa-times fa-sm"></em>
                                                            </a>
                                                        </div>
                                                    }
                                                </div>
                                            </li>
                                        </div>
                                    </div>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </>);
}

export { Menu };

