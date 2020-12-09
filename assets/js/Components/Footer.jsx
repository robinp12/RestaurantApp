import React from "react";
import authAPI from "../Services/authAPI";

const Footer = ({ isAuth, onLogout, history }) => {

    const handleLogout = () => {
        authAPI.logout();
        onLogout(false);
        history.push("/connexion")
    }

    return (
        <>
            {/* Composant pour le footer */}
            <div className="row justify-content-between footer my-3">
                <small className="text-muted">
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