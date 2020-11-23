import React from 'react';
const OrderSummary = ({ reservation = false }) => {
    return (
        <>
            <h3>Résumé</h3>
            <div className="row">
                <div className="col d-flex flex-column m-2">
                    <span>Nom :</span>
                    <span>Prénom :</span>
                    <span>Adresse mail :</span>
                    <span>Numéro de téléphone :</span>
                    <span>Adresse :</span>
                    <span>Ville :</span>
                    <span>Code Postal :</span>
                    <span>Date :</span>
                    <span>Heure :</span>
                    {reservation && (<span>Nombre de personne :</span>)}
                </div>
            </div>
        </>);
}

export default OrderSummary;