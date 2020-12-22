import React, { useContext, useEffect, useState } from 'react';
import "react-toastify/dist/ReactToastify.css";
import socketIOClient from "socket.io-client";
import OrderChat from '../Components/Form/OrderChat';
import Header from '../Components/Header';
import { LangContext } from '../Context/LangContext';
import authAPI from '../Services/authAPI';
import useLocalStorage from '../Services/useLocalStorage';

const ENDPOINT = "http://localhost:3000";

const socket = socketIOClient(ENDPOINT, {
    transports: ["websocket"],
});
socket.emit("login", "1@hot.com");

const AboutPage = () => {

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

    const [message, setMessage] = useLocalStorage('chat-message', [])

    useEffect(() => {
        socket.on("receive", (data) => {
            console.log(data)
            setMessage((prev) => [...prev, data]);
        });
        socket.on("discousr", e => console.log(e))

    }, [])
    return (
        <>
            <Header title={lang.about} />


            <div className="row card-text">
                <div className="col">
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
                    {/* <OrderChat customer={customer} admin={authAPI.isAuth()} socket={socket} message={message} setMessage={setMessage} /> */}
                </div>
                <div className="col">
                    <div className="row">
                        <div className="col">
                            <address>
                                <strong>Le Cheval Blanc</strong>
                                <br />
                                Chaussée de Dinant, 26
                                <br />5530 Spontin
                                    <br />
                                <abbr title="Phone">N: </abbr> 083 69 96 19

                                <abbr title="Phone">N: </abbr> 0475 31 93 24

                                    <br />
                                <a href="mailto:cavalo.branco@skynet.be">cavalo.branco@skynet.be</a>
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