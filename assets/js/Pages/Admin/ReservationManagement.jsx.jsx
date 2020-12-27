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
    const handleDelete = async (id) => {
        const originValue = [...reservations];

        setReservations(reservations.filter(user => user.id !== id));
        try {
            await reservationsAPI.deleteReservations(id)
            history.replace("/reservations/" + reservations[reservations.length - 1 - 1].i)

        } catch (error) {
            setReservations(originValue);
        }
    }

    useEffect(() => {
        fetchAllReservations()
    }, [])
    const zeroPad = (num) => '#' + String(num).padStart(5, '0');

    return (
        <>
            <div className="row">
                <div className="col-12-sm col-4-md">
                    <table className="table table-responsive-md table-hover ">
                        <thead className="thead-dark">
                            <tr>
                                <th className="text-center hidden-xs">ID</th>
                                <th className="text-center">Client</th>
                                <th className="text-center">Nombre de personne</th>
                                <th className="text-center">Heure de réservation</th>
                                <th className="text-center">Description</th>
                                <th className="text-center"><em className="fa fa-cog"></em></th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations.map(reservation => <tr key={reservation.id}
                                onClick={() => history.replace("/reservations/" + reservation.chrono)}
                            >
                                <th scope="row" className="text-center align-middle">{zeroPad(reservation.chrono)}</th>
                                <td className="text-center align-middle">{reservation.customer?.firstName} {reservation.customer?.lastName} </td>
                                <td className="text-center align-middle">{reservation.peopleNumber} </td>
                                <td className="text-center align-middle">{new Date(reservation.reservation_at).toLocaleString()}</td>
                                <td className="text-center align-middle">{reservation.comment}</td>
                                <td align="center">
                                    <a className="btn btn-secondary"><em className="fa fa-pencil"></em></a>
                                    <a className="btn btn-primary" onClick={() => handleDelete(reservation.id)}><em className="fa fa-trash"></em></a>
                                </td>
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