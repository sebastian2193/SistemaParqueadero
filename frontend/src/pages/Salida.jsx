import { useState } from "react";
import api from "../services/api";

function Salida() {

  const [placa, setPlaca] = useState("");
  const [resultado, setResultado] = useState(null);

  const registrarSalida = async () => {

    try {

      const respuesta = await api.post(
        "/vehiculos/salida",
        {
          placa
        }
      );

      setResultado(respuesta.data);

    } catch (error) {

      alert("Error al registrar salida");

      console.log(error);

    }

  };

  return (

    <div>

      <h2>Salida de Vehículo</h2>

      <input
        className="form-control mb-3"
        placeholder="Placa"
        value={placa}
        onChange={(e) => setPlaca(e.target.value)}
      />

      <button
        className="btn btn-danger"
        onClick={registrarSalida}
      >
        Registrar Salida
      </button>

      {resultado && (

        <div className="card mt-4 p-3">

          <h4>Detalle de Cobro</h4>

          <p><strong>Placa:</strong> {resultado.placa}</p>

          <p><strong>Minutos:</strong> {resultado.minutos}</p>

          <p><strong>Tarifa:</strong> ${resultado.tarifaMinuto}</p>

          <p><strong>Total:</strong> ${resultado.valor}</p>

        </div>

      )}

    </div>

  );

}

export default Salida;
