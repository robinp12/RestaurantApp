import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import PopupInfo from './PopupInfo';
import { Tab, Tabs } from 'react-bootstrap';

const infoIcon = <FontAwesomeIcon icon={faInfoCircle} pull="right" className="infoIcon align-middle" fixedWidth />;

const Menu = ({ products, categories }) => {

    return (
        <>
            <div className="card-text">
                <div className="row">
                    {categories.map((cat, index) =>
                        <div key={index} className={"col-" + (index == 2 ? "12" : "6")}>
                            <h4 className="display-5 my-3" id={cat.label}>{cat.label}</h4>
                            <ul className="list-group">
                                {products.map((prod, index) =>
                                    cat.id == prod.category.id &&
                                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                        <span> {prod.label} <PopupInfo info={prod.description}>{infoIcon}</PopupInfo></span>
                                        <span className="lead">{prod.price}€</span>
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </>);
}
let sac = new Set();
let cle;

const MenuOrder = ({ products, categories, setCart, cart }) => {
    const [key, setKey] = useState(cle);
    cle = key;

    // Add to cart
    const addItemToCart = function (name, price, count) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart[item].count++;
                return;
            }
        }
        var item = { name, price, count };

        cart.push(item);
        listCart()
    }
    const listCart = function () {
        var cartCopy = [];
        for (let i in cart) {

            let item = cart[i];
            let itemCopy = {};
            for (let p in item) {

                itemCopy[p] = item[p];

            }
            itemCopy.total = Number(item.price * item.count).toFixed(2);
            cartCopy.push(itemCopy)
        }
        return cartCopy;
    }

    return (
        <>
            <Tabs id="controlled-tab" activeKey={key} onSelect={(k) => setKey(k)}>
                {categories.map((cat, index) =>
                    <Tab key={index} eventKey={cat.label} title={cat.label}>
                        <div className="row">
                            <div className="col">
                                <ul className={"list-group"}>
                                    {products.map((prod, index) =>
                                        cat.id == prod.category.id &&
                                        <li key={index} onClick={() => {
                                            addItemToCart(prod.label, prod.price, 1)
                                            setCart(listCart);

                                        }} className={"list-group-item d-flex justify-content-between align-items-center "
                                            + (sac.has(prod.label) ? "text-muted" : "")
                                        }>
                                            <span> {prod.label} <PopupInfo info={prod.description}>{infoIcon}</PopupInfo></span>
                                            <span className="lead">{prod.price}€</span>
                                        </li>
                                    )}
                                </ul>
                            </div>
                            <div className="col">

                            </div>
                        </div>
                    </Tab>
                )}
            </Tabs>
        </>
    )
}

export { Menu, MenuOrder };