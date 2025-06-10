import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Tabla.css';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://backend-salud-ting.onrender.com/api/usuarios')
      .then(response => response.json())
      .then(data => {
        setUsuarios(data);
        setCargando(false);
      })
      .catch(error => {
        console.error('Error al obtener usuarios:', error);
        setCargando(false);
      });
  }, []);

  if (cargando) return <p>Cargando usuarios...</p>;

  return (
    <div>
      <button
        className="crear-cita-volver-btn"
        type="button"
        onClick={() => navigate('/dashboard')}
      >
        ← Volver al inicio
      </button>
      <h2>Usuarios Registrados</h2>
      <table className="tabla-listado">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(usuario => (
            <tr key={usuario.id_usuario}>
              <td>{usuario.nombre} {usuario.apellidos}</td>
              <td>{usuario.correo}</td>
              <td>{usuario.tipo_usuario}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Usuarios;
