import { useEffect, useState } from "react";

function NotificacionesUsuario() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [notificaciones, setNotificaciones] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (usuario && usuario.id_usuario) {
      fetch(`https://backend-salud-ting.onrender.com/api/notificaciones/usuario/${usuario.id_usuario}`)
        .then(res => res.json())
        .then(data => {
          setNotificaciones(data);
          setCargando(false);
        })
        .catch(error => {
          console.error("Error al obtener notificaciones:", error);
          setCargando(false);
        });
    }
  }, []);

  return (
    <div>
      {cargando ? (
        <p>Cargando notificaciones...</p>
      ) : notificaciones.length === 0 ? (
        <p>No tienes notificaciones.</p>
      ) : (
        <ul>
          {notificaciones.map((noti) => (
            <li key={noti.id_notificacion}>
              {noti.mensaje} <small style={{ color: "gray" }}>({noti.estado})</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NotificacionesUsuario;
