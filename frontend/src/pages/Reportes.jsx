import { useEffect, useState } from "react";
import api from "../services/api";

function Reportes() {

  const [datos, setDatos] = useState([]);

  useEffect(() => {
    cargarReporte();
  }, []);

  const cargarReporte = async () => {

    try {

      const respuesta = await api.get("/reportes");

      setDatos(respuesta.data);

    } catch (error) {

      console.log(error);

      alert("Error cargando reportes");

    }

  };

  const descargarPDF = async () => {

    try {

      const response = await api.get(
        "/pdf",
        {
          responseType: "blob"
        }
      );

      const archivo = new Blob(
        [response.data],
        {
          type: "application/pdf"
        }
      );

      const url =
        window.URL.createObjectURL(archivo);

      const link =
        document.createElement("a");

      link.href = url;

      link.download =
        "ReporteParqueadero.pdf";

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

    } catch (error) {

      console.log(error);

      alert("Error al descargar PDF");

    }

  };

  return (

    <div>

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>Reporte General</h2>

        <button
          className="btn btn-success"
          onClick={descargarPDF}
        >
          📄 Descargar PDF
        </button>

      </div>

      <div className="card p-3">

        <table className="table table-striped table-hover">

          <thead>

            <tr>

              <th>ID Salida</th>
              <th>Placa</th>
              <th>Tipo</th>
              <th>Ingreso</th>
              <th>Salida</th>
              <th>Minutos</th>
              <th>Valor</th>
              <th>Método Pago</th>
              <th>Fecha Pago</th>

            </tr>

          </thead>

          <tbody>

            {datos.length > 0 ? (

              datos.map((item, index) => (

                <tr key={index}>

                  <td>{item.salida_id}</td>

                  <td>{item.placa}</td>

                  <td>{item.tipo}</td>

                  <td>
                    {new Date(
                      item.fecha_ingreso
                    ).toLocaleString()}
                  </td>

                  <td>
                    {new Date(
                      item.fecha_salida
                    ).toLocaleString()}
                  </td>

                  <td>{item.minutos}</td>

                  <td>
                    $
                    {Number(item.valor)
                      .toLocaleString()}
                  </td>

                  <td>
                    {item.metodo_pago || "Pendiente"}
                  </td>

                  <td>
                    {item.fecha_pago
                      ? new Date(
                          item.fecha_pago
                        ).toLocaleString()
                      : "Sin pago"}
                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="9"
                  className="text-center"
                >
                  No hay registros
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default Reportes;