// src/components/Profesionales.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Tabla.css';

const Profesionales = () => {
  const [profesionales, setProfesionales] = useState([]);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://backend-salud-ting.onrender.com/api/profesionales')
      .then(response => response.json())
      .then(data => {
        setProfesionales(data);
        setCargando(false);
      })
      .catch(error => {
        console.error('Error al obtener profesionales:', error);
        setCargando(false);
      });
  }, []);

  if (cargando) return <p>Cargando profesionales...</p>;

  return (
    <div>
      <button
        className="crear-cita-volver-btn"
        type="button"
        onClick={() => navigate('/dashboard')}
      >
        ← Volver al inicio
      </button>
      <h2 className='titulo'>Listado de Profesionales</h2>
      <table className="tabla-listado">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Registro</th>
            <th>Especialidad</th>
          </tr>
        </thead>
        <tbody>
          {profesionales.map(prof => (
            <tr key={prof.id_usuario}>
              <td>{prof.usuario?.nombre} {prof.usuario?.apellidos}</td>
              <td>{prof.registroProfesional}</td>
              <td>{prof.especialidad?.nombre}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Profesionales;
