import { Link } from "react-router-dom";

function Sidebar() {

  return (
    <div className="sidebar">

      <h3>Parqueadero</h3>

      <Link to="/">Inicio</Link>

      <Link to="/ingreso">Ingresos</Link>

      <Link to="/salida">Salidas</Link>

      <Link to="/pagos">Pagos</Link>

      <Link to="/reportes">Reportes</Link>

    </div>
  );

}

export default Sidebar;