import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect } from 'react';
import PopupInfo from './PopupInfo';
import productsAPI from '../Services/productsAPI';
import categoriesAPI from '../Services/categoriesAPI';
import { useState } from 'react';

const infoIcon = <FontAwesomeIcon icon={faInfoCircle} pull="right" className="infoIcon align-middle" fixedWidth />;

const Menu = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const fetchCatProd = async () => {
        try {
            const prod = await productsAPI.getAllProducts();
            const cat = await categoriesAPI.getAllCategories();
            setProducts(prod);
            setCategories(cat);
        } catch (error) {
            console.log(error.response);
        }
    }
    useEffect(() => {
        fetchCatProd();
    }, [])

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

export default Menu;