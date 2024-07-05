import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Curso from '../components/Curso';
import '../App.css';
import IMAGEN1 from '../assets/IMAGEN1.png';

function Inicio() {
    return (
        <div className='App'>
            <Container className="my-5">
                <div className="row">
                    <div className="col-lg-7">
                        <h1>BIENVENIDO</h1>
                        <p className='text-justify mb-4'>
                            En nuestra plataforma de cursos en línea encontrarás una amplia variedad
                            de opciones educativas para potenciar tus habilidades y conocimientos.
                            Desde cursos de programación y diseño hasta idiomas y desarrollo personal,
                            tenemos todo lo que necesitas para seguir aprendiendo y creciendo. Nuestros
                            cursos están diseñados por expertos en cada materia y podrás acceder a ellos
                            desde cualquier lugar y en cualquier momento. ¡Descubre un mundo de
                            posibilidades educativas con nosotros!
                        </p>
                        <div className="botones">
                            <Link to="/registro" className="btn btn-primary btn-3d me-3 mb-3" style={{ backgroundColor: '#136ebf', color: 'white' }}>Registrarse</Link>
                            <Link to="/login" className="btn btn-outline-secondary btn-3d mb-3">Acceder</Link>
                        </div>
                    </div>
                    <div className="col-lg-5 mt-4 mt-lg-0">
                        <img src={IMAGEN1} alt="Cursos en línea" className="img-fluid" />
                    </div>
                </div>
            </Container>
            <Container className='my-5'>
                <h2>CURSOS DESTACADOS</h2>
                <p>¡Explora nuestra plataforma para descubrir más opciones que se
                    adapten a tus intereses y metas educativas!</p>
                <Curso />
            </Container>
        </div>
    );
}

export default Inicio;