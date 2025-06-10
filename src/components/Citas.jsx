import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Tabla.css';

const Citas = () => {
  const [citas, setCitas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  const usuario = JSON.parse(localStorage.getItem('usuario'));

  const obtenerCitas = () => {
    fetch('https://backend-salud-ting.onrender.com/api/citas')
      .then(res => res.json())
      .then(data => {
        let citasFiltradas = data;
        if (usuario.tipo_usuario === 'paciente') {
          citasFiltradas = data.filter(cita => cita.paciente?.id_usuario === usuario.id_usuario);
        } else if (usuario.tipo_usuario === 'profesional') {
          citasFiltradas = data.filter(cita => cita.profesional?.id_usuario === usuario.id_usuario);
        }
        // Si es admin, no filtra nada
        setCitas(citasFiltradas);
        setCargando(false);
      })
      .catch(err => {
        console.error('Error al obtener citas:', err);
        setCargando(false);
      });
  };

  useEffect(() => {
    obtenerCitas();
  }, []);

  return (
    <div>
      <button
        className="crear-cita-volver-btn"
        type="button"
        onClick={() => navigate('/dashboard')}
      >
        ← Volver al inicio
      </button>
      <h2 className='titulo'>Listado de Citas</h2>
      {cargando ? (
        <p>Cargando citas...</p>
      ) : citas.length === 0 ? (
        <p>No hay citas disponibles.</p>
      ) : (
        <table className="tabla-listado">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Motivo</th>
              <th>Estado</th>
              <th>Paciente</th>
              <th>Profesional</th>
            </tr>
          </thead>
          <tbody>
            {citas.map((cita) => (
              <tr key={cita.id_cita}>
                <td>{cita.fecha}</td>
                <td>{cita.hora}</td>
                <td>{cita.motivo}</td>
                <td>{cita.estado}</td>
                <td>
                  {cita.paciente?.usuario?.nombre} {cita.paciente?.usuario?.apellidos}
                </td>
                <td>
                  {cita.profesional?.usuario?.nombre} {cita.profesional?.usuario?.apellidos}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Citas;
