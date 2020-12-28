import React, { useContext, useEffect, useState } from 'react';
import Header from '../Components/Header';
import Loader from '../Components/Loader';
import { Menu } from '../Components/Menu';
import categoriesAPI from '../Services/categoriesAPI';
import { LangContext } from '../Context/LangContext';
import productsAPI from '../Services/productsAPI';
import { CartContext } from '../Context/CartContext';


const MenuPage = () => {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const { lang } = useContext(LangContext);
    const { cart, setCart } = useContext(CartContext);


    const listCart = function () {
        var cartCopy = [];
        for (let i in cart) {

            let item = cart[i];
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

        for (var item in cart) {
            if (cart[item].product === product) {
                cart[item].quantity++;
                return;
            }
        }
        var item = { product, name, price, quantity };
        cart.push(item);
    }

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
            <Header title={lang.theMenu} bool={false} />
            {!products.length &&
                <Loader />
                ||
                <Menu products={products} categories={categories} listCart={listCart} addItemToCart={addItemToCart} />
            }
        </>
    );
}

export default MenuPage;