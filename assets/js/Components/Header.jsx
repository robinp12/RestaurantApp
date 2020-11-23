import React from "react";

const Header = ({ title, center, right }) => {
    return (
        <>
            {/* Composant pour les titres de pages */}
            <div className="mt-3 mb-4">
                <b>
                    <span className="display-5 mr-1">{title}</span>
                    <small className="ml-3 text-muted">{center}</small>
                    <span className="float-right mr-4">{right}</span>
                </b>
                <hr />
            </div>
        </>
    );
};
export default Header;
