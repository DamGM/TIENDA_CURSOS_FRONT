import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { RiAccountCircleLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { supabase } from '../services/client';

const NavbarComponent = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error al obtener usuario:', error.message);
        return;
      }
      setUser(data?.session?.user || null);
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });
    return () => {
      if (authListener) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  return (
    <Navbar style={{ backgroundColor: '#136ebf' }} variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Tienda de Cursos</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/CursosVenta">Cursos</Nav.Link>
            <Nav.Link as={Link} to="/comunidad">Comunidad</Nav.Link>
            {user && (
              <Nav.Link as={Link} to="/CursosComprados">Mis cursos</Nav.Link>
            )}
            <Nav.Link as={Link} to="/login"><RiAccountCircleLine size={24} /></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;


