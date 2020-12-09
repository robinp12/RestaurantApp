import React, { useEffect, useState } from "react";
import categoriesAPI from "../../../Services/categoriesAPI";
import Field from "../Input/Field";
import Select from "../Input/Select";

const CategoryManagement = ({ setRefresh, refresh }) => {

    const [category, setCategory] = useState({
        label: "",
        position: ""
    });
    const [errors, setErrors] = useState({
        label: "",
        position: ""
    });
    const [categories, setCategories] = useState([]);

    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setCategory({ ...category, [name]: value });
    };
    const handleChangeCategory = async (id, e) => {
        const { value } = e.currentTarget;
        try {
            const rep = await categoriesAPI.update(id, value, categories);
            setCategory({ ...category, position: value });

        } catch (error) {
            console.log(error);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(category)
        try {
            const rep = await categoriesAPI.add(category);
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
    const fetchCategories = async () => {
        try {
            const data = await categoriesAPI.getAllCategories();

            setCategories(data);
        } catch (error) {
            console.log(error.response);
            //   toast(error + "", {
            //     className: "bg-red",
            //   });
        }
    };

    const handleDeleteCategory = async (id) => {
        const originObjectToDelete = [...categories];

        setCategories(categories.filter(objectToDelete => objectToDelete.id !== id));
        try {
            await categoriesAPI.deleteCategories(id);
            setRefresh(!refresh);
            // toast("Utilisateur n°" + id + " supprimé", {
            //     className: "bg-red",
            // });
        } catch (error) {
            setCategories(originObjectToDelete);
            // toast(error + "", {
            //     className: "bg-red",
            // });
        }
    }
    useEffect(() => {
        fetchCategories();
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
                                        label="Nom de catégorie"
                                        name="label"
                                        id="label1"
                                        value={category.label}
                                        onChange={handleChange}
                                        placeholder="Catégorie"
                                        error={errors.label}
                                    />
                                </div>
                                <div className="col-4">
                                    <Select
                                        label="Position dans le menu"
                                        name="position"
                                        onChange={handleChange}
                                        placeholder="Position"
                                        error={errors.position}

                                    >
                                        {arr.map((arr) =>
                                            !categories.map(cat => cat.position).includes(arr) &&
                                            <option key={arr} value={arr}>{arr}</option>
                                        )}
                                    </Select>
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
                            <th className="text-center">Position</th>
                            <th className="text-center">Catégorie</th>
                            <th className="text-center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((cat, index) =>
                            <tr key={index}>
                                <td className="text-center align-middle">{cat.id}</td>
                                <td className="text-center">
                                    <div className="col-md-5 mx-auto">
                                        <Select
                                            name="position"
                                            onChange={(e) => { handleChangeCategory(cat.id, e) }}
                                            placeholder="Position"
                                            defaut={cat.position}
                                        >
                                            {arr.map((arr) =>
                                                !categories.map(cat => cat.position).includes(arr) &&
                                                <option key={arr} value={arr}>{arr}</option>
                                            )}
                                        </Select>
                                    </div>
                                </td>
                                <td className="text-center align-middle">{cat.label}</td>
                                <td className="text-center align-middle"><button className="btn btn-primary" onClick={() => handleDeleteCategory(cat.id)}>x</button></td>

                            </tr>)}
                    </tbody>
                </table>
            </div>
        </>
    );
};
export default CategoryManagement;