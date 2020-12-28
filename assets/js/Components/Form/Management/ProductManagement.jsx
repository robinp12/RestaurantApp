import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import categoriesAPI from "../../../Services/categoriesAPI";
import productsAPI from "../../../Services/productsAPI";
import Field from "../Input/Field";
import Select from "../Input/Select";
import { toast } from "react-toastify";
import Axios from "axios";
import ProductForm from "./ProductForm";


let cle;

const ProductManagement = ({ setRefresh, refresh }) => {

    const [key, setKey] = useState(cle);
    cle = key;

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [update, setUpdate] = useState(false);

    const [product, setProduct] = useState({
        label: "",
        description: "",
        price: "",
        picture: "",
        category: ""
    });


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
    }, [])

    return (
        <>
            <div className="col-sm-12 col-md-6">
                <ProductForm categories={categories} refresh={refresh} setRefresh={setRefresh} product={product} setProduct={setProduct} update={update} setUpdate={setUpdate} />
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
                                                <a className="btn btn-secondary" onClick={() => { setProduct(prod); setUpdate(true) }}><em className="fa fa-pencil"></em></a>
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