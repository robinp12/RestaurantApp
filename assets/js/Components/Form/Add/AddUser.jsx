import React, { useState } from "react";
import usersAPI from "../../../Services/usersAPI";
import Field from "../Field";
import Select from "./Select";

const AddUser = () => {
    const [users, setUsers] = useState({
        lastName: "",
        firstName: "",
        email: "",
        password: "",
        roles: undefined,
        address: "",
        zipcode: "",
        city: "",
        phoneNumber: ""
    });
    console.log(users);
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
        setUsers({ ...users, [name]: value });
    };
    const handleChangeRoles = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setUsers({ ...users, [name]: [value] });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(users)
        try {
            const rep = await usersAPI.register(users);
            // toast(users.firstName + " a été ajouté");
            setErrors("");
            console.log(rep)
        } catch (error) {
            console.log(error.response)
            // toast("Erreur dans le formulaire !" + "", {
            //     className: "bg-red",
            // });
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
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="row m-1 p-1 border border-dark">
                            <div className="col">
                                <div className="row">
                                    <div className="col">
                                        <Field
                                            label="Nom"
                                            name="lastName"
                                            value={users.lastName}
                                            onChange={handleChange}
                                            placeholder="Nom"
                                            error={errors.lastName}
                                        />
                                    </div>
                                    <div className="col">
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
                                    <div className="col-7">
                                        <Field
                                            label="Adresse mail"
                                            name="email"
                                            value={users.email}
                                            onChange={handleChange}
                                            type="email"
                                            placeholder="Email"
                                            error={errors.email}
                                            size="col-3"
                                        />
                                    </div>
                                    <div className="col-5">
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
                            </div>

                        </div>
                        <div className="row m-1 mt-3 p-1 border border-dark">
                            <div className="col">
                                <div className="row">
                                    <div className="col-7">
                                        <Field
                                            label="Adresse"
                                            name="address"
                                            value={users.address}
                                            onChange={handleChange}
                                            placeholder="Adresse"
                                            error={errors.address}
                                        />
                                    </div>
                                    <div className="col-5">
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
                                    <div className="col">
                                        <Field
                                            label="Ville"
                                            name="city"
                                            value={users.city}
                                            onChange={handleChange}
                                            placeholder="Ville"
                                            error={errors.city}
                                        />
                                    </div>
                                    <div className="col">
                                        <Field
                                            label="Numéro de téléphone"
                                            name="phoneNumber"
                                            value={users.phoneNumber}
                                            onChange={handleChange}
                                            placeholder="Numéro de téléphone"
                                            error={errors.phoneNumber}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-5 mb-2">

                                        <Select onChange={handleChangeRoles} value={users.roles} name={"roles"} label="Rôles" error={errors.roles} defaut="">
                                            {roles.map((role, index) => <option value={role} key={index}>{role}</option>)}
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="col">
                            <div className="row">
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
                                    Ajouter
                  </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
export default AddUser;