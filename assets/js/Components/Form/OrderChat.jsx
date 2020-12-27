import React, { useRef } from 'react';
import useLocalStorage from '../../Services/useLocalStorage';

const OrderChat = ({ admin = false, customer = false, message, setMessage, send, selectedUser, adminConnected }) => {

    const inputRef = useRef();
    const [bag, setBag] = useLocalStorage('chat-cart', [{ product: 39, name: "Boulettes sauce bolognese", price: 16, quantity: 1, totalAmount: 16 }])

    const isAdmin = function (e) {
        if (admin) return !e;
        else return e
    }
    const Message = () => {
        return (<>
            <div>
                {message.map((e, index) =>
                    // (e.from || e.to) == selectedUser &&
                    <div key={index} className={"row mx-2 " + (isAdmin(e.admin) && " " || "justify-content-end")}>
                        <div className="col-sm-12 col-md-7">
                            {console.log(e)
                            }
                            <div className={"alert alert-dismissible " + (isAdmin(e.admin) && "alert-info" || "alert-warning")}>
                                {/* <h5 className="alert-heading">{e.admin ? "Le Cheval Blanc" : (!e.from?.email ? "Moi" : e.from?.email)}</h5> */}
                                <h5 className="alert-heading">{e.admin ? "Le Cheval Blanc" : e.from}</h5>
                                <em>{e.desc}</em>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>)
    }

    return (
        <>
            <div className="card mb-3">
                <h3 className="card-header">
                    <span>Commande de {selectedUser}
                        <button className="float-right btn btn-sm btn-primary"
                            onClick={(e) => { e.preventDefault(); setMessage([]); setBag([]) }}
                        >
                            <i className="fa fa-trash " aria-hidden="true"></i>

                        </button>
                    </span>
                </h3>
                <div className="row mb-2 pb-2 mb-2">
                    <div className="col-sm-12 col-md-6">
                        <div className="card-body">
                            <h5 className="card-title">{customer.firstName} {customer.lastName}</h5>
                            <h6 className="card-subtitle text-muted">Tel : {customer.phoneNumber}</h6>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <ul className="list-group list-group-flush">
                            {bag.map((e, index) =>
                                <li key={index} className="list-group-item">{e.name} : {e.quantity}x</li>
                            )}
                        </ul>
                    </div>
                </div>
                <form onSubmit={(e) => { send(e, { desc: inputRef.current.value }); e.currentTarget.reset() }}>

                    <Message />
                    <div className="card-footer text-muted ">
                        <div className="row align-middle align-items-center">
                            <div className="col">
                                <input className="form-control" ref={inputRef} placeholder="Ecris ton message"></input>
                            </div>
                            <div className="">
                                <button className="btn btn-primary" type="submit" disabled={!adminConnected.bool}><i className="fa fa-paper-plane " aria-hidden="true"></i></button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default OrderChat;