import React from "react";

const Header = ({ title, center, right, bool = true }) => {
    return (
        <>
            {/* Composant pour les titres de pages */}
            <div className="row mb-4 mt-1 pb-2 border-bottom justify-content-between align-items-center">
                <div className="col">
                    <h2 className="card-title">
                        <b><span className="display-5 mr-1">{title}</span></b>
                    </h2>
                </div>
                {center && <div className="col">
                    <small className="ml-3 text-muted">{center}</small>
                </div>}
                <div className="col">
                    {/* <small className="ml-3 float-right mr-4 text-violet">{"En développement ..."}</small> */}
                    <span className="float-right mr-4">{right}</span>
                </div>
            </div>
        </>
    );
};
export default Header;
