import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import AddUser from '../Components/Form/Add/AddUser';
import usersAPI from '../Services/usersAPI';

const UsersPage = () => {

    const [users, setUsers] = useState([]);
    const [userInfo, setUserInfo] = useState([]);
    const [addUser, setAddUser] = useState(false);

    const fetchUsers = async () => {
        try {
            const data = await usersAPI.getAllUsers();
            setUsers(data);
        } catch (error) {
            console.log(error.response);
            //   toast(error + "", {
            //     className: "bg-red",
            //   });
        }
    };
    useEffect(() => {
        fetchUsers();
    }, [])

    const handleDelete = async (id) => {
        const originUsers = [...users];

        setUsers(users.filter(user => user.id !== id));
        try {
            await usersAPI.deleteUsers(id);
            // toast("Utilisateur n°" + id + " supprimé", {
            //     className: "bg-red",
            // });
        } catch (error) {
            setUsers(originUsers);
            // toast(error + "", {
            //     className: "bg-red",
            // });
        }
    }


    return (
        <>
            <div className="row">
                <div className="col-12-sm col-4-md">
                    <table className="table table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th className=" align-middle">Utilisateur
                                </th>
                                <th>
                                    <button onClick={() => setAddUser(!addUser)} className="btn btn-primary float-right">+</button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => <tr key={user.id} onClick={() => {
                                setUserInfo(user)
                                setAddUser(false)
                            }}>
                                <td>{user.firstName} {user.lastName.toUpperCase()}</td>
                                <td></td></tr>)}
                        </tbody>
                    </table>
                </div>
                <div className="col">
                    {addUser &&
                        <>
                            <h2>Ajouter un utilisateur</h2>
                            <AddUser />
                        </>
                        ||
                        <>
                            <h2>Utilisateur <b>{userInfo.id}</b></h2>
                            {isNaN(userInfo) &&
                                <div className="row justify-content-center">
                                    <div className="col">
                                        <div className="form container p-4">
                                            <div className="row">
                                                <div className="col">
                                                    <span>Nom : {userInfo.lastName}</span><br />
                                                    <span>Prénom : {userInfo.firstName}</span><br />
                                                    <span>Téléphone : {userInfo.phoneNumber}</span><br />
                                                    <span>Email : {userInfo.email}</span><br />
                                                    <span>Rôle : {userInfo.roles}</span><br />
                                                </div>
                                                <div className="col">
                                                    <span>Adresse : {userInfo.address}</span><br />
                                                    <span>Ville : {userInfo.city}</span><br />
                                                    <span>Code postal : {userInfo.zipcode}</span><br />
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col">
                                                    {userInfo.length !== 0 && <button className="btn btn-primary" onClick={() => handleDelete(userInfo.id)}>Supprimer</button>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>}

                        </>
                    }
                </div>
            </div>
        </>
    );
}

export default UsersPage;