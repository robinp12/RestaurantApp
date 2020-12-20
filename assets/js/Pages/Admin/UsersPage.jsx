import React, { useEffect, useState } from 'react';
import UserForm from '../../Components/Form/Management/UserForm';
import usersAPI from '../../Services/usersAPI';

const UsersPage = ({ match, history }) => {
    const { id } = match.params


    const [users, setUsers] = useState([]);
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
                    <table className="table table-responsive-md table-hover ">
                        <thead className="thead-dark">
                            <tr>
                                <th className="text-center hidden-xs align-middle">ID</th>
                                <th className="text-center align-middle">Client</th>
                                <th className="text-center align-middle">
                                    <button onClick={() => setAddUser(!addUser)} className="btn btn-sm btn-primary float-right">+</button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => <tr key={user.id} onClick={() => {
                                history.replace("/utilisateurs/" + user.id)
                                setAddUser(false)
                            }}>
                                <th scope="row" className="text-center">#{user.id}</th>
                                <td className="text-center"> {user.firstName} {user.lastName.toUpperCase()}</td>
                                <td align="center" className="text-center">
                                    <a className="btn btn-primary" onClick={() => handleDelete(user.id)}><em className="fa fa-trash"></em></a>
                                </td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
                <div className="col">
                    {addUser &&
                        <>
                            <h2>Ajouter un utilisateur</h2>
                            <UserForm />
                        </>
                        ||
                        <>
                            {users.map(userInfo =>
                                userInfo.id == id &&
                                <div key={userInfo.id}>
                                    <h2>Utilisateur <b>{userInfo.id}</b></h2>
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

                                    </div>
                                </div>)}

                        </>
                    }
                </div>
            </div>
        </>
    );
}

export default UsersPage;