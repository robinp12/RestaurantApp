import React, { useContext, useEffect, useState } from 'react';
import Header from '../Components/Header';
import Loader from '../Components/Loader';
import { Menu } from '../Components/Menu';
import { CartContext } from '../Context/CartContext';
import { LangContext } from '../Context/LangContext';
import categoriesAPI from '../Services/categoriesAPI';
import productsAPI from '../Services/productsAPI';


const MenuPage = () => {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const { lang } = useContext(LangContext);
    const { cartLocal, setCartLocal } = useContext(CartContext);

    const [load, setLoad] = useState(true);

    const listCart = function () {
        var cartCopy = [];
        for (let i in cartLocal) {
            let item = cartLocal[i];
            let itemCopy = {};
            for (let p in item) {
                itemCopy[p] = item[p];
            }
            itemCopy.totalAmount = +Number(item.price * item.quantity).toFixed(2);
            cartCopy.push(itemCopy)
        }
        return cartCopy;
    }
    // Add to cart
    const addItemToCart = function (product, name, price, quantity) {

        for (var item in cartLocal) {
            if (cartLocal[item].product === product) {
                if (cartLocal[item].quantity < 10) cartLocal[item].quantity++;
                return;
            }
        }
        var item = { product, name, price, quantity };
        cartLocal.push(item);
    }

    const fetchCatProd = async () => {
        try {
            const prod = await productsAPI.getAllProducts();
            const cat = await categoriesAPI.getAllCategories();
            setProducts(prod);
            setCategories(cat);
            setLoad(false)
        } catch (error) {
            console.log(error.response);
        }
    }

    useEffect(() => {
        fetchCatProd();
    }, [])

    return (
        <>
            <Header title={lang.theMenu} bool={false} />
            {load &&
                <Loader />
                ||
                <Menu products={products} categories={categories} listCart={listCart} addItemToCart={addItemToCart} />
            }
        </>
    );
}

export default MenuPage;