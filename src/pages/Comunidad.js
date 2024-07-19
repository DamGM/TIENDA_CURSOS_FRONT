import { useEffect, useState } from 'react';
import { Container, Form, Button, ListGroup, Alert } from 'react-bootstrap';
import { supabase } from '../services/client';

function Publicaciones() {
  const [titulo, setTitulo] = useState('');
  const [content, setContenido] = useState('');
  const [publicaciones, setPublicaciones] = useState([]);
  const [user, setUser] = useState(null);
  
  
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user }, error }) => {
      if (error) {
        console.error('Error al obtener usuario:', error.message);
        return;
      }
      setUser(user);
    });
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

  const handleSubmitPublicacion = async (e) => {
    e.preventDefault();
    try {
      if (!user) throw new Error('Usuario no autentificado');
      console.log('User ID:', user.id);
      const { data, error } = await supabase.from('forum_post').insert([
        { titulo, content, user_id: user.id },
      ]);
      if (error) throw error;
      console.log('Publicación creada:', data);
      setTitulo('');
      setContenido('');
      const newPublicacion = { titulo, content, user_id: user.id,  created_at: new Date().toISOString() };
    setPublicaciones((prevPublicaciones) => [...prevPublicaciones, newPublicacion]);

    } catch (error) {
      console.error('Error al crear publicación:', error.message);
    }
  };

  return (
    <Container className="my-5" style={{ minHeight: '70vh' }}>
      <h1>Foro</h1>
      {user ? (
        <>
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
        </>
      ) : (
        <Alert variant="warning">
          Debes <a href="/registro">registrarte</a> o <a href="/login">iniciar sesión</a> para poder publicar en el foro.
        </Alert>
      )}
      <ListGroup className="mt-4">
         {publicaciones.map((publicacion, index) => (
       <ListGroup.Item key={publicacion.id || index}>
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
