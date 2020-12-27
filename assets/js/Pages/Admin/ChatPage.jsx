import React, { useEffect, useState } from 'react';
import socketIOClient from "socket.io-client";
import OrderChat from '../../Components/Form/OrderChat';
import authAPI from '../../Services/authAPI';
import useLocalStorage from '../../Services/useLocalStorage';

const ENDPOINT = "http://localhost:3000";

const socket = socketIOClient(ENDPOINT, {
    transports: ["websocket"],
});

const ChatPage = () => {
    const [users, setUsers] = useLocalStorage("chat-users", []);
    const [message, setMessage] = useLocalStorage('chat-message', [])

    const [selectedUser, setSelectedUser] = useState();

    useEffect(() => {
        socket.emit('login', { admin: authAPI.isAuth() });
        socket.on("usersToAdmin", (e) => setUsers(e))
        socket.on("msgToAdmin", e => setMessage((prev) => [...prev, e]))
        setSelectedUser(users[0])
    }, [])

    const send = function (e, { desc }) {
        e.preventDefault();
        socket.emit("send", { from: "admin", desc: desc, admin: authAPI.isAuth(), to: selectedUser });
        setMessage(prev => [...prev, { admin: authAPI.isAuth(), desc: desc, to: selectedUser }]);
    };

    return (
        <>
            <div className="row">
                <div className="col-4">
                    <div className="card mb-3">
                        <h3 className="card-header">Messages</h3>
                        <div className="card-body">
                            {
                                users.map((e, index) =>
                                    <li key={index} className="list-group-item" onClick={() => setSelectedUser
                                        (e)}>{e}</li>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="col">
                    <OrderChat admin={authAPI.isAuth()} send={send} message={message} setMessage={setMessage} selectedUser={selectedUser} adminConnected={{ bool: 1 }} />
                </div>
            </div>
        </>
    );
}

export default ChatPage;