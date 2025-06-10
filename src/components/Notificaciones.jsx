// src/components/Notificaciones.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Tabla.css';

const Notificaciones = () => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://backend-salud-ting.onrender.com/api/notificaciones')
      .then(response => response.json())
      .then(data => {
        setNotificaciones(data);
        setCargando(false);
      })
      .catch(error => {
        console.error('Error al obtener notificaciones:', error);
        setCargando(false);
      });
  }, []);

  if (cargando) return <p>Cargando notificaciones...</p>;

  return (
    <div>
      <button
        className="crear-cita-volver-btn"
        type="button"
        onClick={() => navigate('/dashboard')}
      >
        ← Volver al inicio
      </button>
      <h2>Listado de Notificaciones</h2>
      <table className="tabla-listado">
        <thead>
          <tr>
            <th>Mensaje</th>
            <th>Fecha de envío</th>
            <th>Estado</th>
            <th>Usuario</th>
          </tr>
        </thead>
        <tbody>
          {notificaciones.map(noti => (
            <tr key={noti.id_notificacion}>
              <td>{noti.mensaje}</td>
              <td>{noti.fecha_envio}</td>
              <td>{noti.estado}</td>
              <td>{noti.usuario?.nombre} {noti.usuario?.apellidos}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Notificaciones;
