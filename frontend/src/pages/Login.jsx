import { useState } from "react";
import api from "../services/api";

function Login() {

  const [usuario,setUsuario] =
  useState("");

  const [password,setPassword] =
  useState("");

  const ingresar = async () => {

    try {

      const respuesta =
      await api.post(
        "/auth/login",
        {
          usuario,
          password
        }
      );

      localStorage.setItem(
        "token",
        respuesta.data.token
      );

      alert("Bienvenido");

    } catch(error) {

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
        onChange={(e)=>setUsuario(e.target.value)}
      />

      <input
        type="password"
        className="form-control mb-3"
        placeholder="Contraseña"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
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