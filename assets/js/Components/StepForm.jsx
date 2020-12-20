import React, { useContext, useEffect, useRef, useState } from 'react';
import { toast } from "react-toastify";
import { CartContext } from '../Context/CartContext';
import { CustomerContext } from '../Context/CustomerContext';
import { LangContext } from '../Context/LangContext';
import categoriesAPI from '../Services/categoriesAPI';
import SocketClient from '../Services/client';
import customersAPI from '../Services/customersAPI';
import ordersAPI from '../Services/ordersAPI';
import productsAPI from '../Services/productsAPI';
import CustomerForm from './Form/CustomerForm';
import OrderForm from './Form/OrderForm';
import OrderSummary from './Form/OrderSummary';
import PaymentForm from './Form/PaymentForm';
import { MenuOrder } from './Menu';

let now = new Date(new Date().setHours(new Date().getHours() + 1)).toISOString().slice(0, 16);

const StepForm = () => {

    const { lang } = useContext(LangContext);
    const { cart, setCart } = useContext(CartContext);

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const confirmRef = useRef();
    const [away, setAway] = useState(0);
    const [choose, setChoose] = useState(0);
    // const [there, setThere] = useState(0);

    const [customer, setCustomer] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        city: "",
        zipcode: "",
        phoneNumber: "",
    });
    const [errors, setErrors] = useState({
        lastName: "",
        firstName: "",
        email: "",
        address: "",
        zipcode: "",
        city: "",
        phoneNumber: ""
    });
    const [orderInfo, setOrderInfo] = useState({ time: now });

    let [...bag] = cart;

    const formatedOrder = ({ name, price, ...bag }) => {
        bag.customerEmail = customer.email;
        bag.label = name;
        bag.price = price;
        return bag
    }
    const envoi = () => {
        for (let e in bag) {
            handleSubmitOrder(formatedOrder(bag[e]))
        }
    }
    const handleSubmitOrder = async (e) => {
        try {
            const rep = await ordersAPI.add(e);

            toast(e.product + " a été ajouté");
            console.log(rep)
        } catch (error) {
            console.log(error)
            toast("Erreur dans le formulaire !" + "", {
                className: "bg-red-toast",
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        confirmRef.current.setAttribute("disabled", "")
        try {
            const rep = await customersAPI.register(customer);
            confirmRef.current.removeAttribute("disabled")
            toast(customer.firstName + " a été ajouté");
            setErrors("");
            envoi()
            console.log(rep)
            setAway(step => step + 1);

        } catch (error) {
            console.log(error.response)
            toast("Erreur dans le formulaire !" + "", {
                className: "bg-red-toast",
            });


            if (error.response.data.violations) {
                setAway(0)

                const apiErrors = {};
                error.response.data.violations.forEach((violation) => {
                    apiErrors[violation.propertyPath] = violation.message;
                });
                setErrors(apiErrors);
            }
        }
    };

    const fetchCat = async () => {
        try {
            const cat = await categoriesAPI.getAllCategories();
            setCategories(cat);
        } catch (error) {
            console.log(error.response);
        }
    }

    const fetchProd = async () => {
        try {
            const prod = await productsAPI.getAllProducts();
            setProducts(prod);
        } catch (error) {
            console.log(error.response);
        }
    }
    const sendNotif = () => {
        SocketClient.sendToSocket("notifSend", "Nouvelle commande");
    }

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

    useEffect(() => {
        fetchCat();
        fetchProd();
    }, [])

    const ButtonOrder = ({ children, next, back, disabled }) => {
        return (
            <div className="container">
                {children}
                <button className="btn-primary btn float-left mt-4" onClick={(e) => { e.preventDefault(); setAway(step => step - 1) }}>{back}</button>
                <button className="btn-primary btn float-right mt-4" onClick={() => {
                    setAway(step => step + 1);
                }} disabled={disabled}>{next}</button>
            </div>
        )
    }

    const oneTimeClick = (e) => {
        e.preventDefault()

        confirmRef.current.setAttribute("disabled", "")

    }
    function formOrder() {
        if (choose == 1) {

            // switch (there) {
            //   case 1:
            //     return (<>Apres emporter
            //       <button className="btn-primary btn" onClick={() => setThere(step => step - 1)}>{lang.back}</button>
            //     </>);
            //   default:
            //     return (
            //       <>
            //         <button className="btn-primary btn float-left" onClick={() => setChoose(0)}>{lang.back}</button>
            //         <button className="btn-primary btn float-right" onClick={() => setThere(step => step + 1)}>{lang.next}</button>
            //       </>);
            // }
        }
        else if (choose == 2) {

            switch (away) {
                case 1: // Menu choice
                    return (
                        <ButtonOrder back={lang.back} next={lang.next}
                            disabled={!cart.length}
                        >
                            <MenuOrder products={products} categories={categories} listCart={listCart} addItemToCart={addItemToCart} />
                        </ButtonOrder>
                    );
                case 2: // Order informations
                    return (
                        <div className="container">
                            <OrderForm orderInfo={orderInfo} setOrderInfo={setOrderInfo} now={now} />
                            <button className="btn-primary btn float-left mt-4" onClick={(e) => { e.preventDefault(); setAway(step => step - 1) }}>{lang.back}</button>
                            <button className="btn-primary btn float-right mt-4" onClick={(e) => {
                                setAway(step => step + 1)
                                e.preventDefault()
                            }} >{lang.next}</button>
                        </div>
                    );
                case 3: // Order summary
                    if (!cart.length) {
                        setAway(1);
                    }
                    return (

                        <div className="container">
                            <OrderSummary orderInfo={orderInfo} />
                            <button className="btn-primary btn float-left mt-4" onClick={() => setAway(step => step - 1)}>{lang.back}</button>
                            <button className="btn-primary btn float-right mt-4" ref={confirmRef} onClick={(e) => {
                                handleSubmit(e)
                                oneTimeClick(e)
                            }} >{lang.confirm}</button>
                        </div>
                    );
                case 4: // Payment
                    return (
                        <div className="container">
                            <PaymentForm />
                            <button className="btn-primary btn float-left mt-4" onClick={(e) => { e.preventDefault(); setAway(step => step - 1) }}>{lang.back}</button>
                            <button className="btn-primary btn float-right mt-4" onClick={(e) => {
                                sendNotif()
                                console.log("Nouvelle commande")

                                setAway(step => step + 1)
                                //Handle CHANGE STATUS COMMANDE TO PAY
                            }} >{lang.next}</button>
                        </div>
                    );
                case 5: // Payment validation
                    return (
                        <>
                            <div className="container">
                                <h3>{lang.paymentConfirmation}</h3>
                                <button className="btn-primary btn float-right" onClick={() => { setChoose(0); setAway(0); }}>OK</button>
                            </div>
                        </>);
                default: // Client informations
                    return (
                        <>
                            <div className="container">
                                <CustomerForm errors={errors} />
                                <button className="btn-primary btn float-left" onClick={() => setChoose(0)}>{lang.back}</button>
                                <button className="btn-primary btn float-right" onClick={() => setAway(step => step + 1)}
                                    disabled={!(
                                        customer.firstName &&
                                        customer.lastName &&
                                        customer.email &&
                                        customer.zipcode &&
                                        customer.city &&
                                        customer.phoneNumber &&
                                        customer.address
                                    )}
                                >{lang.next}</button>

                            </div>
                        </>);
            };
        }
        else {
            return (<>
                <div className="container d-flex justify-content-center ">
                    <div className="row align-items-center">
                        <div className="col">
                            <a className="btn borderButt text-primary my-2 border-primary p-5" onClick={() => setChoose(1)}><h3>{lang.there}</h3></a>
                        </div>
                        <div className="col">
                            <a className="btn borderButt text-dark my-2 border-dark p-5" onClick={() => { setChoose(2); }}><h3>{lang.takeAway}</h3></a>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                    </div>
                </div>
            </>);
        }
    }


    return (
        <>
            <CustomerContext.Provider
                value={{ customer, setCustomer }}
            >
                {formOrder()}
            </CustomerContext.Provider>
        </>
    );
}

export default StepForm;