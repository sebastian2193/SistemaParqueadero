import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const ingresar = async () => {

    try {

      const respuesta = await api.post("/auth/login", {
        usuario,
        password
      });

      console.log("RESPUESTA BACKEND:", respuesta.data);

      // 🔐 guardar token
      localStorage.setItem("token", respuesta.data.token);

      alert("Bienvenido");

      // 🚀 redirigir al dashboard
      navigate("/dashboard");

    } catch (error) {

      console.log(error);
      alert("Credenciales inválidas");

    }

  };

  return (

    <div className="container mt-5">

      <h2>Login</h2>

      <input
        className="form-control mb-3"
        placeholder="Usuario"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
      />

      <input
        type="password"
        className="form-control mb-3"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="btn btn-primary"
        onClick={ingresar}
      >
        Ingresar
      </button>

    </div>

  );

}

export default Login;