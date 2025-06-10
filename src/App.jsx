import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Registro from './components/Registro';
import Dashboard from './components/Dashboard';
import Usuarios from './components/Usuarios';
import Pacientes from './components/Pacientes';
import Profesionales from './components/Profesionales';
import Citas from './components/Citas';
import Notificaciones from './components/Notificaciones';
import RutaProtegida from './components/RutaProtegida';
import CrearCita from './components/CrearCita';


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/dashboard" element={<RutaProtegida><Dashboard /></RutaProtegida>} />
        <Route path="/usuarios" element={<RutaProtegida><Usuarios /></RutaProtegida>} />
        <Route path="/pacientes" element={<RutaProtegida><Pacientes /></RutaProtegida>} />
        <Route path="/profesionales" element={<RutaProtegida><Profesionales /></RutaProtegida>} />
        <Route path="/citas" element={<RutaProtegida><Citas /></RutaProtegida>} />
        <Route path="/notificaciones" element={<RutaProtegida><Notificaciones /></RutaProtegida>} />
        <Route path="/crear-cita" element={<RutaProtegida><CrearCita /></RutaProtegida>} />
      </Routes>
    </>
  );
}

export default App;
