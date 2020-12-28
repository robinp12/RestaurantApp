import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../../Components/Pagination';
import reservationsAPI from '../../Services/reservationsAPI';
import Loader from '../../Components/Loader';

const ReservationManagement = ({ match, history }) => {

    const { id } = match.params

    const [showCat, setShowCat] = useState(true);
    const [reservations, setReservations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [load, setLoad] = useState(true);

    const fetchAllReservations = async () => {

        try {
            const data = await reservationsAPI.getAllReservations();
            setReservations(data);
            setLoad(false);
            history.replace("/reservations/" + data[0]?.id)
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
    const handleChangePage = (page) => {
        setCurrentPage(page)
    }
    const itemsPerPage = 10;
    const paginated = Pagination.getData(reservations, currentPage, itemsPerPage)

    const paddingNumber = (num) => '#' + String(num).padStart(5, '0');

    return (
        <>
            {load &&
                <Loader />
                ||
                <div className="row">
                    <div className="col">
                        <table className="table table-responsive-md table-hover ">
                            <thead className="thead-dark">
                                <tr>
                                    <th className="text-center align-middle hidden-xs">ID</th>
                                    <th className="text-center align-middle">Client</th>
                                    <th className="text-center align-middle">Nombre de personne</th>
                                    <th className="text-center align-middle">Heure de réservation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginated.map(reservation => <tr key={reservation.id}
                                    onClick={() => history.replace("/reservations/" + reservation.id)}
                                >
                                    <th scope="row" className="text-center align-middle">{paddingNumber(reservation.chrono)}</th>
                                    <td className="text-center align-middle">{reservation.customer?.firstName} {reservation.customer?.lastName} </td>
                                    <td className="text-center align-middle">{reservation.peopleNumber} </td>
                                    <td className="text-center align-middle">{new Date(reservation.reservation_at).toLocaleString()}</td>
                                </tr>)}

                            </tbody>
                        </table>
                        {itemsPerPage < reservations.length && <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={reservations.length} onPageChanged={handleChangePage} />}

                    </div>
                    <div className="col">
                        {reservations.map(reservation =>
                            reservation.id == id &&
                            <div key={reservation.id} className="card mb-3">
                                <h3 className="card-header">
                                    <span>Réservation <b>{reservation.id}</b></span>
                                </h3>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-12 col-md-6">
                                            <span> Client : <Link to={`/clients/${reservation.customer.id}`}>{reservation.customer.firstName} {reservation.customer.lastName}</Link></span><br />
                                            <span> Nombre de personne : {reservation.peopleNumber}</span><br />
                                            <span> Date de réservation : {new Date(reservation.reservation_at).toLocaleString()}</span><br />
                                        </div>
                                        <div className="col-sm-12 col-md-6">
                                            <span> Date d'envoi : {new Date(reservation.sentAt).toLocaleString()}</span><br />
                                            <span> Commentaire : <br />
                                                {reservation.comment}</span>
                                        </div>
                                    </div>
                                    <button className="btn btn-secondary">{"Modifier"}</button>
                                    <button onClick={() => handleDelete(reservation.id)} className="btn btn-primary float-right">Supprimer</button>
                                </div>
                            </div>
                        )}

                    </div>
                </div>}
        </>
    );
}

export default ReservationManagement;