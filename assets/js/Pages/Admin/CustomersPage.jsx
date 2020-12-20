import React, { useEffect } from 'react';
import { useState } from 'react';
import Field from '../../Components/Form/Input/Field';
import customersAPI from "../../Services/customersAPI";
import { toast } from "react-toastify";

const CustomersPage = ({ match, history }) => {

    const { id } = match.params

    const [customers, setCustomers] = useState([]);

    const [change, setChange] = useState(true);

    const fetchCustomers = async () => {
        try {
            const data = await customersAPI.getAllcustomers();
            setCustomers(data);
        } catch (error) {
            console.log(error.response);
        }
    }
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setCustomer({ ...customer, [name]: value });
        console.log(customer)

    };

    const handleDelete = async (id) => {

        const originCustomers = [...customers];

        setCustomers(customers.filter(customer => customer.id !== id));
        try {
            await customersAPI.deletecustomers(id);
            toast("Client n°" + id + " supprimé", {
                className: "bg-red",
            });
            history.replace("/clients/" + customers[customers.length - 1 - 1].id)
        } catch (error) {
            setCustomers(originCustomers);
            toast(error + "", {
                className: "bg-red",
            });
        }
    }
    useEffect(() => {
        fetchCustomers();
    }, [])

    return (
        <>
            <div className="row">
                <div className="col-12-sm">
                    <table className="table table-responsive-md table-hover ">
                        <thead className="thead-dark">
                            <tr>
                                <th className="text-center hidden-xs">ID</th>
                                <th className="text-center">Client</th>
                                <th className="text-center"><em className="fa fa-cog"></em></th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map(customer => <tr key={customer.id} onClick={() => history.replace("/clients/" + customer.id)}>
                                <th scope="row" className="text-center">#{customer.id}</th>
                                <td className="text-center">{customer.firstName} {customer.lastName.toUpperCase()}</td>
                                <td align="center">
                                    <a className="btn btn-secondary"><em className="fa fa-pencil"></em></a>
                                    <a className="btn btn-primary" onClick={() => handleDelete(customer.id)}><em className="fa fa-trash"></em></a>
                                </td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
                <div className="col">
                    {customers.map(customerInfo =>
                        (customerInfo.id == id) &&
                        <div key={customerInfo.id}>
                            <div className="row justify-content-center">
                                <div className="col">
                                    <div className="form container p-4">
                                        <h2>Clients <b>{customerInfo.id}</b></h2>
                                        <div className="row">
                                            <div className="col">
                                                <Field label="Prénom" name="firstName" onChange={handleChange} placeholder={customerInfo.lastName} disabled={change} />
                                                <Field label="Téléphone" name="phoneNumber" onChange={handleChange} placeholder={customerInfo.phoneNumber} disabled={change} />
                                                <Field label="Email" name="email" onChange={handleChange} placeholder={customerInfo.email} disabled={change} />
                                            </div>
                                            <div className="col">
                                                <Field label="Nom" name="lastName" onChange={handleChange} placeholder={customerInfo.firstName} disabled={change} />
                                                <Field label="Adresse" name="address" onChange={handleChange} placeholder={customerInfo.address} disabled={change} />
                                                <Field label="Ville" name="city" onChange={handleChange} placeholder={customerInfo.city} disabled={change} />
                                                <Field label="Code Postal" name="zipcode" onChange={handleChange} placeholder={customerInfo.zipcode} disabled={change} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">

                                                <span>{customerInfo.invoices}<br /></span>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col">
                                                <button className="btn btn-secondary" onClick={() => setChange(!change)}>{change ? "Modifier" : "Valider"}</button>
                                                <button className="btn btn-primary" onClick={() => handleDelete(customerInfo.id)} disabled={customerInfo.invoices?.length}>Supprimer</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default CustomersPage;