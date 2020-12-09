import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import { Menu } from '../Components/Menu';
import categoriesAPI from '../Services/categoriesAPI';
import productsAPI from '../Services/productsAPI';

const MenuPage = ({ lang }) => {

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
            <h2 className="card-title"><Header title={lang.theMenu} /></h2>
            <Menu products={products} categories={categories} />
        </>
    );
}

export default MenuPage;