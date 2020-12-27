import React, { useState } from 'react';
import CategoryManagement from "../../Components/Form/Management/CategoryManagement";
import DetailManagement from "../../Components/Form/Management/DetailManagement";
import ProductManagement from "../../Components/Form/Management/ProductManagement";

const ManagementPage = () => {

    const [refresh, setRefresh] = useState(true);

    const [showCat, setShowCat] = useState(false);
    const [showProd, setShowProd] = useState(true);
    const [showDet, setShowDet] = useState(true);

    const ManagementPart = ({ title, className, setShow, show, children }) => {
        return (
            <>
                <div className={className}>
                    <h4>{title} <button className="btn btn-dark btn-sm ml-3" onClick={() => setShow(!show)}>{show ? <i className="fa fa-caret-down" aria-hidden="true"></i> : <i className="fa fa-caret-right" aria-hidden="true"></i>
                    }</button></h4>
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