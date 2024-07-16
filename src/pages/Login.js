import { useState} from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../services/client'; 

function Login() {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const { data: { session, user }, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Error al iniciar sesión:', error.message);
        return;
      }

      setSession(session);
      setUser(user);
      navigate('/'); 
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
    }
  }

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
