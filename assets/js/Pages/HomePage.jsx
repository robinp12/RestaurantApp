import React, { useContext } from "react";
import { Carousel } from "react-bootstrap";
import Header from "../Components/Header";
import { LangContext } from "../Context/LangContext";

const HomePage = () => {

    const { lang } = useContext(LangContext);
    window.scrollTo(0, 0);

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
                                            src="./cheval-blanc-restaurant.jpg"
                                            alt="First slide"
                                        />
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img
                                            className="d-block w-100"
                                            src="./cheval-blanc-bar.jpg"
                                            alt="Third slide"
                                        />
                                    </Carousel.Item>
                                </Carousel>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    <div className="row">
                        <div className="col">
                            <div className="card-text">

                                <p>{lang.welcomeMsg}</p>
                                <a className="btn btn-primary text-light " href="#menu" role="a">
                                    {lang.theMenu}
                                </a>
                                <a href="#apropos" className="btn text-violet mx-2">{lang.about}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
export default HomePage;
