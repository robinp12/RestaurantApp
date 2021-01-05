import React, { useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/AuthContext";
import authAPI from "../Services/authAPI";

const Footer = ({ history, setCount, count }) => {

    const { isAuth, setIsAuth } = useContext(AuthContext);
    const handleLogout = () => {
        authAPI.logout();
        setIsAuth(false);
        toast.info("Déconnexion")
        history.push("/connexion")
    }

    const setLang = () => {
        switch (count) {
            case 1:
                return <><b>EN</b>|PT|FR</>
            case 2:
                return <><b>PT</b>|FR|EN</>
            default:
                return <><b>FR</b>|EN|PT</>
        }
    }

    const counte = () => {
        if (count < 2) {
            setCount(e => e + 1)
        }
        else {
            setCount(0)
        }
    }

    return (
        <>
            {/* Composant pour le footer */}
            <div className="row justify-content-between footer my-3">
                <div className="col-sm-12 col-md-4">
                    <button className={"btn btn-light btn-sm mr-3"} onClick={() => counte()}>
                        {setLang()}
                    </button>
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