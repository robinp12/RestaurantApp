import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import PopupInfo from './PopupInfo';

const infoIcon = <FontAwesomeIcon icon={faInfoCircle} pull="right" className="infoIcon align-middle" fixedWidth />;


const Menu = () => {
    return (
        <>
            <div className="card-text">
                <div className="row">
                    <div className="col">
                        <h4 className="display-5 my-3" id="plats">Plats</h4>
                        <ul className="list-group">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                Cras justo odio
                                <span className="lead">10.00€</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                Dapibus ac facilisis in
                                <span className="lead">1.00€</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                Morbi leo risus
                                <span className="lead">1.00€</span>
                            </li>
                        </ul>
                    </div>
                    <div className="col">
                        <h4 className="display-5 my-3">Suggestions du moment</h4>
                        <ul className="list-group">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <span>Cras justo odio <PopupInfo info={"Information sur le plat"}>{infoIcon}</PopupInfo></span>
                                <span className="lead">10.00€</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <span> Dapibus ac facilisis in {infoIcon}</span>
                                <span className="lead"> 1.00€</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <span>Morbi leo risus {infoIcon}</span>
                                <span className="lead">1.00€</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <h4 className="display-5 my-3" id="boissons">Boissons</h4>
                        <ul className="list-group">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                Cras justo odio
                                <span className="lead">10.00€</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                Dapibus ac facilisis in
                                <span className="lead">1.00€</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                Morbi leo risus
                                <span className="lead">1.00€</span>
                            </li>
                        </ul>
                    </div>
                    <div className="col">
                        <h4 className="display-5 my-3">Vins</h4>
                        <ul className="list-group">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                Cras justo odio
                                        <span className="lead">10.00€</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                Dapibus ac facilisis in
                                        <span className="lead">1.00€</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                Morbi leo risus
                                        <span className="lead">1.00€</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col">


                        <h4 className="display-5 my-3">Desserts</h4>
                        <ul className="list-group">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                Cras justo odio
                                <span className="lead">10.00€</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                Dapibus ac facilisis in
                                <span className="lead">1.00€</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                Morbi leo risus
                                <span className="lead">1.00€</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>);
}

export default Menu;