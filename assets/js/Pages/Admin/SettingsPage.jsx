import React, { useEffect, useRef, useState } from 'react';
import settingsAPI from '../../Services/settingsAPI';


const SettingsPage = () => {

    const [params, setParams] = useState({});
    const [active, setActive] = useState(false);

    const handleChange = async ({ currentTarget }) => {
        const { checked } = currentTarget;
        try {
            const rep = await settingsAPI.update(1, { isTrue: checked });
            setParams({ onlinePayment: rep.data.isTrue })
            setActive(false)
        } catch (error) {
            console.log(error)
        }
    }
    const fetchParams = async () => {
        try {
            const { label, isTrue } = await settingsAPI.findSetting(1);
            setParams({ [label]: isTrue });

        } catch (error) {

        }
    }
    useEffect(() => {
        fetchParams()
    }, [])


    return (
        <>
            <div className="row">
                <div className="col-sm-12 col-md-4">
                    <div className="card mb-3">

                        <h3 className="card-header">
                            Paramètres
                        <button className="float-right btn btn-sm btn-primary" onClick={() => setActive(a => !a)}><em className="fa fa-pencil"></em></button>
                        </h3>

                        <div className="card-body">
                            Paiement en ligne :
                            {!active && <>{params.onlinePayment && <b> Activé</b> || <b> Désactivé</b>}</>
                                ||
                                <input type="checkbox" defaultChecked={params.onlinePayment} onClick={(e) => handleChange(e)} disabled={!active} />}
                        </div>
                    </div>
                </div>
                <div className="col">
                </div>
            </div>
        </>
    );
}

export default SettingsPage;