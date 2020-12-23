import React, { useState } from 'react';
import { useEffect } from 'react';
import reservationsAPI from '../../Services/reservationsAPI';

const ReservationManagement = ({ match, history }) => {

    const { id } = match.params

    const [showCat, setShowCat] = useState(true);
    const [reservations, setReservations] = useState([]);

    const fetchAllReservations = async () => {

        try {
            const data = await reservationsAPI.getAllReservations();

            setReservations(data);
        } catch (error) {
            console.log(error.response)

        }
    }

    useEffect(() => {
        fetchAllReservations()
    }, [])

    return (
        <>
            <div className="row">
                <div className="col-12-sm col-4-md">
                    <table className="table table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th className=" align-middle">Numéro réservation</th>
                                <th>Client</th>
                                <th>Nombre de personne</th>
                                <th>Heure d'envoi</th>

                            </tr>
                        </thead>
                        <tbody>
                            {reservations.map(reservation => <tr key={reservation.id} onClick={() => {
                                history.replace("/utilisateurs/" + reservation.id)
                            }}>
                                {console.log(reservation)
                                }
                                <td>{reservation.chrono}</td>
                                <td>{reservation.customer?.firstName} {reservation.customer?.lastName}</td>
                                <td>{reservation.peopleNumber}</td>
                                <td>{reservation.sentAt}</td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
                <div className="col">

                </div>
            </div>
        </>
    );
}

export default ReservationManagement;