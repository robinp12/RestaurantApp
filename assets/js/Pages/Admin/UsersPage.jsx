import React, { useEffect, useState } from 'react';
import Field from '../../Components/Form/Input/Field';
import Select from '../../Components/Form/Input/Select';
import UserForm from '../../Components/Form/Management/UserForm';
import usersAPI from '../../Services/usersAPI';
import { toast } from "react-toastify";

const UsersPage = ({ match, history }) => {
    const { id } = match.params

    const [users, setUsers] = useState([]);
    const [addUser, setAddUser] = useState(false);
    const [change, setChange] = useState(true);

    const handleDelete = async (id) => {
        const originUsers = [...users];
        setUsers(users.filter(user => user.id !== id));
        try {
            await usersAPI.deleteUsers(id);
            toast("Utilisateur n°" + id + " supprimé", {
                className: "bg-red",
            });
        } catch (error) {
            setUsers(originUsers);
            toast(error + "", { className: "bg-red" });
        }
    }

    const fetchUsers = async () => {
        try {
            const data = await usersAPI.getAllUsers();
            setUsers(data);
        } catch (error) {
            console.error(error.response);
            toast(error + "", { className: "bg-red" });
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [])

    const SingleUser = ({ userInfo }) => {
        const [user, setUser] = useState({
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            email: userInfo.email,
            address: userInfo.address,
            city: userInfo.city,
            zipcode: userInfo.zipcode,
            phoneNumber: userInfo.phoneNumber,
            roles: userInfo.roles,
            password: undefined
        });
        const [errors, setErrors] = useState({
            lastName: "",
            firstName: "",
            email: "",
            password: "",
            roles: "",
            address: "",
            zipcode: "",
            city: "",
            phoneNumber: ""
        });

        const handleChange = ({ currentTarget }) => {

            const { name, value } = currentTarget;
            if (name == "roles") {
                setUser({ ...user, [name]: [value] });
            }
            else {
                setUser({ ...user, [name]: value });
            }
            setErrors({ ...errors, [name]: "" });
        };

        const handleSubmitChange = async (e) => {
            e.preventDefault();
            try {
                const rep = await usersAPI.updateInfo(userInfo.id, user)
                toast(user.firstName + " a été modifié");
                setChange(!change)
                setErrors("");
            } catch (error) {
                console.error(error.response)
                toast(error + "", { className: "bg-red" });
                if (error.response.data.violations) {
                    const apiErrors = {};
                    error.response.data.violations.forEach((violation) => {
                        apiErrors[violation.propertyPath] = violation.message;
                    });
                    setErrors(apiErrors);
                }
            }
        }
        const [roles, setRoles] = useState([
            'ROLE_ADMIN',
            'ROLE_WAITER',
            'ROLE_COOK']
        )

        return (
            <div className="row justify-content-center">
                <div className="col">
                    <div key={userInfo.id} className="card mb-3">
                        <h2 className="card-header">
                            Utilisateur <b>{userInfo.id}</b>
                        </h2>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-12 col-md-6">
                                    <Field label="Prénom" name="firstName" onChange={handleChange} error={errors.firstName} value={user.firstName} disabled={change} />
                                    <Field label="Téléphone" name="phoneNumber" onChange={handleChange} error={errors.phoneNumber} value={user.phoneNumber} disabled={change} />
                                    <Field label="Email" name="email" onChange={handleChange} error={errors.email} value={user.email} disabled={change} />

                                    <Field label="Mot de passe" name="password" type="password" error={errors.password} placeholder="Nouveau mot de passe" onChange={handleChange} value={user.password} disabled={change} />
                                    <Select onChange={handleChange} defaut={user.roles} name={"roles"} label="Rôles" error={errors.roles} disabled={change}>
                                        {roles.map((role, index) => <option value={[role]} key={index}>{role}</option>)}
                                    </Select>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <Field label="Nom" name="lastName" onChange={handleChange} error={errors.lastName} value={user.lastName} disabled={change} />
                                    <Field label="Adresse" name="address" onChange={handleChange} error={errors.address} value={user.address} disabled={change} />
                                    <Field label="Ville" name="city" onChange={handleChange} error={errors.city} value={user.city} disabled={change} />
                                    <Field label="Code Postal" name="zipcode" onChange={handleChange} error={errors.zipcode} value={user.zipcode} disabled={change} />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col">
                                    {change ?
                                        <button className="btn btn-secondary float-left" onClick={() => setChange(!change)}>Modifier</button>
                                        :
                                        <button className="btn btn-secondary float-left" onClick={handleSubmitChange}>Enregistrer</button>
                                    }
                                    {users.length !== 1 &&
                                        <button className="btn btn-primary float-right" onClick={() => handleDelete(user.id)} disabled={user.invoices?.length}>Supprimer</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="row">
                <div className="col-sm-12 col-md-4">
                    <table className="table table-responsive-md table-hover ">
                        <thead className="thead-dark">
                            <tr>
                                <th className="text-center hidden-xs align-middle">ID</th>
                                <th className="text-center align-middle">Utilisateur</th>
                                <th className="text-center align-middle">
                                    <button onClick={() => setAddUser(!addUser)} className="btn btn-primary float-right"><i className="fa fa-user-plus fa-lg" aria-hidden="true"></i></button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => <tr key={user.id} onClick={() => {
                                history.replace("/utilisateurs/" + user.id)
                                setAddUser(false)
                            }}>
                                <th scope="row" className="text-center">#{user.id}</th>
                                <td className="text-center"> {user.firstName} {user.lastName.toUpperCase()}</td>
                                <td></td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
                <div className="col">
                    {addUser &&
                        <>
                            <UserForm />
                        </>
                        ||
                        <>
                            {users.map(userInfo =>
                                userInfo.id == id &&
                                <div key={userInfo.id}>
                                    <SingleUser userInfo={userInfo} />
                                </div>
                            )}
                        </>
                    }
                </div>
            </div>
        </>
    );
}

export default UsersPage;