import React, { useState } from "react";
import { toast } from "react-toastify";
import productsAPI from "../../../Services/productsAPI";
import Field from "../Input/Field";
import Select from "../Input/Select";

const ProductForm = ({ categories, refresh, setRefresh, product, setProduct, update, setUpdate }) => {

    const [errors, setErrors] = useState({
        label: "",
        description: "",
        price: "",
        picture: "",
        category: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (update) {
            product.category = "/api/categories/" + product.category.id
            try {
                await productsAPI.updateInfo(product.id, product)
                toast(product.label + " a été modifié");
                setRefresh(!refresh);
                setErrors("");
            } catch (error) {
                console.error(error)
            }
        }

        else {
            try {
                await productsAPI.add(product);
                toast(product.label + " a été ajouté");
                setRefresh(!refresh);
                setErrors("");
            } catch (error) {
                console.log(error.response.data)
                toast("Erreur dans le formulaire !" + "");
                if (error.response.data.violations) {
                    const apiErrors = {};
                    error.response.data.violations.forEach((violation) => {
                        apiErrors[violation.propertyPath] = violation.message;
                    });
                    setErrors(apiErrors);
                }
            }
        }
    };
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        if (name == "price") {
            setProduct({ ...product, [name]: value });
        }
        else {
            setProduct({ ...product, [name]: value });
        }
        setErrors({ ...errors, [name]: "" });
    };

    return (
        <>
            <form className="form"
                onSubmit={handleSubmit}
            >
                <div className="row m-1 p-3 border">
                    <div className="col">
                        <div className="row">
                            <div className="col-sm-12 col-md-8">
                                <Field
                                    label="Nom du produit"
                                    name="label"
                                    value={product.label}
                                    onChange={handleChange}
                                    placeholder="Produit"
                                    error={errors.label}
                                />
                            </div>
                            <div className="col-sm-12 col-md-4">
                                <Field
                                    label="Prix"
                                    name="price"
                                    value={product.price}
                                    onChange={handleChange}
                                    placeholder="Prix"
                                    type="number"
                                    error={errors.price}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12 col-md-7">
                                <Field
                                    label="Description du produit"
                                    name="description"
                                    value={product.description}
                                    onChange={handleChange}
                                    placeholder="Description"
                                    error={errors.description}
                                />
                            </div>
                            <div className="col-sm-12 col-md-5">
                                <Select
                                    label="Nom de la catégorie"
                                    name="category"
                                    value={"/api/categories/" + product.category.id}
                                    onChange={handleChange}
                                    placeholder="Catégorie"
                                    error={errors.category}
                                >
                                    {categories.map((category, index) => <option value={"/api/categories/" + category.id} key={index}>{category.label}</option>)}
                                </Select>
                            </div>
                        </div>
                        <div className="row float-right">
                            <div className="col float-right">
                                {update && <button className="btn-secondary btn" onClick={() => ProductForm.update(setProduct, setUpdate)} disabled={false}>{"Annuler"}</button>}
                                <button className="btn-primary btn" type="submit" disabled={false}>{!update ? "Ajouter" : "Enregister"}</button>
                            </div>
                            {/* <input type="file" onChange={selectFile} />
                                <button onClick={upload}>Upload</button> */}
                        </div>
                    </div>
                </div>
            </form>

        </>
    );
};

ProductForm.update = (setProduct, setUpdate) => {
    setProduct({
        label: "",
        description: "",
        price: "",
        picture: "",
        category: ""
    });
    setUpdate(false);
}
export default ProductForm;