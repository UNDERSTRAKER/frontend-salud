import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Agrega esta línea
import './CrearCita.css';

const CrearCita = () => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [motivo, setMotivo] = useState('');
    const [profesionales, setProfesionales] = useState([]);
    const [profesionalSeleccionado, setProfesionalSeleccionado] = useState('');
    const navigate = useNavigate(); // Agrega esta línea

    useEffect(() => {
        fetch('https://backend-salud-ting.onrender.com/api/profesionales')
            .then(res => res.json())
            .then(data => setProfesionales(data))
            .catch(err => console.error('Error al obtener profesionales:', err));
    }, []);

    const crearCita = async (e) => {
        e.preventDefault();

        const cita = {
            fecha,
            hora,
            motivo,
            paciente: { id_usuario: usuario.id_usuario },
            profesional: { id_usuario: parseInt(profesionalSeleccionado) }
        };

        try {
            const res = await fetch('https://backend-salud-ting.onrender.com/api/citas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cita)
            });

            if (res.ok) {
                alert('Cita creada exitosamente');
                setFecha('');
                setHora('');
                setMotivo('');
                setProfesionalSeleccionado('');
            } else {
                alert('Error al crear la cita');
            }
        } catch (err) {
            console.error('Error:', err);
            alert('Error en la solicitud');
        }
    };

    return (
        <div className="crear-cita-container">
            <button
                className="crear-cita-volver-btn"
                type="button"
                onClick={() => navigate('/dashboard')}
            >
                ← Volver al Inicio
            </button>
            <h2 className="crear-cita-title">Crear Cita</h2>
            <form className="crear-cita-form" onSubmit={crearCita}>
                <label>Fecha:</label>
                <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />

                <label>Hora:</label>
                <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} required />

                <label>Motivo:</label>
                <textarea value={motivo} onChange={(e) => setMotivo(e.target.value)} required />

                <label>Profesional:</label>
                <select value={profesionalSeleccionado} onChange={(e) => setProfesionalSeleccionado(e.target.value)} required>
                    <option value="">Seleccione un profesional</option>
                    {profesionales.map(p => (
                        <option key={p.id_usuario} value={p.id_usuario}>
                            {p.usuario.nombre} {p.usuario.apellidos} - {p.especialidad.nombre}
                        </option>
                    ))}
                </select>

                <button className="crear-cita-btn" type="submit">Guardar Cita</button>
            </form>
        </div>
    );
};

export default CrearCita;