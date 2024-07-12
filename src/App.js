import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Inicio from './pages/Inicio';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Comunidad from './pages/Comunidad';
import Publicaciones from './pages/CursosVenta';


function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/registro" element={<Registro/>} />
          <Route path="/comunidad" element={<Comunidad/>} />
          <Route path="/CursosVenta" element={<Publicaciones/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
