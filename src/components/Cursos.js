import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './curso.css';

export default function Curso({ id, title, imageSource, description, price, start_date }) {
    return (
        <div className='curso text-center bg-white animate__animated animate__bounce'>
            <div className='overflow'>
                <img src={imageSource} alt='' className='img-fluid rounded' />
            </div>
            <div className='curso-body text-dark'>
                <h4 className='curso-title'>{title}</h4>
                <p className='curso-text text-secondary'>{description}</p>
                <p><strong>Precio:</strong> {price}</p>
                <p><strong>Fecha de inicio:</strong> {new Date(start_date).toLocaleDateString()}</p>
                <Link to={`/curso/${id}`} className='btn btn-outline-secondary btn-3d rounded-20' style={{ backgroundColor: '#b0dbb2' }}>
                    VER CURSO
                </Link>
            </div>
        </div>
    );
}

Curso.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imageSource: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    start_date: PropTypes.string.isRequired
};
