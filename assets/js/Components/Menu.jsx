import React, { useContext, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { CartContext } from '../Context/CartContext';
import PopupInfo from './PopupInfo';


const Menu = ({ products, categories, listCart, addItemToCart }) => {

    const { cart, setCart } = useContext(CartContext);

    const actif = (product) => {
        for (var i in cart) {
            if (cart[i].product == product) {
                return cart[i].quantity
            }
        }
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

    return (
        <>
            <div className="card-text">
                <div className="row">
                    {categories.map((cat, index) =>
                        <div key={index} className={"col-sm-12 col-md-" + (index == 2 ? "12" : "6")}>
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

                                                        <div className="justify-content-between align-items-center align-middle d-flex" onClick={() => {
                                                            addItemToCart(prod.id, prod.label, prod.price, 1); setCart(listCart);
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
let cle;

// const MenuOrder = ({ products, categories, listCart, addItemToCart }) => {

//     const [key, setKey] = useState(cle);
//     cle = key;

//     const { cart, setCart } = useContext(CartContext);

//     const actif = (product) => {
//         for (var i in cart) {
//             if (cart[i].product == product) {
//                 return cart[i].quantity
//             }
//         }
//     }
//     const deleteItem = (product) => {
//         for (var item in cart) {
//             if (cart[item].product === product) {
//                 cart.splice(item, 1);
//                 break;
//             }
//         }
//         setCart([...cart])
//     }
//     return (
//         <>
//             <Tabs id="controlled-tab" activeKey={key} onSelect={(k) => setKey(k)}>
//                 {categories.map((cat, index) =>
//                     <Tab key={index} eventKey={cat.label} title={cat.label}>
//                         <div className="row">
//                             <div className="col">
//                                 <ul className={"list-group"}>
//                                     {products.map((prod, index) =>
//                                         cat.id == prod.category.id &&
//                                         <div className="row align-items-center" key={index}>
//                                             <div className="col">
//                                                 <li className={"list-group-item " + (actif(prod.id) && "selected" || "")}>
//                                                     <div className="row">
//                                                         <div className="col">
//                                                             <div className="justify-content-between align-items-center align-middle d-flex" onClick={() => {
//                                                                 addItemToCart(prod.id, prod.label, prod.price, 1); setCart(listCart);
//                                                             }}>
//                                                                 <span className="justify-content-between mr-4">
//                                                                     {prod.label}
//                                                                     <span className="px-1"></span>
//                                                                     {prod.description && <PopupInfo info={prod.description} />
//                                                                     }
//                                                                 </span>
//                                                                 <span className="lead ml-3">
//                                                                     <small className={"mr-2"}> {actif(prod.id) && actif(prod.id) + "x"}</small>

//                                                                     {prod.price}€</span>
//                                                             </div>
//                                                         </div>
//                                                         {actif(prod.id) &&
//                                                             <div className="float-right ">
//                                                                 <a className="badge badge-primary float-right" onClick={() => deleteItem(prod.id)}>
//                                                                     <em className="fa fa-times fa-sm"></em>
//                                                                 </a>
//                                                             </div>
//                                                         }
//                                                     </div>
//                                                 </li>
//                                             </div>
//                                         </div>
//                                     )}
//                                 </ul>
//                             </div>
//                         </div>
//                     </Tab>
//                 )}
//             </Tabs>
//         </>
//     )
// }

export { Menu };

