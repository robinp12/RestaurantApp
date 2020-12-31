import React, { useContext } from "react";
import { Carousel } from "react-bootstrap";
import Header from "../Components/Header";
import { LangContext } from "../Context/LangContext";

const HomePage = () => {

    const { lang } = useContext(LangContext);

    const TEXT_STYLE = {
        fontSize: "2.2vw"
    };


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

                                <p>Bienvenue sur le site du Cheval Blanc. <br />
                                Vous pouvez sur ce site passer une commande en ligne.</p>
                                <a className="btn btn-primary text-light " href="#menu" role="a">
                                    Voir la carte
                                    </a>
                                <a href="#apropos" className="btn text-violet mx-2">À propos</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
export default HomePage;
