import CategoryManagement from "../../Components/Form/Management/CategoryManagement";
import React, { useState } from 'react';
import ProductManagement from "../../Components/Form/Management/ProductManagement";
import DetailManagement from "../../Components/Form/Management/DetailManagement";

const ManagementPage = () => {

    const [refresh, setRefresh] = useState(true);

    const [showCat, setShowCat] = useState(false);
    const [showProd, setShowProd] = useState(false);
    const [showDet, setShowDet] = useState(true);

    const ManagementPart = ({ title, className, setShow, show, children }) => {
        return (
            <>
                <div className={className}>
                    <h4>{title} <button className="btn btn-dark btn-sm ml-3" onClick={() => setShow(!show)}>{show ? "-" : "+"}</button></h4>
                </div>
                <div className="row">
                    {show && <>{children}</>}
                </div>
            </>
        )
    }

    return (
        <>
            <div className="col">
                <ManagementPart title={"Categories"} className={"row"} setShow={setShowCat} show={showCat} >
                    <CategoryManagement setRefresh={setRefresh} refresh={refresh} />
                </ManagementPart>
                <ManagementPart title={"Produits"} className={"row border-top pt-3 mt-2"} setShow={setShowProd} show={showProd} >
                    <ProductManagement setRefresh={setRefresh} refresh={refresh} />
                </ManagementPart>
                <ManagementPart title={"Détails"} className={"row border-top pt-3 mt-2"} setShow={setShowDet} show={showDet} >
                    <DetailManagement setRefresh={setRefresh} refresh={refresh} />
                </ManagementPart>
            </div>
        </>
    );
}

export default ManagementPage;