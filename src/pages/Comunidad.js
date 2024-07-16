import { useEffect, useState } from 'react';
import { Container, Form, Button, ListGroup } from 'react-bootstrap';
import { supabase } from '../services/client';

function Publicaciones() {
  const [titulo, setTitulo] = useState('');
  const [content, setContenido] = useState('');
  const [publicaciones, setPublicaciones] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error('Error al obtener usuario:', error.message);
        return;
      }

      setUser(user);
    };

    fetchUser();
    fetchPublicaciones();
  }, []);

  const fetchPublicaciones = async () => {
    try {
      const { data, error } = await supabase
        .from('forum_post')
        .select('id, user_id, content, created_at, titulo');
      if (error) throw error;
      setPublicaciones(data);
    } catch (error) {
      console.error('Error al obtener publicaciones:', error.message);
    }
  };

  const handleSubmitPublicacion = async (event) => {
    event.preventDefault();
    try {
      if (!user) throw new Error('User not authenticated');
      const { data, error } = await supabase.from('forum_post').insert([
        { titulo, content, user_id: user.id },
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
    <Container className="my-5" style={{ minHeight: '70vh' }}>
      <h1>Foro</h1>
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
            value={content}
            onChange={(e) => setContenido(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-5">
          Publicar
        </Button>
      </Form>
      <ListGroup className="mt-4">
        {publicaciones.map((publicacion) => (
          <ListGroup.Item key={publicacion.id}>
            <h3>{publicacion.titulo}</h3>
            <p>{publicacion.content}</p>
            <small>
              Publicado por: {publicacion.user_id} el{' '}
              {new Date(publicacion.created_at).toLocaleString()}
            </small>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default Publicaciones;
