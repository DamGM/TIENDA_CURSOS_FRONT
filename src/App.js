import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Inicio from './pages/Inicio';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Publicaciones from './pages/Comunidad';
import CursosComprados from './pages/CursosComprados';
import CursosVenta from './pages/CursosVenta';
import CursoDetalle from './components/CursoDetalle';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/registro" element={<Registro/>} />
          <Route path="/comunidad" element={<Publicaciones/>} />
          <Route path="/CursosComprados" element={<CursosComprados/>} />
          <Route path="/CursosVenta" element={<CursosVenta/>} />
          <Route path="/curso/:title" element={<CursoDetalle/>} />
       </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
