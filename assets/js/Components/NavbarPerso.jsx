import React, { useContext, useEffect, useState } from "react";
import { Nav, Navbar, NavDropdown, OverlayTrigger, Popover } from 'react-bootstrap';
import { AuthContext } from "../Context/AuthContext";
import { CartContext } from "../Context/CartContext";
import { LangContext } from '../Context/LangContext';
import Cart from "./Cart";

const NavbarPerso = ({ history }) => {
  const { cart, setCart } = useContext(CartContext);

  const { language, setLanguage, lang } = useContext(LangContext);
  const { isAuth } = useContext(AuthContext);
  const [width, setWidth] = useState(window.innerWidth)

  const [show, setShow] = useState(true);
  const popover = (
    <Popover id="popover-basic">
      <Popover.Title><h4 className="m-1">Panier</h4></Popover.Title>
      <Popover.Content>
        <Cart />
        {(history.location.pathname !== "/commander") &&
          <div className="row">
            <div className="col">
              <a href="#commander" className="btn btn-sm btn-primary justify-content-end btn-block">Commander</a>
            </div>
          </div>
        }
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
                <NavDropdown.Item href="#menu">{lang.foods}</NavDropdown.Item>
                <NavDropdown.Item href="#menu">{lang.drinks}</NavDropdown.Item>
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
                    <>
                      <Nav.Link className="btn text-light mr-1" href="#reserver">{lang.toReserve}</Nav.Link>

                      <OverlayTrigger trigger="click" placement="bottom" overlay={popover} show={show} transition>
                        <Nav.Link className="nav-item btn btn-dark text-primary border-primary ml-1" onClick={() => setShow(!show)}>
                          <b><em className="fa fa-shopping-cart"></em> {lang.cart} : {cart.length}</b>
                        </Nav.Link>
                      </OverlayTrigger>
                    </>
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
            <Nav.Link className="nav-item" href="#chatadmin">Chat</Nav.Link>
            <NavDropdown title="Gestion" id="basic-nav-dropdown">
              <NavDropdown.Item href="#commandes">Commandes</NavDropdown.Item>
              <NavDropdown.Item href="#factures">Factures</NavDropdown.Item>
              <NavDropdown.Item href="#clients">Clients</NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item href="#manage">Menus</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#utilisateurs">Utilisateurs</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        }
      </Navbar.Collapse>
    </Navbar >
  );
};

export default NavbarPerso;
