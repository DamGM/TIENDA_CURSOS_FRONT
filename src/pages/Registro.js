import { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { supabase } from '../services/client';
import { Container } from 'react-bootstrap';

function Registro() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');


  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        data: { name: name },
      });
      if (error) {
        console.error('Error al registrar:', error.message);
        return;
      }
      await supabase.from('users').update({ name }).eq('id', user.id);
      fetchUserData();
    } catch (error) {
      console.error('Error al registrar:', error.message);
    }
  };
  const fetchUserData = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('name, email')
        .eq('id', supabase.auth.user().id)
        .single();
  
      if (error) {
        console.error('Error fetching user data:', error);
      } else {
        setUser(data);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
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
