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
                <small className="text-muted">
                    <button className={"btn btn-light btn-sm mr-3"} onClick={() => setLanguage(!language)}>{language && <><b>FR</b>|EN</> || <><b>EN</b>|FR</>}</button>
                    © Copyright 2020 Le Cheval Blanc - All rights reserved
                </small>
                <small className="text-muted">
                    Application developped by <b>Robin Paquet</b>
                </small>
                {!isAuth &&
                    <a href="#connexion" className="small">
                        Connexion
                </a>
                    ||
                    <a onClick={handleLogout} className="small">
                        Deconnexion
                </a>
                }
            </div>
        </>
    );
};
export default Footer;