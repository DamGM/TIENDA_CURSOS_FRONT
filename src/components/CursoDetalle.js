import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../services/client';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { MdOutlineArrowBackIos } from "react-icons/md";

export default function CursoDetalle() {
    const { title } = useParams();
    const [curso, setCurso] = useState(null);

    useEffect(() => {
        async function fetchCurso() {
            try {
                const { data, error } = await supabase
                    .from('cursos')
                    .select('*')
                    .eq('title', title)
                    .single();

                if (error) {
                    throw error;
                }

                setCurso(data);
            } catch (error) {
                console.error('Error al obtener el curso:', error.message);
            }
        }

        fetchCurso();
    }, [title]);

    if (!curso) {
        return <div>Cargando...</div>;
    }

    return (
        <Container className="mt-5" style={{ minHeight: '70vh' }}>
            <Row>
                <Col md={7}>
                    <div style={styles.leftContainer}>
                        <h2>{curso.title}</h2>
                        <img
                            src={curso.image}
                            alt={curso.title}
                            className='img-fluid'
                            style={styles.cursoImagen}
                        />
                        <p>{curso.description}</p>
                        <p><strong>Precio:</strong> {curso.price}</p>
                        <p><strong>Fecha de inicio:</strong> {new Date(curso.start_date).toLocaleDateString()}</p>
                        <Button variant="primary"> 
                            Añadir al carrito
                        </Button>
                    </div>
                </Col>
                <Col md={5}>
                    <div style={styles.rightContainer}>
                        <h4>Contenido del curso</h4>
                        <p className='text-justify'>{curso.contenido}</p>
                    </div>
                </Col>
            </Row>
            <div className='mt-5 mb-3' style={styles.buttonContainer}>
                <Link to="/CursosVenta" >
                <MdOutlineArrowBackIos className='btn-3d' size={40} style={styles.icon}  />
                </Link>
            </div>
        </Container>
    );
}

const styles = {
    rightContainer: {
        padding: '1rem',
        border: '1px solid #dee2e6',
        backgroundColor: '#f8f9fa',
        minHeight: '100%',
    },
    leftContainer: {
        padding: '1rem',
        border: '1px solid #dee2e6',
    },
    cursoImagen: {
        width: '100%',
        height: '400px',
        objectFit: 'cover',
        borderRadius: '5px',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    icon: {
        color: '#b0dbb2',
        transition: 'color 0.3s ease'
    },
};
