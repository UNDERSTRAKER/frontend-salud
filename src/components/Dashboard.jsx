import { useNavigate } from "react-router-dom";
import NotificacionesUsuario from "./NotificacionesUsuario";
import AdminNavBar from "./AdminNavBar";
import "./Dashboard.css";

function Dashboard() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      {/* Botón de cerrar sesión visible para todos */}
      <button
        className="cerrar-sesion-btn"
        style={{
          marginLeft: "auto",
          background: "#e74c3c",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          padding: "10px 18px",
          fontFamily: "'Poppins', sans-serif",
          fontSize: "1em",
          cursor: "pointer",
          marginBottom: "1em",
          display: "block"
        }}
        onClick={handleLogout}
      >
        Cerrar sesión
      </button>

      {/* Solo muestra la barra si el usuario es admin */}
      {usuario?.correo === "admin@email.com" && <AdminNavBar />}

      <div className="bienvenida">
        <h2>
          Bienvenido, {usuario?.nombre} 👋
        </h2>
        <p>¿Qué deseas hacer hoy?</p>
      </div>
      <div className="dashboard-main">
        <div className="acciones">
          <button onClick={() => navigate("/crear-cita")}>
            Crear cita
          </button>
          <button onClick={() => navigate("/profesionales")}>
            Ver profesionales
          </button>
          <button onClick={() => navigate("/citas")}>
            Consultar mis citas
          </button>
        </div>
        <div className="notificaciones">
          <h3>Notificaciones</h3>
          <NotificacionesUsuario />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;