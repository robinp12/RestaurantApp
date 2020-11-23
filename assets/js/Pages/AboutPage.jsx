import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import Header from '../Components/Header';

const AboutPage = () => {

    return (
        <>
            <h2 className="card-title"><Header title={"À propos"} /></h2>
            <div className="row card-text">
                <div className="col">
                    <div id="mapid">
                        {/* <Map center={[50.503439, 4.855911]} zoom={8}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                             <Marker position={[50.503439, 4.855911]}>
                                            <Popup>
                                                A pretty CSS3 popup. <br /> Easily customizable.
                                            </Popup>
                                        </Marker> 
                        </Map> */}
                    </div>
                </div>
                <div className="col">
                    <div className="row">
                        <div className="col">
                            <address>
                                <strong>Restaurant.</strong>
                                <br />
                                    1355 Market Street, Suite 900
                                    <br />
                                    San Francisco, CA 94103
                                    <br />
                                <abbr title="Phone">N: </abbr> (+32) 499 02 22 02
                                    <br />
                                <a href="mailto:#">first.last@example.com</a>
                            </address>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <strong>Horaire</strong>
                            <br />Lundi et Mardi : de 18h à 21h
                                <br />Vendredi : de 18h à 22h
                                <br />Samedi : de 11h à 14h et de 18h à 22h
                                <br />Dimanche : de 11h à 21h
                                </div>
                    </div>
                </div>
            </div>


        </>
    );
}

export default AboutPage;