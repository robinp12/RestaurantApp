import React, { useRef } from 'react';
import useLocalStorage from '../../Services/useLocalStorage';

const Message = ({ message, isAdmin }) => {
    return (<>
        <div>
            {message?.map((e, index) =>
                <div key={index} className={"row mx-2 " + (isAdmin(e.admin) && " " || "justify-content-end")}>
                    <div className="col-7">
                        <div className={"alert alert-dismissible " + (isAdmin(e.admin) && "alert-info" || "alert-warning")}>
                            <h5 className="alert-heading">{e.name}</h5>
                            <em>{e.desc}</em>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </>)
}
const OrderChat = ({ admin = false, customer = false, socket, message, setMessage }) => {

    const [bag, setBag] = useLocalStorage('chat-cart', [{ product: 39, name: "Boulettes sauce bolognese", price: 16, quantity: 1, totalAmount: 16 }])

    const inputRef = useRef();

    const isAdmin = function (e) {
        if (admin) return !e;
        else return e
    }

    const send = function (e, obj) {
        e.preventDefault();
        socket.emit("send", obj);
    };

    return (
        <>
            <div className="card mb-3">
                <h3 className="card-header"><span>Commande<button className="float-right btn btn-sm btn-primary" onClick={(e) => { e.preventDefault(); setMessage([]); setBag([]) }}>x</button></span></h3>
                <div className="row mb-2 pb-2 mb-2">
                    <div className="col">
                        <div className="card-body">
                            <h5 className="card-title">{customer.firstName} {customer.lastName}</h5>
                            <h6 className="card-subtitle text-muted">Tel : {customer.phoneNumber}</h6>
                        </div>
                    </div>
                    <div className="col">
                        <ul className="list-group list-group-flush">
                            {bag.map((e, index) =>
                                <li key={index} className="list-group-item">{e.name} : {e.quantity}x</li>
                            )}
                        </ul>
                    </div>
                </div>
                <form onSubmit={(e) => send(e, { name: customer.firstName, desc: inputRef.current.value, admin: admin })}>

                    <Message admin={admin} customer={customer} message={message} isAdmin={isAdmin} />
                    <div className="card-footer text-muted ">
                        <div className="row align-middle align-items-center">
                            <div className="col">
                                <input className="form-control" ref={inputRef} placeholder="Ecris ton message"></input>
                            </div>
                            <div className="">
                                <button className="btn btn-primary" type="submit">Envoyer</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default OrderChat;