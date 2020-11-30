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
  return (
    <>
      <HashRouter hashType="noslash">
        <NavbarWithRouter isAuth={isAuth} />
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
                {isAuth && <Redirect path={"/connexion"} to="/" />}
                <Route
                  path="/connexion"
                  render={(props) => (
                    <ConnexionPage onLogin={setIsAuth} {...props} />
                  )}
                />
                <Route path="/apropos" component={AboutPage} />
                <Route path="/menu" component={MenuPage} />
                <Route path="/reserver" component={ReservationPage} />
                <Route path="/commander" component={OrderPage} />
                <Route path="/" component={HomePage} />
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
