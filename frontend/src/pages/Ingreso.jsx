import { useState } from "react";
import api from "../services/api";

function Ingreso() {

  const [placa, setPlaca] = useState("");
  const [tipo, setTipo] = useState("Carro");

  const guardarIngreso = async () => {

    try {

      const respuesta = await api.post(
        "/vehiculos/ingreso",
        {
          placa,
          tipo
        }
      );

      alert(respuesta.data.mensaje);

      setPlaca("");

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div>

      <h2>Ingreso Vehículo</h2>

      <input
        className="form-control mb-3"
        placeholder="Placa"
        value={placa}
        onChange={(e)=>setPlaca(e.target.value)}
      />

      <select
        className="form-control mb-3"
        value={tipo}
        onChange={(e)=>setTipo(e.target.value)}
      >
        <option>Carro</option>
        <option>Moto</option>
      </select>

      <button
        className="btn btn-primary"
        onClick={guardarIngreso}
      >
        Registrar
      </button>

    </div>

  );

}

export default Ingreso;