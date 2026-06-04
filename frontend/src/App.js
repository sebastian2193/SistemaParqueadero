import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Ingreso from "./pages/Ingreso";
import Salida from "./pages/Salida";
import Pagos from "./pages/Pagos";
import Reportes from "./pages/Reportes";

import "./styles/app.css";

function App() {

  return (

    <BrowserRouter>

      <Sidebar />

      <div className="content">

        <Routes>


          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/ingreso"
            element={<Ingreso />}
          />

          <Route
             path="/salida"
             element={<Salida />}
          />

          <Route
            path="/pagos"
            element={<Pagos />}
          />
          
          <Route
          path="/reportes"
          element={<Reportes />}
          />

        </Routes>

      </div>

    </BrowserRouter>

  );

}

export default App;