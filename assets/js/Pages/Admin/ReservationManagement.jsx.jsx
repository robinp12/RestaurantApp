import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import Field from '../../Components/Form/Input/Field';
import Loader from '../../Components/Loader';
import Pagination from '../../Components/Pagination';
import reservationsAPI from '../../Services/reservationsAPI';

const ReservationManagement = ({ match, history }) => {

    const { id } = match.params

    const [reservations, setReservations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [load, setLoad] = useState(true);
    const [search, setSearch] = useState("");

    const fetchAllReservations = async () => {

        try {
            const data = await reservationsAPI.getAllReservations();
            setReservations(data);
            setLoad(false);
        } catch (error) {
            console.log(error.response)
        }
    }
    const handleDelete = async (id) => {
        const originValue = [...reservations];

        setReservations(reservations.filter(reservation => reservation.id !== id));
        try {
            await reservationsAPI.deleteReservations(id)
            toast("Réservation n°" + id + " supprimé");
            history.replace("/reservations/" + reservations[0].id)

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

    const handleSearch = ({ currentTarget }) => {
        setSearch(currentTarget.value)
        setCurrentPage(1)
    }
    const filtered = reservations.filter(c =>
        c.customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
        c.customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
        c.customer.email.toLowerCase().includes(search.toLowerCase())
    );
    const paginated = Pagination.getData(filtered, currentPage, itemsPerPage)

    const paddingNumber = (num) => '#' + String(num).padStart(5, '0');

    return (
        <>
            {load &&
                <Loader />
                ||
                <div className="row">
                    <div className="col">
                        <Field placeholder={"Chercher une réservation ..."} onChange={handleSearch} value={search} className="form-control" />

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
                                {paginated.map(reservation => <tr key={reservation.id} className={reservation.id == id ? "actif" : ""}
                                    onClick={() => history.replace("/reservations/" + reservation.id)}
                                >
                                    <th scope="row" className="text-center align-middle">{paddingNumber(reservation.id)}</th>
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
                                            <span> {lang.customer} : <Link to={`/clients/${reservation.customer.id}`}>{reservation.customer.firstName} {reservation.customer.lastName}</Link></span><br />
                                            <span> {lang.peopleNumber} : {reservation.peopleNumber}</span><br />
                                            <span> {lang.reservationDate} : {new Date(reservation.reservation_at).toLocaleString()}</span><br />
                                        </div>
                                        <div className="col-sm-12 col-md-6">
                                            <span> {lang.sendingDate} : {new Date(reservation.sentAt).toLocaleString()}</span><br />
                                            <span> {lang.comment} : <br />
                                                {reservation.comment}</span>
                                        </div>
                                    </div>
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