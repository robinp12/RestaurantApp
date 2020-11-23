import React from "react";

const Footer = () => {
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
                <a href="#connexion"><small className="text-primary">
                    Connexion
                </small>
                </a>
            </div>
        </>
    );
};
export default Footer;