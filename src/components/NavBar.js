import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { RiAccountCircleLine } from "react-icons/ri";
import { Link } from 'react-router-dom';

const NavbarComponent = () => {
  return (
    <Navbar style={{ backgroundColor: '#136ebf' }} variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Tienda de Cursos</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/cursos-venta">Cursos</Nav.Link>
            <Nav.Link as={Link} to="/comunidad">Comunidad</Nav.Link>
            <Nav.Link as={Link} to="/cursos-comprados">Mis cursos</Nav.Link>
            <Nav.Link as={Link} to="/login"><RiAccountCircleLine size={24}  /></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;


