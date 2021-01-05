import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import Field from "../../Components/Form/Input/Field";
import Header from '../../Components/Header';
import { AuthContext } from "../../Context/AuthContext";
import authAPI from "../../Services/authAPI";

const ConnexionPage = ({ history }) => {

    const { isAuth, setIsAuth } = useContext(AuthContext);

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
            setIsAuth(true);
            toast("Connecté ! " + authAPI.getCurrent().firstName);
            history.replace("/commandes");
        } catch (error) {
            toast("Mauvais identifiants", {
                className: "bg-red-toast",
            });
            setError("Mauvais identifiants");
        }
    };

    return (
        <>
            <Header title={"Connexion"} />
            <div className="row justify-content-center">
                <form onSubmit={handleSubmit} className="block">
                    <Field
                        label="Adresse mail"
                        name="username"
                        className="manage"
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
        </>
    );
};

export default ConnexionPage;