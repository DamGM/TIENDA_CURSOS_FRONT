import { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom'; 
import { supabase } from '../services/client';
import { Container } from 'react-bootstrap';

function Registro() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
       
      });

      if (error) {
        console.error('Error al registrar:', error.message)
        return;
      }    console.log('Usuario registrado', user);
      // TODO: ruta a mis cursos cuando esté hecho
      navigate('/');
     
    } catch (error) {
      console.error('Error al registrar:', error.message);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '70vh' }}>
        <div>
          <h1 style={{ padding: '20px' }}>Crea tu cuenta</h1>
          <p>
            ¿Ya tienes cuenta? <Link to="/login">Accede</Link>
          </p>
          <form onSubmit={handleRegister}>
          <div className="mb-3" style={{ textAlign: 'left' }} >
          <label htmlFor="name" className="form-label">NOMBRE</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: '100%' }}
              autoComplete="name"
              required
            />
            </div>
            <br />
            <div className="mb-3" style={{ textAlign: 'left' }} >
            <label htmlFor="email" className="form-label">EMAIL</label>
            <input
               type="email"
               id="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               style={{ width: '100%' }}
               autoComplete="email"
               required
            />
            </div>
            <br />
            <div className="mb-3" style={{ textAlign: 'left' }} >
            <label htmlFor="password" className="form-label">CONTRASEÑA</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%' }}
              autoComplete="new-password"
              required
            />
            </div>
            <br />
            <button type="submit" className="btn btn-primary ">Registrarse</button>
          </form>
         </div>
        </Container>
      )
    }

export default Registro;
