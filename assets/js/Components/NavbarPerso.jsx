import React, { useContext } from "react";
import { Dropdown, DropdownButton, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { AuthContext } from "../Context/AuthContext";
import { CartContext } from "../Context/CartContext";
import { LangContext } from '../Context/LangContext';



const NavbarPerso = ({ history }) => {
  const { cart, setCart } = useContext(CartContext);

  const { language, setLanguage, lang } = useContext(LangContext);
  const { isAuth } = useContext(AuthContext);

  return (
    <Navbar fixed="top" bg="dark" variant="dark" collapseOnSelect expand="lg" >
      <Navbar.Brand href="#home">
        <img
          alt=""
          src="/logo.png"
          width="44"
          height="24"
          className="d-inline-block align-top"
        /></Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {!isAuth &&
          <>
            <Nav className="mr-auto nav-item">
              <NavDropdown title={lang.theMenu} id="basic-nav-dropdown">
                <NavDropdown.Item href="#menu#plats">{lang.foods}</NavDropdown.Item>
                <NavDropdown.Item href="#menu#boissons">{lang.drinks}</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">{"..."}</NavDropdown.Item>
                {/* <NavDropdown.Item href="#action/3.4">{lang.suggestions}</NavDropdown.Item> */}
              </NavDropdown>
              <Nav.Link className="nav-item" href="#apropos">{lang.about}</Nav.Link>
            </Nav>
            <Nav className="nav-item">
              {((history.location.pathname !== "/reserver")) &&
                <>
                  {(history.location.pathname !== "/commander") &&
                    <Nav.Link className="btn text-light mr-1" href="#reserver">{lang.toReserve}</Nav.Link>
                  }
                  <Nav.Link className="nav-item btn btn-dark text-primary border-primary ml-1" href="#commander">
                    {cart.length &&
                      <b><em className="fa fa-shopping-cart"></em> {lang.cart}
                      : {cart.length}</b>
                      || <>{lang.toOrder}
                      </>}
                  </Nav.Link>
                </>
              }
            </Nav>
          </>
          ||
          <Nav className="mr-auto nav-item">
            <Nav.Link className="nav-item" href="#commandes">Commandes</Nav.Link>
            <Nav.Link className="nav-item" href="#reservations">Reservations</Nav.Link>
            <Nav.Link className="nav-item" href="#factures">Factures</Nav.Link>
            <Nav.Link className="nav-item" href="#clients">Clients</Nav.Link>
            <NavDropdown title="Gestion" id="basic-nav-dropdown">
              <NavDropdown.Item href="#utilisateurs">Utilisateurs</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#manage">Menus</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        }
      </Navbar.Collapse>
    </Navbar >
  );
};

export default NavbarPerso;
