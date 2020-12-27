import React from "react";
import Popup from "reactjs-popup";

const PopupInfo = ({ info }) => {
    return (
        <Popup trigger={<i className="fa fa-info-circle fa-sm" aria-hidden="true"></i>} position="center left" closeOnDocumentClick defaultOpen={false} on={["hover"]}>
            <div className="popup p-2 bg-dark text-light">
                <span>{info}</span>
            </div>
        </Popup>
    );
};
export default PopupInfo;