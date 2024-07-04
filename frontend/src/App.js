import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
import Curso from './components/Curso';



function App() {
  return (
    <div className="App">
      <NavBar />
      <Container className="my-5">
      <div className="row">
          <div className="col-md-6">
            <h1>BIENVENIDO</h1>
            <p className='text-justify'>
              En nuestra plataforma de cursos en línea encontrarás una amplia variedad 
              de opciones educativas para potenciar tus habilidades y conocimientos. 
              Desde cursos de programación y diseño hasta idiomas y desarrollo personal, 
              tenemos todo lo que necesitas para seguir aprendiendo y creciendo. Nuestros 
              cursos están diseñados por expertos en cada materia y podrás acceder a ellos 
              desde cualquier lugar y en cualquier momento. ¡Descubre un mundo de 
              posibilidades educativas con nosotros!
            </p>
            <div className="botones">
              <button type="button"  className="btn" style={{ backgroundColor: '#136ebf', color: 'white' }} href="../src/pages/Registro.js">Registrarse</button>
              <button type="button"  className="btn btn-outline-secondary" href="../src/pages/Login.js">Accede</button>
        </div>
          </div>
          <div className="col-md-6">
            <img src="./assets/IMAGEN1.png" alt="Cursos en línea" className="img-fluid" />
          </div>
        </div>
      </Container>
      <Container className='my-5'>
        <h2>CURSOS DESTACADOS</h2>
        <p >¡Explora nuestra plataforma para descubrir más opciones que se 
          adapten a tus intereses y metas educativas!</p>
          <Curso/>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
