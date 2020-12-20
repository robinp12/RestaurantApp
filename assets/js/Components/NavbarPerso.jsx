import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { Dropdown, DropdownButton, Nav, Navbar, NavDropdown, OverlayTrigger, Popover } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { CartContext } from "../Context/CartContext";
import { LangContext } from '../Context/LangContext';
import Cart from "./Cart";

const NavbarPerso = ({ history }) => {
  const { cart, setCart } = useContext(CartContext);

  const { language, setLanguage, lang } = useContext(LangContext);
  const { isAuth } = useContext(AuthContext);

  const [show, setShow] = useState(true);
  const popover = (
    <Popover id="popover-basic">
      <Popover.Title><h3>Panier</h3></Popover.Title>
      <Popover.Content>
        <Cart />
        <Link to="/#commander" className="btn btn-sm btn-primary my-auto">Commander</Link>
      </Popover.Content>
    </Popover>
  );

  const timeout = async () => {
    if (cart) {
      await setTimeout(() => {
        setShow(false);
      }, 4000);
    }
  }

  useEffect(() => {
    timeout()
  }, [cart.length])

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
                  {cart.length &&
                    <OverlayTrigger trigger="click" placement="bottom" overlay={popover} show={show} transition>
                      <Nav.Link className="nav-item btn btn-dark text-primary border-primary ml-1" onClick={() => setShow(!show)}>
                        <b><em className="fa fa-shopping-cart"></em> {lang.cart} : {cart.length}</b>
                      </Nav.Link>
                    </OverlayTrigger>
                    ||
                    <>
                      {(history.location.pathname !== "/commander") &&
                        <>
                          <Nav.Link className="btn text-light mr-1" href="#reserver">{lang.toReserve}</Nav.Link>
                          <Nav.Link className="btn text-primary border-primary mr-1" href="#commander">{lang.toOrder}</Nav.Link>
                        </>
                      }
                    </>
                  }
                </>
              }
            </Nav>
          </>
          ||
          <Nav className="mr-auto nav-item">
            <Nav.Link className="nav-item" href="#commandes">Commandes pour cuisto</Nav.Link>
            <Nav.Link className="nav-item" href="#commandes">Affichage map resto</Nav.Link>
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
