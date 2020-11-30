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
                                <strong>Le Cheval Blanc</strong>
                                <br />
                                Chaussée de Dinant, 26
                                <br />5530 Spontin
                                    <br />
                                <abbr title="Phone">N: </abbr> 083 69 96 19

                                <abbr title="Phone">N: </abbr> 0475 31 93 24

                                    <br />
                                <a href="mailto:cavalo.branco@skynet.be">cavalo.branco@skynet.be</a>
                            </address>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <strong>Horaires d'ouvertures :</strong>
                            <br />Lundi et Mardi : de 18h à 21h
                               <br /> Vendredi : de 18h à 22h
                               <br /> Samedi : de 11h à 14h et de 18h à 22h
                               <br /> Dimanche : de 11h à 21h
                                </div>
                    </div>
                </div>
            </div>


        </>
    );
}

export default AboutPage;