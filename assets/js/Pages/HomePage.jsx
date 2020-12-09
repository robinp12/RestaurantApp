import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Header from "../Components/Header";
let toto = [];

const HomePage = () => {
    const [bool, setBool] = useState(false);
    const click = () => {
        toto.push("dd")
    }
    useEffect(() => {
        click()
    }, [bool])

    console.log(toto)

    return (
        <>
            {toto.map(e => <b>{e}</b>)
            }
            <h2 className="card-title"><Header title={"Le Cheval Blanc"} /></h2>
            <div className="row align-items-center">
                <div className="col">
                    <img src="https://ad962edbae8ba7b03b7f-d10007df79b5b7a4e475a291e50a08cf.ssl.cf3.rackcdn.com/creer-un-restaurant/creer-un-restaurant.jpg" />
                </div>
                <div className="col">
                    <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                    <div className="card-text">
                        <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                        <hr className="my-4" />
                        <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                        <p className="lead">
                            <a onClick={() => setBool(!bool)} className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
                        </p>                            </div>
                    <a href="#" className="card-link">Card link</a>
                    <a href="#" className="card-link">Another link</a>
                </div>
            </div>
        </>
    )
};
export default HomePage;
