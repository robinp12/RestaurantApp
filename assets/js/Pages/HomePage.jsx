import React, { useContext, useState } from "react";
import Field from "../Components/Form/Input/Field";
import Header from "../Components/Header";
import { LangContext } from "../Context/LangContext";
import moment from "moment";
import { Button, Carousel, OverlayTrigger, Popover } from "react-bootstrap";
import Axios from "axios";
import productsAPI from "../Services/productsAPI";
import { useRef } from "react";

const HomePage = () => {

    const { lang } = useContext(LangContext);

    const [time, setTime] = useState(new Date());
    const [file, setFile] = useState();

    const TEXT_STYLE = {
        fontSize: "2.2vw"
    };

    const refContainer = useRef();


    const oneTimeClick = (e) => {
        e.preventDefault()

        refContainer.current.setAttribute("disabled", "")
        setTimeout(() => {
            refContainer.current.removeAttribute("disabled")
        }, 1000);

    }

    return (
        <>
            <div className="row">
                <div className="col">
                    <Header title={"Le Cheval Blanc"} />
                    <div className="row align-items-center justify-content-center">
                        <div className="col-sm-12 col-md-8 col-lg-8">
                            <div className="card-text" style={TEXT_STYLE}>
                                <Carousel indicators={false}>
                                    <Carousel.Item>
                                        <img
                                            className="d-block w-100"
                                            src="https://ad962edbae8ba7b03b7f-d10007df79b5b7a4e475a291e50a08cf.ssl.cf3.rackcdn.com/creer-un-restaurant/creer-un-restaurant.jpg"
                                            alt="First slide"
                                        />
                                        {/* <Carousel.Caption>
                                            <h5>Bienvenue</h5>
                                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                        </Carousel.Caption> */}
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img
                                            className="d-block w-100"
                                            src="https://ad962edbae8ba7b03b7f-d10007df79b5b7a4e475a291e50a08cf.ssl.cf3.rackcdn.com/creer-un-restaurant/creer-un-restaurant.jpg"
                                            alt="Third slide"
                                        />

                                        {/* <Carousel.Caption>
                                            <h5>Bienvenue</h5>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                        </Carousel.Caption> */}
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img
                                            className="d-block w-100"
                                            src="https://ad962edbae8ba7b03b7f-d10007df79b5b7a4e475a291e50a08cf.ssl.cf3.rackcdn.com/creer-un-restaurant/creer-un-restaurant.jpg"
                                            alt="Third slide"
                                        />

                                        {/* <Carousel.Caption>
                                            <h3>Second slide label</h3>
                                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                                        </Carousel.Caption> */}
                                    </Carousel.Item>
                                </Carousel>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    <div className="row">
                        <div className="col">
                            <div className="card-text">

                                <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                                <p className="lead">
                                    <button className="btn btn-primary btn-lg" ref={refContainer} onClick={oneTimeClick} href="#" role="button">Learn more</button>
                                </p>                            </div>
                            <a href="#" className="card-link">Card link</a>
                            <a href="#" className="card-link">Another link</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
export default HomePage;
