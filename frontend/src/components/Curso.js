import React from 'react'
import Curso from './Cursos'
import Image1 from "../assets/IMAGEN2.png"
import Image2 from "../assets/IMAGEN3.png"
import Image3 from "../assets/IMAGEN4.png"

const cursos = [
    {
        id:1,
        title:"Desarrollo Web",
        image: Image1,
        description: "Aprende a crear sitios web profesionales desde cero con HTML, CSS y JavaScript.",
        url:'#',
        
    },
    {
        id:2,
        title:"Marketing",
        image: Image2,
        description:"Domina las estrategias de marketing en línea más efectivas para impulsar tu negocio.",
        url:'#'
    },
    {
        id:3,
        title:"Fotografía",
        image: Image3,
        description:"Descubre técnicas y trucos para capturar imágenes impactantes y creativas.",
        url:'#'
    }
]

export default function Cursos() {
  return (
    <div className='container d-flex justify-content-center align-items-center h-40'>
        <div className='row' key={cursos.id}>
           {
            cursos.map(cursos => (
               <div className='col-md-4'>
                <Curso title={cursos.title} imageSource={cursos.image} url={cursos.url} description={cursos.description}/>
               </div>
            ))
            }
         
        </div>
        
    </div>
  )
}