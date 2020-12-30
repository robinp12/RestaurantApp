import React, { useContext, useEffect, useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';
import { toast } from "react-toastify";
import { CartContext } from '../Context/CartContext';
import { CustomerContext } from '../Context/CustomerContext';
import { LangContext } from '../Context/LangContext';
import categoriesAPI from '../Services/categoriesAPI';
import customersAPI from '../Services/customersAPI';
import invoicesAPI from '../Services/invoicesAPI';
import ordersAPI from '../Services/ordersAPI';
import productsAPI from '../Services/productsAPI';
import useLocalStorage from '../Services/useLocalStorage';
import CustomerForm from './Form/CustomerForm';
import OrderForm from './Form/OrderForm';
import OrderSummary from './Form/OrderSummary';
import PaymentForm from './Form/PaymentForm';
import { MenuOrder } from './Menu';

let now = new Date().toISOString().slice(0, 16);
const StepForm = ({ match, setWhere }) => {

    const { id } = match.params

    const { lang } = useContext(LangContext);
    const { cart, setCart } = useContext(CartContext);
    let [...bag] = cart;
    const [orderCart, setOrderCart] = useLocalStorage('cart', [])
    const [message, setMessage] = useLocalStorage('chat-message', [])

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const confirmRef = useRef();
    const [away, setAway] = useState(0);
    const [choose, setChoose] = useState(0);
    const [there, setThere] = useState(0);
    const [confirmed, setConfirmed] = useState(false);


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

    const [invoice, setInvoice] = useState({
        amount: 0,
        status: "SENT",
        timeToReceive: new Date(),
        invoiceTable: id < 15 ? +id : 0
    });

    const [orderInfo, setOrderInfo] = useState({ reservationAt: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const rep = await customersAPI.register(customer);
            setErrors("");
            handleSubmitInvoice(rep.data.id)
        } catch (error) {
            console.error("Customer's form error")
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

    const handleSubmitInvoice = async (id = 0) => {
        invoice.timeToReceive = orderInfo.reservationAt
        if (id !== 0) invoice.client = "/api/customers/" + id;
        confirmRef.current.setAttribute("disabled", "")
        try {
            const rep = await invoicesAPI.add(invoice);
            confirmRef.current.removeAttribute("disabled")
            toast("Commande envoyée");
            sendAllOrders(rep.data.id)
            setConfirmed(true)
            // sendNotif()
        } catch (error) {
            console.error("Invoice's form error")
        }
    }

    const sendAllOrders = (id) => {
        setAway(step => step + 1)
        for (let e in bag) {
            handleSubmitOrder(formatedOrder(bag[e]), id)
        }
    }

    const formatedOrder = ({ name, price, totalAmount, ...bag }) => {
        bag.label = name;
        bag.price = parseFloat(price, 10);
        bag.totalAmount = totalAmount;
        bag.orderTable = id < 15 ? +id : 0;
        return bag
    }
    const handleSubmitOrder = async (order, id) => {
        order.invoice = "/api/invoices/" + id;
        console.log(order.invoice)

        try {
            const rep = await ordersAPI.add(order);
            console.log(rep)

            setOrderCart(cart)
        } catch (error) {
            console.error("Order's form error")
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
    // const sendNotif = () => {
    //     SocketClient.sendToSocket("notifSend", "Nouvelle commande");
    // }

    useEffect(() => {
        fetchCat();
        fetchProd();
        if (id <= 15) {
            setChoose(1);
            setWhere(1)
        }
    }, [])

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
        price = parseFloat(price)
        var item = { product, name, price, quantity };
        cart.push(item);
    }

    const Next = (e) => {
        e.preventDefault();
        setAway(step => step + 1)
    }
    const Back = (e) => {
        e.preventDefault();
        setAway(step => step - 1)
    }
    const ButtonOrder = ({ children, next, back, disabled }) => {
        return (
            <div className="container">
                {children}
                <button className="btn-primary btn float-left mt-4" onClick={Back}>{back}</button>
                <button className="btn-primary btn float-right mt-4" onClick={Next} disabled={disabled}>{next}</button>
            </div>
        )
    }

    const oneTimeClick = (e) => {
        e.preventDefault()
        confirmRef.current.setAttribute("disabled", "")
    }
    const componentRef = useRef();
    const componentRef2 = useRef();

    function formOrder() {
        if (choose == 1) {
            switch (there) {
                case 1:
                    return (<>
                        <div className="container" >
                            <div ref={componentRef}>
                                <OrderSummary reservation={invoice.invoiceTable} takeAway toPrint={confirmed} />
                            </div>
                            {!confirmed &&
                                <>
                                    <button className="btn-primary btn float-left mt-4" onClick={(e) => { e.preventDefault(); setThere(step => step - 1) }}>{lang.back}</button>
                                    <button className="btn-primary btn float-right mt-4" ref={confirmRef} onClick={(e) => {
                                        handleSubmitInvoice()
                                        oneTimeClick(e)
                                    }}>{lang.confirm}</button>
                                </> ||
                                <ReactToPrint bodyClass={"m-5 p-5"}
                                    trigger={() => <a className="btn-secondary btn float-right mt-4">Imprimer</a>}
                                    content={() => componentRef.current}
                                    documentTitle={"Facture-Le-Cheval-Blanc"}
                                />
                            }
                        </div>
                    </>
                    );
                default:
                    return (
                        <div className="container">
                            <MenuOrder products={products} categories={categories} listCart={listCart} addItemToCart={addItemToCart} />
                            <button className="btn-primary btn float-left mt-4" onClick={(e) => { e.preventDefault(); setChoose(0) }}>{lang.back}</button>
                            <button className="btn-primary btn float-right mt-4" onClick={(e) => { e.preventDefault(); setThere(step => step + 1) }} disabled={!cart.length}>{lang.next}</button>
                        </div>
                    );
            }
        }
        else if (choose == 2) {
            switch (away) {
                case 1: // Menu choice
                    return (
                        <ButtonOrder back={lang.back} next={lang.next} disabled={!cart.length}>
                            <MenuOrder products={products} categories={categories} listCart={listCart} addItemToCart={addItemToCart} />
                        </ButtonOrder>
                    );
                case 2: // Order informations
                    return (

                        <div className="container">
                            <OrderForm reservation={orderInfo} setReservation={setOrderInfo} now={now} />
                            <button className="btn-primary btn float-left mt-4" onClick={Back}>{lang.back}</button>
                            <button className="btn-primary btn float-right mt-4" onClick={Next} disabled={!orderInfo.reservationAt}>{lang.next}</button>
                        </div>
                    );
                case 3: // Order summary
                    if (!cart.length) setAway(1);
                    return (
                        <div className="container">
                            <OrderSummary reservation={orderInfo} />
                            <button className="btn-primary btn float-left mt-4" onClick={Back}>{lang.back}</button>
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
                            <button className="btn-primary btn float-left mt-4" onClick={Back}>{lang.back}</button>
                            <button className="btn-primary btn float-right mt-4" onClick={(e) => {
                                e.preventDefault();
                                setAway(step => step + 1)
                                // setCart([])
                                //Handle CHANGE STATUS COMMANDE TO PAY
                            }} >{lang.next}</button>
                        </div>
                    );
                case 5: // Chat validation
                    return (
                        <>
                            <div className="container">
                                <div ref={componentRef2}>
                                    <OrderSummary reservation={orderInfo} toPrint />
                                </div>
                                <ReactToPrint bodyClass={"m-5 p-5"}
                                    trigger={() => <a className="btn-secondary btn float-right">{lang.print}</a>}
                                    content={() => componentRef2.current}
                                    documentTitle={"Facture-Le-Cheval-Blanc"}
                                />
                                {/* <OrderChat admin={authAPI.isAuth()} socket={socket} message={message} /> */}
                                {/* <button className="btn-primary btn float-right" onClick={() => { setChoose(0); setAway(0); }}>OK</button> */}
                            </div>
                        </>);
                default: // Client informations
                    return (
                        <div className="container">
                            <CustomerForm errors={errors} />
                            <button className="btn-primary btn float-left" onClick={(e) => { e.preventDefault(); setChoose(0) }}>{lang.back}</button>
                            <button className="btn-primary btn float-right" onClick={Next}
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
                    );
            };
        }
        else {
            return (
                <div className="container d-flex justify-content-center ">
                    <div className="row align-items-center">
                        {/* <div className="col">
                            <a className="btn btn-block borderButt text-primary my-2 border-primary" onClick={() => setChoose(1)}>{lang.there}</a>
                        </div> */}
                        <div className="col">
                            <a className="btn btn-block borderButt text-dark my-2 border-dark" onClick={() => { setChoose(2); setWhere(2) }}>{lang.takeAway}</a>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                    </div>
                </div>
            );
        }
    }

    return (
        <CustomerContext.Provider value={{ customer, setCustomer }}>
            {formOrder()}
        </CustomerContext.Provider>
    );
}

export default StepForm;