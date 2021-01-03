import Axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import "react-toastify/dist/ReactToastify.css";
import socketIOClient from "socket.io-client";
import PaymentForm from '../Components/Form/PaymentForm';
import Header from '../Components/Header';
import { LangContext } from '../Context/LangContext';
import authAPI from '../Services/authAPI';
import useLocalStorage from '../Services/useLocalStorage';


const ENDPOINT = "http://localhost:3000";

const socket = socketIOClient(ENDPOINT, {
    transports: ["websocket"],
});

const AboutPage = ({ ref }) => {

    const { lang } = useContext(LangContext);
    const [customer, setCustomer] = useState({
        firstName: "Robin",
        lastName: "Paquet",
        email: "robin-be@hotmail.com",
        address: "rue de",
        city: "Dinant",
        zipcode: "5500",
        phoneNumber: "0493022156",
    })

    let firstName = customer.firstName + 10 * Math.random().toFixed(1);
    const [adminConnected, setAdminConnected] = useState({ msg: "", bool: 0 })

    const [message, setMessage] = useLocalStorage('chat-message', [])

    useEffect(() => {
        socket.emit('login', { email: customer.email, admin: authAPI.isAuth() });
        socket.on("admin-co", e => setAdminConnected({ msg: e.msg, bool: e.bool }))
        socket.on(customer.email, (data) => {
            setMessage((prev) => [...prev, data]); console.log(data)
        })
    }, [])

    const send = function (e, { desc }) {
        e.preventDefault();
        socket.emit("send", { from: customer.email, desc: desc, admin: authAPI.isAuth(), to: "admin" });
        setMessage(prev => [...prev, { from: customer.email, desc: desc }]);
    };


    return (
        <>
            <Header title={lang.about} bool={false} />

            <div className="row card-text" >
                <div className="col-sm-12 col-md-6">
                    <iframe width="100%" height="350" frameBorder="0"
                        src="https://www.google.com/maps/embed/v1/place?q=le%20cheval%20blanc%20spontin&key=AIzaSyD447e5QbLc2blHJchrtHoVouRz1YN8pNI" allowFullScreen></iframe>

                    {/* <div id="mapid">
                        <Map center={[50.503439, 4.855911]} zoom={8}>
                        <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[50.503439, 4.855911]}>
                        <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                        </Marker> 
                        </Map>
                    </div> */}
                    {/* <div className={"alert alert-" + (!adminConnected.bool ? "primary" : "success")} role="alert">{adminConnected.msg}</div> */}
                    {/* <OrderChat customer={customer} admin={authAPI.isAuth()} send={send} message={message} setMessage={setMessage} adminConnected={adminConnected} /> */}
                    <PaymentForm />
                </div>
                <div className="col-sm-12 col-md-6">
                    <div className="row">
                        <div className="col">
                            <address>
                                <strong>Le Cheval Blanc</strong>
                                <br />
                                Chaussée de Dinant, 26
                                <br />5530 Spontin
                                    <br />
                                <i className="fa fa-phone fa-lg" aria-hidden="true"></i> <a href="tel:083 69 96 19">083 69 96 19</a> <br />

                                <i className="fa fa-mobile fa-lg" aria-hidden="true"></i>  <a href="tel:0475 31 93 24">0475 31 93 24</a>

                                <br />
                                <i className="fa fa-facebook-square fa-lg" aria-hidden="true"></i> <a href="https://www.facebook.com/LeChevalBlancSpontin" target="_blank">Le Cheval Blanc Spontin</a><br />
                                <i className="fa fa-envelope-o fa-lg" aria-hidden="true"></i> <a href="mailto:cavalo.branco@skynet.be">cavalo.branco@skynet.be</a>
                            </address>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <strong>{lang.openingTime}:</strong>
                            <br />{lang.monday} {lang.and} {lang.tuesday} : {lang.from} 18h {lang.to} 21h
                               <br /> {lang.friday} : {lang.from} 18h {lang.to} 22h
                               <br /> {lang.saturday} : {lang.from} 11h {lang.to} 14h {lang.and} {lang.from} 18h {lang.to} 22h
                               <br /> {lang.sunday} : {lang.from} 11h {lang.to} 21h
                                </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AboutPage;