import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Registro.css';

const Registro = () => {
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('paciente');
  const [mensaje, setMensaje] = useState(null);
  const navigate = useNavigate();

  const handleRegistro = async (e) => {
    e.preventDefault();
    const nuevoUsuario = {
      nombre,
      apellidos,
      correo,
      contrasena,
      tipo_usuario: tipoUsuario,
    };

    try {
      const res = await fetch('https://backend-salud-ting.onrender.com/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoUsuario),
      });

      if (res.ok) {
        const user = await res.json();
        localStorage.setItem('usuario', JSON.stringify(user));
        setMensaje('Usuario registrado con éxito');
        navigate('/dashboard');
      } else {
        setMensaje('Error al registrar usuario');
      }
    } catch (err) {
      console.error(err);
      setMensaje('Fallo en la conexión');
    }
  };

  return (
    <div className="registro-container">
      <h2 className="registro-title">Registro de Usuario</h2>
      <form onSubmit={handleRegistro} className="registro-form">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          className="registro-input"
        />
        <input
          type="text"
          placeholder="Apellidos"
          value={apellidos}
          onChange={(e) => setApellidos(e.target.value)}
          required
          className="registro-input"
        />
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
          className="registro-input"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
          className="registro-input"
        />
        <select
          value={tipoUsuario}
          onChange={(e) => setTipoUsuario(e.target.value)}
          className="registro-input"
        >
          <option value="paciente">Paciente</option>
          <option value="profesional">Profesional</option>
        </select>
        <button type="submit" className="registro-button">Registrarse</button>
      </form>
      {mensaje && <p className="registro-mensaje">{mensaje}</p>}
      <p className="registro-link">
        ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
      </p>
    </div>
  );
};

export default Registro;
