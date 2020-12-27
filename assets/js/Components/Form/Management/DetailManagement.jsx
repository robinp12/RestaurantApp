import React, { useEffect, useState } from "react";
import detailsAPI from "../../../Services/detailsAPI";
import Field from "../Input/Field";
import { toast } from "react-toastify";

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
        setErrors({ ...errors, [name]: "" });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(detail)
        try {
            const rep = await detailsAPI.add(detail);
            toast(detail.label + " ajouté");
            setErrors("");
            setRefresh(!refresh);
            console.log(rep)
        } catch (error) {
            toast("Erreur dans le formulaire !" + "", {
                className: "bg-red-toast",
            });
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
            toast(error + "", {
                className: "bg-red-toast",
            });
        }
    };

    const handleDeleteDetail = async (id) => {
        const originObjectToDelete = [...details];

        setDetails(details.filter(objectToDelete => objectToDelete.id !== id));
        try {
            await detailsAPI.deleteDetails(id);
            setRefresh(!refresh);
            toast("Element n°" + id + " supprimé", {
                className: "bg-red-toast",
            });
        } catch (error) {
            setDetails(originObjectToDelete);
            toast(error + "", {
                className: "bg-red-toast",
            });
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
                                        id="label2"
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
                <table className="table table-hover ">
                    <thead className="thead-dark">
                        <tr>
                            <th className="text-center hidden-xs">ID</th>
                            <th className="text-center">Détail</th>
                            <th className="text-center"><em className="fa fa-cog"></em></th>
                        </tr>
                    </thead>
                    <tbody>
                        {details.map((e, index) =>
                            <tr key={index}>
                                <td className="text-center align-middle">{e.id}</td>
                                <td className="text-center align-middle">{e.label}</td>
                                <td align="center">
                                    <a className="btn btn-secondary"><em className="fa fa-pencil"></em></a>
                                    <a className="btn btn-primary" onClick={() => handleDeleteDetail(order.id)}><em className="fa fa-trash"></em></a>
                                </td>
                            </tr>)}
                    </tbody>
                </table>
            </div>
        </>
    );
};
export default DetailManagement;