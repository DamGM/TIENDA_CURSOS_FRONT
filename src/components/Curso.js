import React from 'react'
import Curso from './Cursos'
import { supabase } from '../services/client';
import { useState, useEffect } from 'react';


export default function Cursos() {
    const [cursos, setCursos] = useState([]);

    useEffect(() => {
        async function fetchCursos() {
            try {
                const { data, error } = await supabase
                    .from('cursos')
                    .select('*')
                if (error) {
                    throw error;
                }

                setCursos(data);
            } catch (error) {
                console.error('Error al obtener cursos:', error.message);
            }
        }

        fetchCursos();
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