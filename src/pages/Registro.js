import { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { register, getUserData } from '../services/api';
import { Container } from 'react-bootstrap';

function Registro() {
  
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const token = await register(email, password, name);
      localStorage.setItem('token', token);
      fetchUserData(token);
    } catch (error) {
      console.error('Error al registrar:', error);
    }
  };

  const fetchUserData = async (token) => {
    try {
      const userData = await getUserData(token); 
      setUser(userData); 
    }
    catch (error) {
    console.error('Error al obtener datos del usuario:', error);
  }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '70vh' }}>
        <div>
          <h1 style={{ padding: '20px' }}>Crea tu cuenta</h1>
          <p>
            ¿Ya tienes cuenta? <Link to="/login">Accede</Link>
          </p>
          <form>
          <div className="mb-3" style={{ textAlign: 'left' }} >
          <label htmlFor="name" className="form-label">NOMBRE</label>
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: '100%' }}
            />
            </div>
            <br />
            <div className="mb-3" style={{ textAlign: 'left' }} >
            <label htmlFor="email" className="form-label">EMAIL</label>
            </div>
            <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%' }}
            />
            </div>
            <br />
            <div className="mb-3" style={{ textAlign: 'left' }} >
            <label htmlFor="password" className="form-label">CONTRASEÑA</label>
            </div>
            <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%' }}
            />
            </div>
            <br />
            <button type="submit" className="btn btn-primary " onClick={(e) => handleRegister(e)}>Registrarse</button>
          </form>
          {user && (
        <div>
          <h2>Bienvenido, {user.name}!</h2>
          <p>Email: {user.email}</p>
          
        </div>
         )}
        </div>
        </Container>
      )
    }

export default Registro;
