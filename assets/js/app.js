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
import CustomersPage from "./Pages/CustomersPage";
import UsersPage from "./Pages/UsersPage";
import InvoicesPage from "./Pages/InvoicesPage";
import authAPI from "./Services/authAPI";

import fr from "./Lang/fr_FR.json";
import en from "./Lang/en_EN.json";
import ManagementPage from "./Pages/ManagementPage";

{
  /* Routes sécurisées */
}
authAPI.setup();
{
  /* Routes sécurisées */
}
const PrivateRoute = ({ path, isAuth, component }) =>
  isAuth ? (
    <Route path={path} component={component} />
  ) : (
    <Redirect to="/connexion" />
  );
const App = () => {
  const [isAuth, setIsAuth] = useState(authAPI.isAuth());
  const NavbarWithRouter = withRouter(NavbarPerso);
  const FooterWithRouter = withRouter(Footer);

  const [language, setLanguage] = useState(true);
  let lang;
  if (language) {
    lang = fr;
  } else {
    lang = en;
  }

  return (
    <>
      <HashRouter hashType="noslash">
        <NavbarWithRouter
          setLanguage={setLanguage}
          language={language}
          isAuth={isAuth}
        />
        <div className="jumbotron">
          <div className="card mt-4">
            <div className="card-body">
              <Switch>
                <PrivateRoute
                  isAuth={isAuth}
                  path="/factures"
                  component={InvoicesPage}
                />
                <PrivateRoute
                  isAuth={isAuth}
                  path="/utilisateurs"
                  component={UsersPage}
                />
                <PrivateRoute
                  isAuth={isAuth}
                  path="/clients"
                  component={CustomersPage}
                />
                <PrivateRoute
                  isAuth={isAuth}
                  path="/manage"
                  component={ManagementPage}
                />
                {isAuth && <Redirect path={"/connexion"} to="/" />}
                <Route
                  path="/connexion"
                  render={(props) => (
                    <ConnexionPage onLogin={setIsAuth} {...props} />
                  )}
                />
                <Route
                  path="/apropos"
                  render={(props) => <AboutPage lang={lang} {...props} />}
                />
                <Route
                  path="/menu"
                  render={(props) => <MenuPage lang={lang} {...props} />}
                />
                <Route
                  path="/reserver"
                  render={(props) => <ReservationPage lang={lang} {...props} />}
                />
                <Route
                  path="/commander"
                  render={(props) => <OrderPage lang={lang} {...props} />}
                />
                <Route
                  path="/"
                  render={(props) => <HomePage lang={lang} {...props} />}
                />
              </Switch>
            </div>
          </div>
        </div>
        <FooterWithRouter isAuth={isAuth} onLogout={setIsAuth} />
      </HashRouter>
      {/* Configuration notification */}
    </>
  );
};

const rootElement = document.querySelector("#app");

ReactDOM.render(<App />, rootElement);
