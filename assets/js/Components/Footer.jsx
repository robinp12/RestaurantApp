import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/AuthContext";
import authAPI from "../Services/authAPI";
import Select from "./Form/Input/Select";

const Footer = ({ history, setlangue, langue }) => {

    const { isAuth, setIsAuth } = useContext(AuthContext);
    const handleLogout = () => {
        authAPI.logout();
        setIsAuth(false);
        toast.info("Déconnexion")
        history.push("/connexion")
    }

    const handleChange = ({ currentTarget }) => {
        const { value } = currentTarget;
        setlangue(value);
    }
    const [lang, setLang] = useState([
        'FR',
        'NL',
        'EN',
        'DE',
        'PT'
    ]
    )

    return (
        <>
            {/* Composant pour le footer */}
            <div className="row justify-content-between footer my-3">
                <div className="col-sm-12 col-md-4">
                    <div className="row">
                        <div className="col-md-4">
                            <Select onChange={handleChange} value={langue} name={"langue"} defaut={"FR"}>
                                {lang.map((langue, index) => <option value={langue} key={index}>{langue}</option>)}
                            </Select>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-4 text-center">
                    <small className="text-muted">
                        Application developped by <b>Robin Paquet</b><br />
                    </small>
                    <small className="text-muted">
                        © Copyright 2020 Le Cheval Blanc - All rights reserved
                    </small>
                </div>
                <div className="col-sm-12 col-md-4 text-right">
                    {!isAuth &&
                        <a href="#connexion" className="small">Connexion</a>
                        ||
                        <a onClick={handleLogout} href="#" className="small">Deconnexion</a>
                    }
                </div>
            </div>
        </>
    );
};
export default Footer;