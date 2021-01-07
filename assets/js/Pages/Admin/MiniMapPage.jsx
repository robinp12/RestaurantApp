import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import invoicesAPI from '../../Services/invoicesAPI';

const MiniMapPage = () => {

    const [invoices, setInvoices] = useState([]);
    const [table, setTable] = useState({});

    const fetchInvoice = async () => {
        try {
            const rep = await invoicesAPI.getAllInvoices();
            setInvoices(rep);
        } catch (error) {
            console.error(error);
        }
    }

    const isOccuped = (table) => {
        for (let e in invoices) {
            let isToday = new Date(invoices[e].sentAt).toLocaleDateString() == new Date().toLocaleDateString();
            if (isToday && invoices[e].invoiceTable) {

                // Occupé pour les 2 prochaines heures
                if (new Date() <= new Date(new Date(invoices[e].sentAt).setMinutes(new Date(invoices[e].sentAt).getMinutes() + 90))) {
                    if (invoices[e].invoiceTable === table) {
                        return invoices[e];
                    }
                }
            }
        }
    }

    const status = (status) => {
        switch (status) {
            case "PAID":
                return "Payé";
            case "CANCELLED":
                return "Supprimé";
            default:
                return "En attente";
        }
    }
    useEffect(() => {
        fetchInvoice();
    }, [])

    return (
        <><div className="row">
            <div className="col">

                <div className="row text-center">
                    <div className="col-sm-12">
                        <h1>Pièce principale</h1>
                        <div style={{ height: "50vh" }}>
                            <svg height="500px" width="100%" className={"actif col-sm-12 col-md-8 svg"}>
                                <rect onClick={() => setTable(isOccuped(1))} fill={isOccuped(1) ? "#414141" : "#A1A1A1"} strokeWidth="5" x="1vw" y="20" width="12vw" height="10vh" id="1" />
                                <rect onClick={() => setTable(isOccuped(2))} fill={isOccuped(2) ? "#414141" : "#A1A1A1"} strokeWidth="5" x="16vw" y="20" width="5vw" height="12vh" id="2" />
                                <rect onClick={() => setTable(isOccuped(3))} fill={isOccuped(3) ? "#414141" : "#A1A1A1"} strokeWidth="5" x="22vw" y="20" width="5vw" height="12vh" id="3" />
                                <rect onClick={() => setTable(isOccuped(4))} fill={isOccuped(4) ? "#414141" : "#A1A1A1"} strokeWidth="5" x="28vw" y="20" width="5vw" height="12vh" id="4" />
                                <circle onClick={() => setTable(isOccuped(5))} fill={isOccuped(5) ? "#414141" : "#A1A1A1"} strokeWidth="5" r="85" cy="324" cx="136" id="5" />

                                <text onClick={() => setTable(isOccuped(1))} textAnchor="middle" fontSize="24" id="svg_2" y="80" x="7vw" fill="#000000">1</text>
                                <text onClick={() => setTable(isOccuped(2))} textAnchor="middle" fontSize="24" id="svg_8" y="93" x="18.7vw" fill="#000000">2</text>
                                <text onClick={() => setTable(isOccuped(3))} textAnchor="middle" fontSize="24" id="svg_3" y="93" x="24.5vw" fill="#000000">3</text>
                                <text onClick={() => setTable(isOccuped(4))} textAnchor="middle" fontSize="24" id="svg_4" y="93" x="30.5vw" fill="#000000">4</text>
                                <text onClick={() => setTable(isOccuped(5))} textAnchor="middle" fontSize="24" id="svg_9" y="332" x="135" fill="#000000">5</text>

                                <rect id="svg_18" height="145" width="270" y="332" x="366" strokeWidth="5" fill="#3f3f3f" />
                                <text textAnchor="middle" fontSize="24" id="svg_2" y="415" x="500" fill="#000000">Comptoir</text>
                            </svg >
                        </div>
                    </div >
                </div >
                <div className="row text-center mt-5">
                    <div className="col">

                        <Link to={`/factures/${table?.id ? table?.id : ""}`}><span> Facture {table?.id}</span><br /> </Link>
                        <span> Table : {table?.invoiceTable}</span><br />
                        <span> {table?.invoiceTable ? <b>Occupé</b> : <b>Libre</b>}</span><br />
                        <span> Status de la commande : {status(table?.status)}</span><br />
                        <span> Heure de première commande : {table?.sentAt ? new Date(table?.sentAt).toLocaleTimeString() : <></>}</span><br />
                        <span> Commandes : {table?.orders?.map((e, index) => <div key={index}><span>{e.label}</span><br /></div>)}</span><br />
                        <span className="lead"> Montant total : {table?.amount ? table?.amount + "€" : <></>}</span>

                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default MiniMapPage;