import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  HashRouter,
  Redirect,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/app.css";
import Footer from "./Components/Footer";
import NavbarPerso from "./Components/NavbarPerso";
import { AuthContext } from "./Context/AuthContext";
import { CartContext } from "./Context/CartContext";
import { LangContext } from "./Context/LangContext";
import en from "./Lang/en_EN.json";
import fr from "./Lang/fr_FR.json";
import AboutPage from "./Pages/AboutPage";
import ChatPage from "./Pages/Admin/ChatPage";
import ConnexionPage from "./Pages/Admin/ConnexionPage";
import CustomersPage from "./Pages/Admin/CustomersPage";
import InvoicesPage from "./Pages/Admin/InvoicesPage";
import MenuManagement from "./Pages/Admin/MenuManagement";
import MiniMapPage from "./Pages/Admin/MiniMapPage";
import OrdersPage from "./Pages/Admin/OrdersPage";
import ReservationManagement from "./Pages/Admin/ReservationManagement.jsx";
import SettingsPage from "./Pages/Admin/SettingsPage";
import UsersPage from "./Pages/Admin/UsersPage";
import HomePage from "./Pages/HomePage";
import MenuPage from "./Pages/MenuPage";
import OrderPage from "./Pages/OrderPage";
import ReservationPage from "./Pages/ReservationPage";
import authAPI from "./Services/authAPI";
import categoriesAPI from "./Services/categoriesAPI";
import productsAPI from "./Services/productsAPI";

{
  /* Routes sécurisées */
}
authAPI.setup();
{
  /* Routes sécurisées */
}
const PrivateRoute = ({ path, component }) => {
  const { isAuth } = useContext(AuthContext);

  return isAuth ? (
    <Route path={path} component={component} />
  ) : (
    <Redirect to="/connexion" />
  );
};

const App = () => {
  const [isAuth, setIsAuth] = useState(authAPI.isAuth());
  const NavbarWithRouter = withRouter(NavbarPerso);
  const FooterWithRouter = withRouter(Footer);

  const [language, setLanguage] = useState(true);
  const [cart, setCart] = useState([]);

  let lang;
  if (language) {
    lang = fr;
  } else {
    lang = en;
  }

  const fetchCatProd = async () => {
    try {
      await productsAPI.getAllProducts();
      await categoriesAPI.getAllCategories();
    } catch (error) {
      console.error("Preload Products & Categories failed");
    }
  };

  useEffect(() => {
    fetchCatProd();
  }, []);

  // client.listenToSocket("notifReceiv", authAPI.isAuth());

  return (
    <>
      <AuthContext.Provider value={{ isAuth, setIsAuth }}>
        <LangContext.Provider value={{ language, setLanguage, lang }}>
          <CartContext.Provider value={{ cart, setCart }}>
            <HashRouter hashType="noslash">
              <NavbarWithRouter />
              <div className="jumbotron">
                <div className="card">
                  <div className="body my-2 py-3 px-4">
                    <Switch>
                      <PrivateRoute
                        path="/factures/:id?"
                        component={InvoicesPage}
                      />
                      <PrivateRoute
                        path="/utilisateurs/:id?"
                        component={UsersPage}
                      />
                      <PrivateRoute
                        path="/clients/:id?"
                        component={CustomersPage}
                      />
                      <PrivateRoute
                        path="/reservations/:id?"
                        component={ReservationManagement}
                      />
                      <PrivateRoute
                        path="/commandes/:id?"
                        component={OrdersPage}
                      />
                      <PrivateRoute path="/manage" component={MenuManagement} />
                      <PrivateRoute path="/map" component={MiniMapPage} />
                      <PrivateRoute path="/chatadmin" component={ChatPage} />
                      <PrivateRoute
                        path="/parametres"
                        component={SettingsPage}
                      />
                      {isAuth && <Redirect path={"/connexion"} to="/" />}
                      <Route
                        path="/connexion"
                        render={(props) => <ConnexionPage {...props} />}
                      />
                      <Route
                        path="/apropos"
                        render={(props) => <AboutPage {...props} />}
                      />
                      <Route
                        path="/menu"
                        render={(props) => <MenuPage {...props} />}
                      />
                      <Route
                        path="/reserver"
                        render={(props) => <ReservationPage {...props} />}
                      />
                      <Route
                        path="/commander/:id?"
                        render={(props) => <OrderPage {...props} />}
                      />
                      <Route
                        path="/"
                        render={(props) => <HomePage {...props} />}
                      />
                    </Switch>
                  </div>
                </div>
              </div>
              <FooterWithRouter />
            </HashRouter>
          </CartContext.Provider>
        </LangContext.Provider>
      </AuthContext.Provider>
      {/* Configuration notification */}
      <ToastContainer
        className="toast-container"
        position={toast.POSITION.BOTTOM_RIGHT}
        transition={Zoom}
        autoClose={4000}
        pauseOnFocusLoss={false}
        hideProgressBar={true}
        newestOnTop={true}
        toastClassName="bg-dark toa"
        limit={5}
      />
    </>
  );
};

const rootElement = document.querySelector("#app");

ReactDOM.render(<App />, rootElement);
