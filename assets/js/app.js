import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  HashRouter,
  Redirect,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import "../css/app.css";
import NavbarPerso from "./Components/NavbarPerso";
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import ReservationPage from "./Pages/ReservationPage";
import OrderPage from "./Pages/OrderPage";
import MenuPage from "./Pages/MenuPage";
import ConnexionPage from "./Pages/ConnexionPage";
import Footer from "./Components/Footer";

{
  /* Routes sécurisées */
}

const App = () => {
  const NavbarWithRouter = withRouter(NavbarPerso);

  return (
    <>
      <HashRouter>
        <NavbarWithRouter />
        <div className="jumbotron">
          <div className="card mt-4">
            <div className="card-body">
              <Switch>
                <Route path="/connexion" component={ConnexionPage} />
                <Route path="/about" component={AboutPage} />
                <Route path="/menu" component={MenuPage} />
                <Route path="/reserve" component={ReservationPage} />
                <Route path="/order" component={OrderPage} />
                <Route path="/" component={HomePage} />
              </Switch>
            </div>
          </div>
        </div>
        <Footer />
      </HashRouter>
      {/* Configuration notification */}
    </>
  );
};

const rootElement = document.querySelector("#app");

ReactDOM.render(<App />, rootElement);
