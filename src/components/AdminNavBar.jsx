import { useNavigate } from "react-router-dom";
import "./AdminNavBar.css";

function AdminNavBar() {
  const navigate = useNavigate();

  return (
    <nav className="admin-navbar">
      <button onClick={() => navigate("/usuarios")}>Usuarios</button>
      <button onClick={() => navigate("/pacientes")}>Pacientes</button>
      <button onClick={() => navigate("/profesionales")}>Profesionales</button>
      <button onClick={() => navigate("/citas")}>Citas</button>
      <button onClick={() => navigate("/notificaciones")}>Notificaciones</button>
    </nav>
  );
}

export default AdminNavBar;