// Publicaciones.js
import { useEffect, useState } from 'react';
import { Container, Form, Button, ListGroup } from 'react-bootstrap';
import { supabase } from '../services/client';

function Publicaciones() {
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    fetchPublicaciones();
  }, []);

  const fetchPublicaciones = async () => {
    try {
      const { data, error } = await supabase.from('publicaciones').select('*');
      if (error) throw error;
      setPublicaciones(data);
    } catch (error) {
      console.error('Error al obtener publicaciones:', error.message);
    }
  };

  const handleSubmitPublicacion = async (event) => {
    event.preventDefault();
    try {
      const { data, error } = await supabase.from('publicaciones').insert([
        { titulo, contenido },
      ]);
      if (error) throw error;
      console.log('Publicación creada:', data);
      setTitulo('');
      setContenido('');
      fetchPublicaciones();
    } catch (error) {
      console.error('Error al crear publicación:', error.message);
    }
  };

  return (
    <Container>
      <h1>Publicaciones</h1>
      <Form onSubmit={handleSubmitPublicacion}>
        <Form.Group controlId="formTitulo">
          <Form.Label>Título</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa el título de la publicación"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formContenido">
          <Form.Label>Contenido</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Ingresa el contenido de la publicación"
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Publicar
        </Button>
      </Form>
      <hr />
      <ListGroup>
        {publicaciones.map((publicacion) => (
          <ListGroup.Item key={publicacion.id}>
            <h3>{publicacion.titulo}</h3>
            <p>{publicacion.contenido}</p>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default Publicaciones;
