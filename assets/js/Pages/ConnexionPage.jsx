import React, { useState } from "react";
import Field from "../Components/Form/Field";
import Header from '../Components/Header';
import authAPI from "../Services/authAPI";

const ConnexionPage = ({ onLogin, history }) => {

    const [showRegister, setShowRegister] = useState(false);
    const [login, setLogin] = useState({
        username: "",
        password: ""
    });
    const [error, setError] = useState("");


    //Mise ne place dans le state
    const handleChange = ({ currentTarget }) => {
        const { value, name } = currentTarget;
        setLogin({ ...login, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await authAPI.authenticate(login);
            setError("");
            onLogin(true);
            // toast("Connecté ! " + authAPI.getCurrent().firstName);
            history.replace("/clients");
        } catch (error) {
            // toast("Mauvais identifiants", {
            //     className: "bg-red",
            // });
            setError("Mauvais identifiants");
        }
    };

    return (
        <>
            <h2 className="card-title"><Header title={"Connexion"} /></h2>
            <div className="row justify-content-center">
                <form onSubmit={handleSubmit} className="loginFormBlock form">
                    <Field
                        label="Adresse mail"
                        name="username"
                        placeholder="Adresse mail"
                        value={login.username}
                        onChange={handleChange}
                        error={error}
                    />
                    <Field
                        label="Mot de passe"
                        name="password"
                        type="password"
                        placeholder="Mot de passe"
                        value={login.password}
                        onChange={handleChange}
                        error={error}
                    />
                    <div className="form-group float-right mt-2">
                        <button type="submit" className="btn-primary btn">Connexion</button>
                    </div>
                </form>
            </div>
            <br />
        </>
    );
};

export default ConnexionPage;