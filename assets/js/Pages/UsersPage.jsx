import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const UsersPage = () => {

    const [users, setUsers] = useState([]);
    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/users")
            .then(rep => rep.data["hydra:member"])
            .then(data => setUsers(data))
            .catch(err => console.log(err.response));
    }, [])

    const handleDelete = (id) => {
        const originUsers = [...users];

        setUsers(users.filter(user => user.id !== id));

        axios
            .delete("http://localhost:8000/api/users/" + id)
            .then(rep => console.log("supp"))
            .catch(err => {
                setUsers(originUsers);
                console.log(err.response);
            });
        ;
    }


    return (
        <>
            <div className="row">
                <div className="col">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Utilisateur</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => <tr key={user.id} onClick={() => setUserInfo(user)}>
                                <td>{user.firstName} {user.lastName.toUpperCase()}</td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
                <div className="col">
                    <h2>Utilisateur</h2>
                    <div className="row">
                        <div className="col">
                            <span>{userInfo.id}</span><br />
                            <span>{userInfo.lastName}</span><br />
                            <span>{userInfo.firstName}</span><br />
                            <span>{userInfo.phoneNumber}</span><br />
                            <span>{userInfo.address}</span><br />
                            <span>{userInfo.city}</span><br />
                            <span>{userInfo.zipcode}</span><br />
                            <span>{userInfo.roles}</span><br />
                            <span>{userInfo.email}</span><br />

                        </div>
                        <div className="col">
                            {userInfo.length !== 0 && <button className="btn btn-primary" onClick={() => handleDelete(userInfo.id)}>Supprimer</button>}
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default UsersPage;