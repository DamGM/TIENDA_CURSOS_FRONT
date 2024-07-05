import React from 'react';
import { Container } from 'react-bootstrap';

const FooterComponent = () => {
  return (
    <footer className="bg-white text-dark mt-5 p-4 text-center">
      <Container>
        <p>&copy; 2024 Tienda de Cursos. Todos los derechos reservados.</p>
      </Container>
    </footer>
  );
};

export default FooterComponent;
