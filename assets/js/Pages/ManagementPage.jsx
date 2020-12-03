import CategoryManagement from "../Components/Form/Add/CategoryManagement";
import React, { useState } from 'react';
import ProductManagement from "../Components/Form/Add/ProductManagement";

const ManagementPage = () => {

    const [showCat, setShowCat] = useState(false);
    const [showProd, setShowProd] = useState(true);
    const [refresh, setRefresh] = useState(false);

    return (
        <>
            <div className="col">
                <div className="row">
                    <h4>Categories <button className="btn btn-dark btn-sm ml-3" onClick={() => setShowCat(!showCat)}>{showCat ? "-" : "+"}</button></h4>
                </div>
                <div className="row">
                    {showCat &&
                        <>
                            <CategoryManagement setRefresh={setRefresh} refresh={refresh} />
                        </>}
                </div>
                <div className="row border-top pt-3 mt-2 ">
                    <h4>Produits <button className="btn btn-dark btn-sm ml-3" onClick={() => setShowProd(!showProd)}>{showProd ? "-" : "+"}</button></h4>
                </div>
                <div className="row">
                    {showProd &&
                        <>
                            <ProductManagement setRefresh={setRefresh} refresh={refresh} />

                        </>
                    }
                </div>
            </div>
        </>
    );
}

export default ManagementPage;