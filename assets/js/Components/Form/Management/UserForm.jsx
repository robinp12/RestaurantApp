import React, { useState } from "react";
import { toast } from "react-toastify";
import usersAPI from "../../../Services/usersAPI";
import Field from "../Input/Field";
import Select from "../Input/Select";

const UserForm = () => {
    const [users, setUsers] = useState({
        lastName: "",
        firstName: "",
        email: "",
        password: "",
        roles: [],
        address: "",
        zipcode: "",
        city: "",
        phoneNumber: ""
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
            setUsers({ ...users, [name]: [value] });
        }
        else {
            setUsers({ ...users, [name]: value });
        }
        setErrors({ ...errors, [name]: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await usersAPI.register(users);
            toast(users.firstName + " a été ajouté");
            setErrors("");
        } catch (error) {
            toast(error + "");
            if (error.response.data.violations) {
                const apiErrors = {};
                error.response.data.violations.forEach((violation) => {
                    apiErrors[violation.propertyPath] = violation.message;
                });
                setErrors(apiErrors);
            }
        }
    };

    const [roles, setRoles] = useState([
        'ROLE_ADMIN',
        'ROLE_WAITER',
        'ROLE_COOK']
    )

    return (
        <>

            <div className="row justify-content-center">
                <div className="col">
                    <div className="card mb-3">
                        <h2 className="card-header">
                            Enregistrer un nouvel utilisateur
                        </h2>
                        <div className="card-body">
                            <form className="form" onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col">
                                        <div className="row">
                                            <div className="col-sm-12 col-md-6">
                                                <Field
                                                    label="Nom"
                                                    name="lastName"
                                                    value={users.lastName}
                                                    onChange={handleChange}
                                                    placeholder="Nom"
                                                    error={errors.lastName}
                                                />
                                            </div>
                                            <div className="col-sm-12 col-md-6">
                                                <Field
                                                    label="Prénom"
                                                    name="firstName"
                                                    value={users.firstName}
                                                    onChange={handleChange}
                                                    placeholder="Prénom"
                                                    error={errors.firstName}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12 col-md-6">
                                                <Field
                                                    label="Adresse mail"
                                                    name="email"
                                                    className="manage"
                                                    value={users.email}
                                                    onChange={handleChange}
                                                    type="email"
                                                    placeholder="Email"
                                                    error={errors.email}
                                                    size="col-3"
                                                />
                                            </div>
                                            <div className="col-sm-12 col-md-6">
                                                <Field
                                                    label="Mot de passe"
                                                    name="password"
                                                    value={users.password}
                                                    onChange={handleChange}
                                                    type="password"
                                                    placeholder="Mot de Passe"
                                                    error={errors.password}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12 col-md-6">
                                                <Field
                                                    label="Adresse"
                                                    name="address"
                                                    value={users.address}
                                                    onChange={handleChange}
                                                    placeholder="Adresse"
                                                    error={errors.address}
                                                />
                                            </div>
                                            <div className="col-sm-12 col-md-6">
                                                <Field
                                                    label="Code postal"
                                                    name="zipcode"
                                                    value={users.zipcode}
                                                    onChange={handleChange}
                                                    placeholder="Code postal"
                                                    error={errors.zipcode}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12 col-md-6">
                                                <Field
                                                    label="Ville"
                                                    name="city"
                                                    value={users.city}
                                                    onChange={handleChange}
                                                    placeholder="Ville"
                                                    error={errors.city}
                                                />
                                            </div>
                                            <div className="col-sm-12 col-md-6">
                                                <Field
                                                    label="Numéro de téléphone"
                                                    name="phoneNumber"
                                                    className="manage"

                                                    value={users.phoneNumber}
                                                    onChange={handleChange}
                                                    placeholder="Numéro de téléphone"
                                                    error={errors.phoneNumber}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12 col-md-6">
                                                <Select onChange={handleChange} value={users.roles[0]} name={"roles"} label="Rôles" error={errors.roles} defaut={"Choisir un rôle..."}>
                                                    {roles.map((role, index) => <option value={role} key={index}>{role}</option>)}
                                                </Select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className="btn-primary btn mr-auto float-right"
                                    type="submit"
                                    disabled={
                                        !(
                                            users.firstName &&
                                            users.lastName &&
                                            users.email &&
                                            users.password &&
                                            users.zipcode &&
                                            users.city &&
                                            users.phoneNumber &&
                                            users.roles &&
                                            users.address
                                        )
                                    }
                                >
                                    Enregistrer
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default UserForm;