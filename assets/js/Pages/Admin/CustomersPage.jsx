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


    const SingleCustomer = ({ customerInfo }) => {

        const [customer, setCustomer] = useState({
            firstName: customerInfo.firstName,
            lastName: customerInfo.lastName,
            email: customerInfo.email,
            address: customerInfo.address,
            city: customerInfo.city,
            zipcode: customerInfo.zipcode,
            phoneNumber: customerInfo.phoneNumber,
        });
        const handleChange = ({ currentTarget }) => {
            const { name, value } = currentTarget;
            setCustomer({ ...customer, [name]: value });
        };

        const handleSubmitChange = async (e) => {
            e.preventDefault();
            try {
                const rep = await customersAPI.updateInfo(customerInfo.id, customer)
                console.log(rep);
                setChange(!change)
            } catch (error) {
                console.log(error);
            }
        }

        console.log(customer)

        return (
            <div className="row justify-content-center">
                <div className="col">
                    <div className="form container p-4">
                        <h2>Clients <b>{customerInfo.id}</b></h2>
                        <div className="row">
                            <div className="col">
                                <Field label="Prénom" name="firstName" onChange={handleChange} value={customer.firstName} disabled={change} />
                                <Field label="Téléphone" name="phoneNumber" onChange={handleChange} value={customer.phoneNumber} disabled={change} />
                                <Field label="Email" name="email" onChange={handleChange} value={customer.email} disabled={change} />
                            </div>
                            <div className="col">
                                <Field label="Nom" name="lastName" onChange={handleChange} value={customer.lastName} disabled={change} />
                                <Field label="Adresse" name="address" onChange={handleChange} value={customer.address} disabled={change} />
                                <Field label="Ville" name="city" onChange={handleChange} value={customer.city} disabled={change} />
                                <Field label="Code Postal" name="zipcode" onChange={handleChange} value={customer.zipcode} disabled={change} />
                            </div>
                        </div>
                        {/* <div className="row">
                            <div className="col">
                                CC
                                <span>{customerInfo.invoices}<br /></span>
                            </div>
                        </div> */}
                        <div className="row mt-3">
                            <div className="col">
                                {change ?

                                    <button className="btn btn-secondary float-left" onClick={() => setChange(!change)}>Modifier</button>
                                    :
                                    <button className="btn btn-secondary float-left" onClick={handleSubmitChange}>Enregistrer</button>

                                }
                                <button className="btn btn-primary float-right" onClick={() => handleDelete(customer.id)} disabled={customer.invoices?.length}>Supprimer</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
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
                            {customers.map((customer, index) =>

                                (typeof (customer.id) != "undefined") &&
                                < tr key={index} onClick={() => history.replace("/clients/" + customer.id)}>
                                    <th scope="row" className="text-center align-middle">#{customer.id}</th>
                                    <td className="text-center align-middle">{customer.firstName} {customer.lastName?.toUpperCase()}</td>
                                    <td align="center">
                                        <a className="btn btn-secondary"><em className="fa fa-pencil"></em></a>
                                        <a className="btn btn-primary" onClick={() => handleDelete(customer.id)}><em className="fa fa-trash"></em></a>
                                    </td>
                                </tr>)}
                        </tbody>
                    </table>
                </div>
                <div className="col">
                    {customers.map((customerInfo, index) => (
                        (typeof (customerInfo.id) != "undefined") &&
                        customerInfo.id == id &&
                        <div key={index}>
                            <SingleCustomer customerInfo={customerInfo} />
                        </div>))
                    }
                </div>
            </div>
        </>
    );
}

export default CustomersPage;