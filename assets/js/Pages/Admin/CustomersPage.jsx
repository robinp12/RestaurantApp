import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import Field from '../../Components/Form/Input/Field';
import Loader from '../../Components/Loader';
import Pagination from '../../Components/Pagination';
import customersAPI from "../../Services/customersAPI";

const CustomersPage = ({ match, history }) => {

    const { id } = match.params
    const [customers, setCustomers] = useState([]);
    const [search, setSearch] = useState("");
    const [change, setChange] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [load, setLoad] = useState(true);

    const fetchCustomers = async () => {
        try {
            const data = await customersAPI.getAllcustomers();
            setCustomers(data);
            setLoad(false)
        } catch (error) {
            console.log(error.response);
        }
    }

    const handleDelete = async (id) => {

        const originCustomers = [...customers];

        setCustomers(customers.filter(customer => customer.id !== id));
        try {
            await customersAPI.deletecustomers(id);
            toast("Client n°" + id + " supprimé");
            history.replace("/clients/" + customers[0].id)
        } catch (error) {
            setCustomers(originCustomers);
            toast(error + "");
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
                setChange(!change)
            } catch (error) {
                console.error(error);
            }
        }

        return (
            <div className="row justify-content-center">
                <div className="col">
                    <div key={customerInfo.id} className="card mb-3">
                        <h2 className="card-header">
                            Clients <b>{customerInfo.id}</b>
                        </h2>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-12 col-md-6">
                                    <Field label="Prénom" name="firstName" onChange={handleChange} value={customer.firstName} disabled={change} />
                                    <Field label="Téléphone" name="phoneNumber" className="manage" onChange={handleChange} value={customer.phoneNumber} disabled={change} />
                                    <Field label="Email" name="email" className="manage" onChange={handleChange} value={customer.email} disabled={change} />
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <Field label="Nom" name="lastName" onChange={handleChange} value={customer.lastName} disabled={change} />
                                    <Field label="Adresse" name="address" onChange={handleChange} value={customer.address} disabled={change} />
                                    <Field label="Ville" name="city" onChange={handleChange} value={customer.city} disabled={change} />
                                    <Field label="Code Postal" name="zipcode" onChange={handleChange} value={customer.zipcode} disabled={change} />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col">
                                    {change ?
                                        <button className="btn btn-secondary float-left" onClick={() => setChange(!change)}>Modifier</button>
                                        :
                                        <button className="btn btn-secondary float-left" onClick={handleSubmitChange}>Enregistrer</button>
                                    }
                                    <button className="btn btn-primary float-right" onClick={() => handleDelete(customerInfo.id)} disabled={customerInfo.invoices?.length || customerInfo.reservations?.length}>Supprimer</button>
                                </div>
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

    const handleChangePage = (page) => setCurrentPage(page);

    const handleSearch = ({ currentTarget }) => {
        setSearch(currentTarget.value)
        setCurrentPage(1)
    }
    const itemsPerPage = 10;
    const filtered = customers.filter(c =>
        c.firstName.toLowerCase().includes(search.toLowerCase()) ||
        c.lastName.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase())
    );
    const paginated = Pagination.getData(filtered, currentPage, itemsPerPage)

    return (
        <>
            {load &&
                <Loader />
                ||
                <div className="row">
                    <div className="col-sm-12 col-md-4">
                        <Field placeholder={"Chercher un client ..."} onChange={handleSearch} value={search} className="manage" />
                        <table className="table table-hover ">
                            <thead className="thead-dark">
                                <tr>
                                    <th className="text-center hidden-xs">ID</th>
                                    <th className="text-center">Client</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginated.map((customer, index) =>
                                    (typeof (customer.id) != "undefined") &&
                                    < tr key={index} onClick={() => history.replace("/clients/" + customer.id)} className={customer.id == id ? "actif" : ""}>
                                        <th scope="row" className="text-center align-middle">#{customer.id}</th>
                                        <td className="text-center align-middle">{customer.firstName} {customer.lastName?.toUpperCase()}</td>
                                    </tr>)}
                            </tbody>
                        </table>
                        {itemsPerPage < paginated.length && <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={filtered.length} onPageChanged={handleChangePage} />}

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
                </div>}
        </>
    );
}

export default CustomersPage;