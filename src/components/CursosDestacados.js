import React from 'react'
import Curso from './Cursos'
import { supabase } from '../services/client';
import { useState, useEffect } from 'react';


export default function CursosPopulares() {
    const [cursosPopulares, setCursosPopulares] = useState([]);

    useEffect(() => {
        async function fetchCursosPopulares() {
            try {
                const { data, error } = await supabase
                    .from('cursos')
                    .select('cursos.*, count(purchase.id) as total_purchase')
                    .join('purchase', { 'cursos.id': 'purchase.id_curso' })
                    .group('cursos.id')
                    .order('total_purchase', { ascending: false })
                    .limit(3); // Obtener los 3 cursos más comprados

                if (error) {
                    throw error;
                }

                setCursosPopulares(data);
            } catch (error) {
                console.error('Error al obtener cursos populares:', error.message);
            }
        }

        fetchCursosPopulares();
    }, []);
    return (
        <div className='container d-flex justify-content-center align-items-center h-40'>
            <div className='row'>
                {
                    cursos.map(curso => (
                        <div className='col-md-4' key={curso.id}>
                            <Curso
                                id={curso.id}
                                title={curso.title}
                                imageSource={curso.image}
                                url={curso.url}
                                description={curso.description}
                                price={curso.price}
                                start_date={curso.start_date}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    );
}