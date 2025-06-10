import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Tabla.css';

const Pacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://backend-salud-ting.onrender.com/api/pacientes')
      .then(response => response.json())
      .then(data => {
        setPacientes(data);
        setCargando(false);
      })
      .catch(error => {
        console.error('Error al obtener pacientes:', error);
        setCargando(false);
      });
  }, []);

  if (cargando) return <p>Cargando pacientes...</p>;

  return (
    <div>
      <button
        className="crear-cita-volver-btn"
        type="button"
        onClick={() => navigate('/dashboard')}
      >
        ← Volver al inicio
      </button>
      <h2>Listado de Pacientes</h2>
      <table className="tabla-listado">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Fecha de nacimiento</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map(paciente => (
            <tr key={paciente.id_usuario}>
              <td>{paciente.usuario?.nombre} {paciente.usuario?.apellidos}</td>
              <td>{paciente.telefono}</td>
              <td>{paciente.direccion}</td>
              <td>{paciente.fecha_nacimiento}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Pacientes;
