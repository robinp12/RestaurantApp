import React from 'react';
import Field from './Field';

const ClientForm = () => {
    return (
        <>
            <div className="row">
                <div className="col">
                    <Field label="Nom" placeholder="Nom" />
                </div>
                <div className="col">
                    <Field label="Prénom" placeholder="Prénom" />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Field label="Adresse mail" type="email" placeholder="Adresse mail" />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Field label="Adresse" placeholder="Adresse" />
                    <Field label="Code postal" placeholder="Code postal" />
                </div>
                <div className="col">
                    <Field label="Ville" placeholder="Ville" />
                    <Field label="Numéro de téléphone" placeholder="Numéro de téléphone" />
                </div>
            </div>
        </>);
}

export default ClientForm;