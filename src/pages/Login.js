import { useState} from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { supabase } from '../services/client'; 

function Login() {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await supabase.auth.signIn({
        email,
        password,
      });

      setSession(session);
      setUser(user);
     
      fetchUserData();
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
    }
  };

  const fetchUserData = async () => {
    try {
      const user = supabase.auth.user();
      setUser(user);
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setSession(null);
      setUser(null);
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '70vh' }}>
      <div>
        {session ? (
          <div>
            <h1>Bienvenido, {user && user.email}!</h1>
            <Button variant="primary" onClick={handleLogout}>
              Cerrar Sesión
            </Button>
          </div>
        ) : (
          <div>
            <h1 style={{ padding: '20px' }}>Accede a tu cuenta</h1>
            <form onSubmit={handleLogin}>
              <div className="mb-3" style={{ textAlign: 'left' }}>
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
              <div className="mb-3" style={{ textAlign: 'left' }}>
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
              <button type="submit" className="btn btn-primary">Iniciar sesión</button>
            </form>
            <p className="mt-3">
              ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
            </p>
          </div>
        )}
      </div>
    </Container>
  );
}

export default Login;
