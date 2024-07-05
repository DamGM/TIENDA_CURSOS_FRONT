import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { RiAccountCircleLine } from "react-icons/ri";

const NavbarComponent = () => {
  return (
    <Navbar style={{ backgroundColor: '#136ebf' }} variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="../pages/Inicio.js">Tienda de Cursos</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/../pages/Inicio.js">Inicio</Nav.Link>
            <Nav.Link href="../pages/CursosVenta.js">Cursos</Nav.Link>
            <Nav.Link href="../pages/Comunidad.js">Comunidad</Nav.Link>
            <Nav.Link href="../pages/CursosComprados.js">Mis cursos</Nav.Link>
            <Nav.Link href="../pages/Login.js"><RiAccountCircleLine size={24}  /></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;


