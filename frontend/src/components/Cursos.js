import React from 'react'
import PropTypes from "prop-types"
import "./curso.css"


export default function Curso({title, imageSource,url, description}) {

  return (
    <div className='curso text-center bg-white animate__animated animate__bounce'>
      <div className='overflow'>
         <img src={imageSource} alt='' className='img-fluid rounded'/>
      </div>
      <div className='curso-body text-dark'>
        <h4 className='curso-title'>{title}</h4>
        <p className='curso-text text-secondary'>{description}</p>
        <a href={url} className='btn btn-outline-secondary rounded-20' target="_blank" rel="noreferrer" style={{ backgroundColor: '#b0dbb2' }}>
         VER CURSO
        </a>
      </div>
    </div>
  )
} 

Curso.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string,
  imageSource:PropTypes.string,
  text: PropTypes.string
}