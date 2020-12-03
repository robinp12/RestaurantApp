import React, { useEffect, useState } from "react";
import Field from "../Field";
import productsAPI from "../../../Services/productsAPI";
import Select from "./Select";
import categoriesAPI from "../../../Services/categoriesAPI";
import { Tabs } from "react-bootstrap";


const ProductManagement = ({ setRefresh, refresh }) => {

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    const [product, setProduct] = useState({
        label: "",
        description: "",
        price: "",
        category: ""
    });

    const [errors, setErrors] = useState({
        label: "",
        description: "",
        price: "",
        category: ""
    });

    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        if (name == "price") {
            setProduct({ ...product, [name]: parseFloat(value) });
        }
        else {
            setProduct({ ...product, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(product)
        try {
            const rep = await productsAPI.add(product);
            // toast(users.firstName + " a été ajouté");
            setRefresh(!refresh);
            setErrors("");
        } catch (error) {
            console.log(error.response.data)
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
    const fetchProducts = async () => {
        try {
            const data = await productsAPI.getAllProducts();
            setProducts(data);
        } catch (error) {
            console.log(error.response);
            //   toast(error + "", {
            //     className: "bg-red",
            //   });
        }
    };
    const handleDeleteProduct = async (id) => {
        const originObjectToDelete = [...products];

        setProducts(products.filter(objectToDelete => objectToDelete.id !== id));
        try {
            await productsAPI.deleteProducts(id);
            // toast("Utilisateur n°" + id + " supprimé", {
            //     className: "bg-red",
            // });
        } catch (error) {
            setProducts(originObjectToDelete);
            // toast(error + "", {
            //     className: "bg-red",
            // });
        }
    }

    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, [refresh])

    return (
        <>
            <div className="col-6">
                <form className="form" onSubmit={handleSubmit}>
                    <div className="row m-1 p-3 border">
                        <div className="col">
                            <div className="row">
                                <div className="col">
                                    <Field
                                        label="Nom du produit"
                                        name="label"
                                        value={product.label}
                                        onChange={handleChange}
                                        placeholder="Produit"
                                        error={errors.label}
                                    />
                                </div>
                                <div className="col-4">
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
                                <div className="col-7">
                                    <Field
                                        label="Description du produit"
                                        name="description"
                                        value={product.description}
                                        onChange={handleChange}
                                        placeholder="Description"
                                        error={errors.description}
                                    />
                                </div>
                                <div className="col-5">
                                    <Select
                                        label="Nom de la catégorie"
                                        name="category"
                                        value={product.category}
                                        onChange={handleChange}
                                        placeholder="Catégorie"
                                        error={errors.category}
                                    >
                                        {categories.map((category, index) => <option value={"/api/categories/" + category.id} key={index}>{category.label}</option>)}
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
                <Tabs onSelect={() => setRefresh(!refresh)} id="controlled-tab">
                    {console.log(products)}
                    {categories.map((cat, index) =>
                        <Tabs key={index} eventKey={cat.label} title={cat.label}>
                            <table className="table table-hover">
                                <thead className="">
                                    <tr>
                                        <th className="text-center">Identifiant</th>
                                        <th className="text-center">Nom</th>
                                        <th className="text-center">Prix</th>
                                        <th className="text-center">Description</th>
                                        <th className="text-center"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((prod) =>
                                        cat.id == prod.category.id &&
                                        <tr key={prod.id}>
                                            <td className="text-center align-middle">{prod.id}</td>
                                            <td className="text-center align-middle">{prod.label}</td>
                                            <td className="text-center align-middle">{prod.price}€</td>
                                            <td className="text-center align-middle">{prod.description}</td>
                                            {/* <td>{prod.category.label}</td> */}
                                            <td><button className="btn btn-primary" onClick={() => handleDeleteProduct(prod.id)}>x</button></td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </Tabs>
                    )}
                </Tabs>
            </div>
        </>
    );
};
export default ProductManagement;