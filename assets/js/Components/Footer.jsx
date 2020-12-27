import React, { useContext } from "react";
import { toast } from "react-toastify";
import authAPI from "../Services/authAPI";
import { AuthContext } from "../Context/AuthContext";
import { LangContext } from "../Context/LangContext";

const Footer = ({ history }) => {

    const { isAuth, setIsAuth } = useContext(AuthContext);
    const { language, setLanguage } = useContext(LangContext);
    const handleLogout = () => {
        authAPI.logout();
        setIsAuth(false);
        toast.info("Déconnexion")
        history.push("/connexion")
    }

    return (
        <>
            {/* Composant pour le footer */}
            <div className="row justify-content-between footer my-3">
                <div className="col-sm-12 col-md-4">
                    <button className={"btn btn-light btn-sm mr-3"} onClick={() => setLanguage(!language)}>{language && <><b>FR</b>|EN</> || <><b>EN</b>|FR</>}</button>
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