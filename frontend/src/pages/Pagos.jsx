import { useState } from "react";
import api from "../services/api";

function Pagos() {

  const [salidaId, setSalidaId] = useState("");
  const [metodo, setMetodo] = useState("Efectivo");

  const guardarPago = async () => {

    try {

      const respuesta = await api.post(
        "/pagos",
        {
          salida_id: salidaId,
          metodo_pago: metodo
        }
      );

      alert(respuesta.data.mensaje);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div>

      <h2>Registrar Pago</h2>

      <input
        className="form-control mb-3"
        placeholder="ID Salida"
        value={salidaId}
        onChange={(e)=>setSalidaId(e.target.value)}
      />

      <select
        className="form-control mb-3"
        value={metodo}
        onChange={(e)=>setMetodo(e.target.value)}
      >
        <option>Efectivo</option>
        <option>Nequi</option>
        <option>Daviplata</option>
        <option>Tarjeta</option>
      </select>

      <button
        className="btn btn-success"
        onClick={guardarPago}
      >
        Registrar Pago
      </button>

    </div>

  );

}

export default Pagos;