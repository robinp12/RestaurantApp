import React, { useContext } from 'react';
import Header from '../Components/Header';
import { LangContext } from '../Context/LangContext';

const AboutPage = () => {
    const { lang } = useContext(LangContext);


    return (
        <>
            <Header title={lang.about} />
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
                            <strong>{lang.openingTime}:</strong>
                            <br />{lang.monday} {lang.and} {lang.tuesday} : {lang.from} 18h {lang.to} 21h
                               <br /> {lang.friday} : {lang.from} 18h {lang.to} 22h
                               <br /> {lang.saturday} : {lang.from} 11h {lang.to} 14h {lang.and} {lang.from} 18h {lang.to} 22h
                               <br /> {lang.sunday} : {lang.from} 11h {lang.to} 21h
                                </div>
                    </div>
                </div>
            </div>


        </>
    );
}

export default AboutPage;