import Axios from 'axios';
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
import settingsAPI from '../Services/settingsAPI';
import useLocalStorage from '../Services/useLocalStorage';
import CustomerForm from './Form/CustomerForm';
import OrderForm from './Form/OrderForm';
import OrderSummary from './Form/OrderSummary';
import PaymentForm from './Form/PaymentForm';
import { Menu } from './Menu';

let now = new Date().toISOString().slice(0, 16);

const StepForm = ({ match, setWhere }) => {

    const { id } = match.params
    let decodeId = id ? +atob(`${id}`) : 0;
    const { lang } = useContext(LangContext);
    const { cartLocal, setCartLocal } = useContext(CartContext);
    let [...bag] = cartLocal;
    const [message, setMessage] = useLocalStorage('chat-message', [])

    const [products, setProducts] = useState([]);
    const [allSent, setAllSent] = useState(false);
    const [categories, setCategories] = useState([]);

    const confirmRef = useRef();
    const [away, setAway] = useState(0);
    const [choose, setChoose] = useState(0);
    const [there, setThere] = useState(0);
    const [confirmed, setConfirmed] = useState(false);
    const [onlinePayment, setOnlinePayment] = useState();
    const [confirmB, setConfirmB] = useState("");

    const [invoiceId, setInvoiceId] = useState();

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
        phoneNumber: "",
        timeToReceive: ""
    });

    const [invoice, setInvoice] = useState({
        amount: 0,
        status: "SENT",
        timeToReceive: "",
        invoiceTable: decodeId < 15 ? decodeId : 0
    });

    const [orderInfo, setOrderInfo] = useState({ reservationAt: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setConfirmB("...")
            const rep = await customersAPI.register(customer);
            setErrors("");
            handleSubmitInvoice(rep.data.id)
        } catch (error) {
            console.error("Customer's form error")
            setConfirmB("")

            if (error.response.data.violations) {
                setAway(0)
                const apiErrors = {};
                error.response.data.violations.forEach((violation) => {
                    apiErrors[violation.propertyPath] = violation.message;
                    toast(violation.message + "", {
                        className: "bg-red-toast",
                    });
                });
                setErrors(apiErrors);
            }
        }
    };

    const handleSubmitInvoice = async (id = 0) => {
        invoice.timeToReceive = new Date(orderInfo.reservationAt);
        if (id !== 0) invoice.client = "/api/customers/" + id;
        confirmRef.current.setAttribute("disabled", "")
        try {
            toast("Commande en cours");
            const rep = await invoicesAPI.add(invoice);
            confirmRef.current.removeAttribute("disabled")
            setInvoiceId(rep.data.id);
            sendAllOrders(rep.data.id)
            setConfirmed(true)
        } catch (error) {
            console.error("Invoice's form error")
            setConfirmB("")
            confirmRef.current.removeAttribute("disabled")
            if (error.response.data.violations) {
                console.log(error.response)

                const apiErrors = {};
                error.response.data.violations.forEach((violation) => {
                    setAway(2)
                    toast(violation.message + "", {
                        className: "bg-red-toast",
                    });
                    apiErrors[violation.propertyPath] = violation.message;
                });
                setErrors(apiErrors);
            }
        }
    }

    const sendAllOrders = async (id) => {


        for (let e in bag) {
            const { name, price, totalAmount } = { ...bag[e] };
            bag[e].label = name;
            bag[e].invoice = "/api/invoices/" + id;
            bag[e].price = parseFloat(price, 10);
            bag[e].totalAmount = totalAmount;
            bag[e].orderTable = decodeId < 15 ? +decodeId : 0;
            try {
                const rep = await Axios.all([ordersAPI.add(bag[e])]).then(res => {
                    return res;
                })
                if (e == bag.length - 1) {
                    if (!onlinePayment.onlinePayment) {
                        sendMail(id);
                        setAway(5);
                    }
                    else {
                        setTimeout(setAway(step => step + 1), 500);
                    }
                }
            } catch (error) {
                setAway(1);
                toast(<p><b>Erreur dans la commande</b><br />Vérifiez que la quantité par article ne soit pas trop importante</p>,
                    {
                        className: "bg-red-toast",
                    })
                console.error("Error on order submit")
            }
        }
    }

    const sendMail = async (id) => {
        try {
            await ordersAPI.sendMail(id);
        } catch (error) {
            console.log(error)
        }
    }

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
    const fetchPayment = async () => {
        try {
            const { label, isTrue } = await settingsAPI.findSetting(1);
            if (label === "onlinePayment") {
                setOnlinePayment({ [label]: isTrue });
            }
        } catch (error) {
            setOnlinePayment({ onlinePayment: true });
            console.log("Error on check online payment");
        }
    }

    useEffect(() => {
        fetchCat();
        fetchProd();
        fetchPayment();
        if ((decodeId !== 0) && (decodeId <= 15)) {
            setChoose(1);
            setWhere(1)
        }
    }, [])

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
        price = parseFloat(price)
        var item = { product, name, price, quantity };
        cartLocal.push(item);
    }

    const Next = (e) => {
        e.preventDefault();
        setAway(step => step + 1)
        window.scrollTo(0, 0);
    }
    const Back = (e) => {
        e.preventDefault();
        setAway(step => step - 1)
        window.scrollTo(0, 0);
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
        if (choose == 1 && ((11 <= new Date().getHours()) && (new Date().getHours() <= 24))) {
            switch (there) {
                case 1:
                    orderInfo.reservationAt = new Date();
                    return (<>
                        <div className="container" >
                            <div className="row justify-content-end"><span className="numbe"> {there + 1} / 2 </span></div>
                            <div ref={componentRef}>
                                <OrderSummary reservation={invoice.invoiceTable} takeAway toPrint={confirmed} />
                            </div>
                            {!confirmed &&
                                <>
                                    <button className="btn-primary btn float-left mt-4" onClick={(e) => { e.preventDefault(); window.scrollTo(0, 0); setThere(step => step - 1) }}>{lang.back}</button>
                                    <button className="btn-primary btn float-right mt-4" ref={confirmRef} onClick={(e) => {
                                        handleSubmitInvoice()
                                        oneTimeClick(e)
                                        window.scrollTo(0, 0);
                                    }}>{lang.confirmOrder}</button>
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
                            <div className="row justify-content-end"><span className="numbe"> {there + 1} / 2 </span></div>

                            <div className="row">
                                <div className="col">
                                    <button className="btn-primary btn float-right mt-4" onClick={(e) => { e.preventDefault(); window.scrollTo(0, 0); setThere(step => step + 1) }} disabled={!cartLocal.length}>{lang.next}</button>
                                </div>
                            </div>
                            <Menu products={products} categories={categories} listCart={listCart} addItemToCart={addItemToCart} />
                            <button className="btn-primary btn float-right mt-4" onClick={(e) => { e.preventDefault(); window.scrollTo(0, 0); setThere(step => step + 1) }} disabled={!cartLocal.length}>{lang.next}</button>
                        </div>
                    );
            }
        }
        else if (choose == 2) {
            switch (away) {
                case 1: // Menu choice
                    return (
                        <ButtonOrder back={lang.back} next={lang.next} disabled={!cartLocal.length}>
                            <div className="row justify-content-end"><span className="numbe"> {away + 1} / 5 </span></div>
                            <div className="row">
                                <div className="col">
                                    <button className="btn-primary btn float-right mt-4" onClick={Next} disabled={!cartLocal.length}>{lang.next}</button>
                                </div>
                            </div>
                            <Menu products={products} categories={categories} listCart={listCart} addItemToCart={addItemToCart} />
                        </ButtonOrder>
                    );
                case 2: // Order informations
                    return (
                        <div className="container">
                            <div className="row justify-content-end"><span className="numbe"> {away + 1} / 5</span></div>
                            <OrderForm reservation={orderInfo} setReservation={setOrderInfo} now={now} errors={errors} />
                            <button className="btn-primary btn float-left mt-4" onClick={Back}>{lang.back}</button>
                            <button className="btn-primary btn float-right mt-4" onClick={Next} disabled={!orderInfo.reservationAt}>{lang.next}</button>
                        </div>
                    );
                case 3: // Order summary
                    if (!cartLocal.length) setAway(1);
                    return (
                        <div className="container">
                            <div className="row justify-content-end"><span className="numbe"> {away + 1} / 5</span></div>
                            <OrderSummary reservation={orderInfo} pay={false} />
                            <button className="btn-primary btn float-left mt-4" onClick={Back}>{lang.back}</button>
                            <button className="btn-primary btn float-right mt-4" ref={confirmRef} onClick={(e) => {
                                handleSubmit(e)
                                oneTimeClick(e)
                                window.scrollTo(0, 0);
                            }} disabled={!cartLocal.length} >{lang.confirmOrder + "" + confirmB}</button>
                        </div>
                    );
                case 4: // Payment
                    if (!cartLocal.length) setAway(1);
                    return (
                        <div className="container">
                            <div className="row justify-content-end"><span className="numbe"> {away + 1} / 5</span></div>
                            <PaymentForm id={invoiceId} setAway={setAway} />
                        </div>
                    );
                case 5: // Chat validation
                    return (
                        <>
                            <div className="container">
                                <div ref={componentRef2}>
                                    <OrderSummary reservation={orderInfo} toPrint pay />
                                </div>
                                <ReactToPrint bodyClass={"m-5 p-5"}
                                    trigger={() => <a className="btn-secondary btn float-right">{lang.print}</a>}
                                    content={() => componentRef2.current}
                                    documentTitle={"Facture-Le-Cheval-Blanc"}
                                />
                                <a href={"#home"} className="btn-primary btn float-left" onClick={() => setCartLocal([])}>Retour au site</a>
                            </div>
                        </>);
                default: // Client informations
                    return (
                        <div className="container">
                            <div className="row justify-content-end"><span className="numbe"> {away + 1} / 5</span></div>
                            <CustomerForm errors={errors} />
                            <button className="btn-primary btn float-left" onClick={(e) => { e.preventDefault(); window.scrollTo(0, 0); setChoose(0) }}>{lang.back}</button>
                            <button className="btn-primary btn float-right" onClick={Next} disabled={
                                !(
                                    customer.firstName &&
                                    customer.lastName &&
                                    customer.email &&
                                    customer.zipcode &&
                                    customer.city &&
                                    customer.phoneNumber &&
                                    customer.address
                                )
                            }>{lang.next}</button>

                        </div>
                    );
            };
        }
        else {
            return (
                <div className="container d-flex justify-content-center ">
                    <div className="row align-items-center">
                        <div className="col">
                            <a className="btn btn-block borderButt btn-outline-violet my-2" onClick={() => { setChoose(2); setWhere(2); window.scrollTo(0, 0); }}>{lang.takeAway}</a>
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