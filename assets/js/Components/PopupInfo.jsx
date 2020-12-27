import React from "react";
import Popup from "reactjs-popup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const infoIcon = <a><FontAwesomeIcon icon={faInfoCircle} pull="right" className="infoIcon" fixedWidth /></a>;

const PopupInfo = ({ info }) => {
    return (
        <Popup trigger={infoIcon} position="center left" closeOnDocumentClick defaultOpen={false} on={["hover"]}>
            <div className="popup p-2 bg-dark text-light">
                <span>{info}</span>
            </div>
        </Popup>
    );
};
export default PopupInfo;