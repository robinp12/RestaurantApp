import React from 'react';
const OrderSummary = ({ reservation = false, client }) => {
    return (
        <>
            <h3>Résumé</h3>
            <div className="row">
                <div className="col d-flex flex-column m-2">
                    <span>Nom : <b>{client.lastName}</b></span>
                    <span>Prénom : <b>{client.firstName}</b></span>
                    <span>Adresse mail : <b>{client.email}</b></span>
                    <span>Numéro de téléphone : <b>{client.phoneNumber}</b></span>
                    <span>Adresse : <b>{client.address}</b></span>
                    <span>Ville : <b>{client.city}</b></span>
                    <span>Code Postal : <b>{client.zipcode}</b></span>
                    <span>Date : </span>
                    <span>Heure : </span>
                    {reservation && (<span>Nombre de personne :</span>)}
                </div>
            </div>
        </>);
}

export default OrderSummary;