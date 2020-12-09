import React, { useEffect, useState } from "react";
import detailsAPI from "../../../Services/detailsAPI";
import Field from "../Input/Field";
import Select from "../Input/Select";

const DetailManagement = ({ setRefresh, refresh }) => {

    const [detail, setDetail] = useState({
        label: "",
    });
    const [errors, setErrors] = useState({
        label: "",
    });
    const [details, setDetails] = useState([]);

    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setDetail({ ...detail, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(detail)
        try {
            const rep = await detailsAPI.add(detail);
            // toast(users.firstName + " a été ajouté");
            setErrors("");
            setRefresh(!refresh);
            console.log(rep)
        } catch (error) {
            // toast("Erreur dans le formulaire !" + "", {
            //     className: "bg-red",
            // });
            if (error.response.data.violations) {

                const apiErrors = {};
                error.response.data.violations.forEach((violation) => {
                    apiErrors[violation.propertyPath] = violation.message;
                });
                setErrors(apiErrors);
            }
        }
    };
    const fetchDetails = async () => {
        try {
            const data = await detailsAPI.getAllDetails();

            setDetails(data);
        } catch (error) {
            console.log(error.response);
            //   toast(error + "", {
            //     className: "bg-red",
            //   });
        }
    };

    const handleDeleteDetail = async (id) => {
        const originObjectToDelete = [...details];

        setDetails(details.filter(objectToDelete => objectToDelete.id !== id));
        try {
            await detailsAPI.deleteDetails(id);
            setRefresh(!refresh);
            // toast("Utilisateur n°" + id + " supprimé", {
            //     className: "bg-red",
            // });
        } catch (error) {
            setDetails(originObjectToDelete);
            // toast(error + "", {
            //     className: "bg-red",
            // });
        }
    }
    useEffect(() => {
        fetchDetails();
    }, [refresh])

    let arr = Array(1, 2, 3, 4, 5, 6, 7, 8, 9);

    return (
        <>
            <div className="col">
                <form className="form" onSubmit={handleSubmit}>
                    <div className="row m-1 p-3 border">
                        <div className="col">
                            <div className="row">
                                <div className="col">
                                    <Field
                                        label="Nom de détail"
                                        name="label"
                                        id="label1"
                                        value={detail.label}
                                        onChange={handleChange}
                                        placeholder="Nom"
                                        error={errors.label}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <button className="btn-primary btn float-right" type="submit" disabled={false}>Ajouter</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
            <div className="col">
                <table className="table table-hover">
                    <thead className="">
                        <tr>
                            <th className="text-center">Id</th>
                            <th className="text-center">Détail</th>
                            <th className="text-center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {details.map((e, index) =>
                            <tr key={index}>
                                <td className="text-center align-middle">{e.id}</td>
                                <td className="text-center align-middle">{e.label}</td>
                                <td className="text-center align-middle"><button className="btn btn-primary" onClick={() => handleDeleteDetail(e.id)}>x</button></td>
                            </tr>)}
                    </tbody>
                </table>
            </div>
        </>
    );
};
export default DetailManagement;