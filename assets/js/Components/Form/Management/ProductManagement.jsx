import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import categoriesAPI from "../../../Services/categoriesAPI";
import productsAPI from "../../../Services/productsAPI";
import Field from "../Input/Field";
import Select from "../Input/Select";
import { toast } from "react-toastify";
import Axios from "axios";


let cle;

const ProductManagement = ({ setRefresh, refresh }) => {

    const [key, setKey] = useState(cle);
    cle = key;

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    const [product, setProduct] = useState({
        label: "",
        description: "",
        price: 0,
        picture: "",
        category: "api/categories/52"
    });


    const [errors, setErrors] = useState({
        label: "",
        description: "",
        price: "",
        picture: "",
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
            toast(product.label + " a été ajouté");
            setRefresh(!refresh);
            setErrors("");
        } catch (error) {
            console.log(error.response.data)
            toast("Erreur dans le formulaire !" + "", {
                className: "bg-red",
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
            const rep = await productsAPI.deleteProducts(id);

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
                <form className="form"
                    onSubmit={handleSubmit}
                >
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
                                {/* <input type="file" onChange={selectFile} />
                                <button onClick={upload}>Upload</button> */}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="col">
                <Tabs id="controlled-tab" activeKey={key} onSelect={(k) => setKey(k)}>
                    {categories.map((cat, index) =>
                        <Tab key={index} eventKey={cat.label} title={cat.label}>
                            <table className="table table-responsive-md table-hover ">
                                <thead className="thead-dark">
                                    <tr>
                                        <th className="text-center hidden-xs">ID</th>
                                        <th className="text-center">Nom</th>
                                        <th className="text-center">Prix</th>
                                        <th className="text-center">Description</th>
                                        <th className="text-center"><em className="fa fa-cog"></em></th>
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
                                            <td align="center">
                                                <a className="btn btn-secondary"><em className="fa fa-pencil"></em></a>
                                                <a className="btn btn-primary" onClick={() => handleDeleteProduct(prod.id)}><em className="fa fa-trash"></em></a>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </Tab>
                    )}
                </Tabs>
            </div>
        </>
    );
};
export default ProductManagement;