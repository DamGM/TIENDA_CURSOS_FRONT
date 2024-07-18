import React from 'react'
import Curso from '../components/Curso';
import { Container } from 'react-bootstrap';

export default function CursosVenta() {
  return (
    <div>
        <Container className='my-5'>
          <Curso/>
        </Container> 
    </div>
  )
}

