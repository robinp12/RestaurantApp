import React, { useState } from "react";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';


const NavbarPerso = ({ isAuth, setLanguage, language }) => {
  return (
    <Navbar fixed="top" bg="dark" variant="dark" collapseOnSelect expand="lg">
      <Navbar.Brand href="#">Le Cheval Blanc</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {!isAuth &&
          <>
            <Nav className="mr-auto nav-item">
              <button onClick={() => setLanguage(!language)}>Langue</button>
              <NavDropdown title="La carte" id="basic-nav-dropdown">
                <NavDropdown.Item href="#menu#plats">Plats</NavDropdown.Item>
                <NavDropdown.Item href="#menu#boissons">Boissons</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Suggestions du moment</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link className="nav-item" href="#apropos">À propos</Nav.Link>
            </Nav>
            <Nav className="nav-item">
              <Nav.Link className="btn btn-dark text-light border-light mr-2" href="#reserver">Reserver</Nav.Link>
              <Nav.Link className="btn btn-dark text-primary border-primary mr-2" href="#commander">Commander</Nav.Link>
            </Nav>
          </>
          ||
          <Nav className="mr-auto nav-item">
            <Nav.Link className="nav-item" href="#commandes">Commandes</Nav.Link>
            <Nav.Link className="nav-item" href="#reservations">Reservations</Nav.Link>
            <Nav.Link className="nav-item" href="#factures">Factures</Nav.Link>
            <NavDropdown title="Gestion" id="basic-nav-dropdown">
              <NavDropdown.Item href="#clients">Clients</NavDropdown.Item>
              <NavDropdown.Item href="#utilisateurs">Utilisateurs</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#manage">Menus</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        }
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarPerso;
