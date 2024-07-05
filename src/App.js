import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Inicio from './pages/Inicio';



function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Inicio />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
