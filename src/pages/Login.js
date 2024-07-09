import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import { login, getUserData } from '../services/api';

function Login() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const token = await login(email, password);
      setToken(token);
      localStorage.setItem('token', token);
      fetchUserData(token); 
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  const fetchUserData = async (token) => {
    try {
      const userData = await getUserData(token);
      setUser(userData); 
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '70vh' }}>
    <div>
      {token ? (
        <div>
          <h1 >Bienvenido, {user && user.name}!</h1>
        </div>
      ) : (
        <div>
          <h1 style={{ padding: '20px' }}>Accede a tu cuenta</h1>
          <form onSubmit={handleLogin}> 
          <div className="mb-3" style={{ textAlign: 'left' }} >
            <label  htmlFor="email" className="form-label" >EMAIL</label>
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
               autoComplete="current-password"
               required
            />
            </div>
            <br />
            <button type="submit" className="btn btn-primary" onClick={(e) => handleLogin(e)}>Iniciar sesión</button>
          </form>
          <p className="mt-3">
            ¿No tienes cuenta?<Link to="/registro">Regístrate</Link>  
          </p>
        </div>
      )}
    </div>
    </Container>
  );
}

export default Login;
