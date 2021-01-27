import React, { useContext, useState } from "react";
import { Nav, Navbar, NavDropdown, OverlayTrigger, Popover } from 'react-bootstrap';
import { AuthContext } from "../Context/AuthContext";
import { CartContext } from "../Context/CartContext";
import { LangContext } from '../Context/LangContext';
import authAPI from "../Services/authAPI";
import Cart from "./Cart";

const NavbarPerso = ({ history }) => {

  const { lang } = useContext(LangContext);
  const { isAuth } = useContext(AuthContext);
  const { cartLocal, setCartLocal } = useContext(CartContext);

  const [show, setShow] = useState(false);
  const popover = (
    <Popover id="popover-basic">
      <Popover.Title><h4 className="m-1">Panier  <a onClick={() => { setCartLocal([]) }} className="btn btn-primary btn-sm float-right"><em className="fa fa-trash"></em></a></h4></Popover.Title>
      <Popover.Content>
        <Cart />
        {(history.location.pathname !== "/commander") &&
          <div className="row">
            <div className="col mx-4 my-2">
              <Nav.Link href="#commander" onClick={() => setShow(false)} className="btn btn-primary">Commander</Nav.Link>
            </div>
          </div>
        }
      </Popover.Content>
    </Popover>
  );

  return (
    <Navbar fixed="top" className="violet" variant="dark" collapseOnSelect={true} expand="lg" onToggle={() => setShow(false)}>
      <Navbar.Brand href={!isAuth && "#home" || ""}>
        <img
          alt="Logo du site"
          src="/logo.png"
          width="44"
          height="24"
          className="d-inline-block align-top"
        /></Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav text-primary border-primary ml-1">
        {!isAuth &&
          <>
            {cartLocal &&
              <b><em className="fa fa-shopping-cart "></em> {cartLocal?.length}</b>
              ||
              <i className="fa fa-bars" aria-hidden="true"></i>

            }
          </>
        }
      </Navbar.Toggle>
      <Navbar.Collapse id="basic-navbar-nav">
        {!isAuth &&
          <>
            <Nav className="mr-auto nav-item">
              <Nav.Link className="nav-item" href="#menu">{lang.theMenu}</Nav.Link>
              <Nav.Link className="nav-item" href="#apropos">{lang.about}</Nav.Link>
            </Nav>
            <Nav className="nav-item">
              {((history.location.pathname !== "/reserver")) &&
                <>
                  {(history.location.pathname !== "/commander") &&
                    <>
                      <Nav.Link className="btn text-light mr-1" href="#reserver">{lang.toReserve}</Nav.Link>
                      {cartLocal?.length &&
                        <OverlayTrigger trigger="click" placement="bottom" show={show} overlay={popover} transition>
                          <Nav.Link className="nav-item btn text-light border-light ml-1" onClick={() => setShow(!show)}>
                            <b><em className="fa fa-shopping-cart fa-lg"></em> {lang.cart} : {cartLocal?.length}</b>
                          </Nav.Link>
                        </OverlayTrigger>
                        ||
                        <Nav.Link className="btn text-orange border-warning mr-1" href="#commander">{lang.toOrder}</Nav.Link>
                      }
                    </>
                  }
                </>
              }
            </Nav>
          </>
          ||
          <>
            <Nav className="mr-auto nav-item">
              <Nav.Link className="nav-item" href="#commandes">Commandes</Nav.Link>
              <Nav.Link className="nav-item" href="#reservations">Reservations</Nav.Link>
              <Nav.Link className="nav-item" href="#factures">Factures</Nav.Link>
              <Nav.Link className="nav-item" href="#clients">Clients</Nav.Link>
              <NavDropdown title="Gestion" id="basic-nav-dropdown">
                <NavDropdown.Item href="#manage">Menu</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#map" className="text-muted">Map</NavDropdown.Item>
                <NavDropdown.Item href="#chatadmin" className="text-muted">Chat</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#utilisateurs">Utilisateurs</NavDropdown.Item>
                <NavDropdown.Item href="#parametres">Paramètres</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav className="nav-item">
              <Nav.Link className="nav-item active" href={`#utilisateurs/${authAPI.getCurrent().id}`}>{authAPI.getCurrent().firstName + " " + authAPI.getCurrent().lastName.toUpperCase()}</Nav.Link>
            </Nav></>
        }
      </Navbar.Collapse>
    </Navbar >
  );
};

export default NavbarPerso;
