import React, { useEffect } from 'react';
import socketIOClient from "socket.io-client";
import OrderChat from '../../Components/Form/OrderChat';
import authAPI from '../../Services/authAPI';
import useLocalStorage from '../../Services/useLocalStorage';

const ENDPOINT = "http://localhost:3000";

const socket = socketIOClient(ENDPOINT, {
    transports: ["websocket"],
});
socket.emit("login", "2@hot.com");


const ChatPage = () => {
    const [users, setUsers] = useLocalStorage("chat-users", []);
    const [message, setMessage] = useLocalStorage('chat-message', [])

    // socket.on("newuser", (e) => console.log(e));
    useEffect(() => {
        socket.on("receive", (data) => {
            console.log(data)
            setMessage((prev) => [...prev, data]);
        });
        socket.on("discousr", e => console.log(e))
    }, [])

    return (
        <>
            <div className="row">
                <div className="col-3">
                    <div className="card mb-3">
                        <h3 className="card-header">Liste</h3>
                        <div className="card-body">
                            <li className="list-group-item">Robin</li>
                            {users.map(e =>
                                <li className="list-group-item">{e}</li>

                            )}
                        </div>
                    </div>
                </div>
                <div className="col">
                    <OrderChat admin={authAPI.isAuth()} socket={socket} message={message} />
                </div>
            </div>
        </>
    );
}

export default ChatPage;