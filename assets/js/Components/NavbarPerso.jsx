import React, { useState } from "react";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';


const NavbarPerso = () => {

  return (
    <Navbar fixed="top" bg="dark" variant="dark" collapseOnSelect expand="lg">
      <Navbar.Brand href="#">Restaurant</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto nav-item">
          <NavDropdown title="La carte" id="basic-nav-dropdown">
            <NavDropdown.Item href="#menu#plats">Plats</NavDropdown.Item>
            <NavDropdown.Item href="#menu#boissons">Boissons</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Suggestions du moment</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link className="nav-item" href="#about">À propos</Nav.Link>
        </Nav>

        <Nav className="nav-item">
          <a href="#reserve" className="btn btn-dark text-light border-light mr-2">Réservation</a>
          <a href="#order" className="btn btn-dark text-primary border-primary mr-2 ">Commande</a>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarPerso;
