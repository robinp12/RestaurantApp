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
            <div className="row justify-content-between footer">
                <small className="text-muted">
                    © Copyright 2020 Restaurant - All rights reserved
                </small>
                <small className="text-muted">
                    Front-End & Back-End by Robin Paquet
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