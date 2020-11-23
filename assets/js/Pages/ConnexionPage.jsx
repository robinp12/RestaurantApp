import React, { useState } from "react";
import Field from "../Components/Form/Field";
import Header from '../Components/Header';

const ConnexionPage = () => {
    return (
        <>
            <h2 className="card-title"><Header title={"Connexion"} /></h2>
            <div className="row justify-content-center">
                <form className="loginFormBlock">
                    <Field
                        label="Adresse mail"
                        name="username"
                        placeholder="Adresse mail"
                    />
                    <Field
                        label="Mot de passe"
                        name="password"
                        type="password"
                        placeholder="Mot de passe"
                    />
                    <div className="form-group float-right mt-2">
                        <button className="btn-primary btn">Connexion</button>
                    </div>
                </form>
            </div>
            <br />
        </>
    );
};

export default ConnexionPage;