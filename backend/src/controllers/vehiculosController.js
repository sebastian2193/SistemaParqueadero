const conexion = require("../config/db");

const TARIFA_MINUTO = 100;

// =============================
// REGISTRAR INGRESO
// =============================
const registrarIngreso = (req, res) => {

  const { placa, tipo } = req.body;

  const verificarVehiculo = `
    SELECT v.id
    FROM vehiculos v
    INNER JOIN ingresos i
      ON v.id = i.vehiculo_id
    LEFT JOIN salidas s
      ON i.id = s.ingreso_id
    WHERE v.placa = ?
    AND s.id IS NULL
  `;

  conexion.query(
    verificarVehiculo,
    [placa],
    (errorVerificar, resultadoVerificar) => {

      if (errorVerificar) {
        return res.status(500).json({
          error: errorVerificar.message
        });
      }

      // Vehículo aún dentro del parqueadero
      if (resultadoVerificar.length > 0) {
        return res.status(400).json({
          mensaje: "El vehículo ya se encuentra dentro del parqueadero"
        });
      }

      const buscarVehiculo =
        "SELECT id FROM vehiculos WHERE placa = ?";

      conexion.query(
        buscarVehiculo,
        [placa],
        (errorBuscar, resultadoBuscar) => {

          if (errorBuscar) {
            return res.status(500).json({
              error: errorBuscar.message
            });
          }

          // Si la placa ya existe
          if (resultadoBuscar.length > 0) {

            const vehiculoId = resultadoBuscar[0].id;

            const sqlIngreso = `
              INSERT INTO ingresos
              (vehiculo_id, fecha_ingreso)
              VALUES (?, NOW())
            `;

            conexion.query(
              sqlIngreso,
              [vehiculoId],
              (errorIngreso) => {

                if (errorIngreso) {
                  return res.status(500).json({
                    error: errorIngreso.message
                  });
                }

                res.json({
                  mensaje: "Ingreso registrado correctamente"
                });

              }
            );

          } else {

            // Si la placa no existe
            const sqlVehiculo = `
              INSERT INTO vehiculos
              (placa, tipo)
              VALUES (?, ?)
            `;

            conexion.query(
              sqlVehiculo,
              [placa, tipo],
              (errorInsertar, resultadoInsertar) => {

                if (errorInsertar) {
                  return res.status(500).json({
                    error: errorInsertar.message
                  });
                }

                const vehiculoId =
                  resultadoInsertar.insertId;

                const sqlIngreso = `
                  INSERT INTO ingresos
                  (vehiculo_id, fecha_ingreso)
                  VALUES (?, NOW())
                `;

                conexion.query(
                  sqlIngreso,
                  [vehiculoId],
                  (errorIngreso) => {

                    if (errorIngreso) {
                      return res.status(500).json({
                        error: errorIngreso.message
                      });
                    }

                    res.json({
                      mensaje: "Ingreso registrado correctamente"
                    });

                  }
                );

              }
            );

          }

        }
      );

    }
  );

};

// =============================
// REGISTRAR SALIDA
// =============================
const registrarSalida = (req, res) => {

  const { placa } = req.body;

  const sql = `
    SELECT
      i.id,
      i.fecha_ingreso
    FROM ingresos i
    INNER JOIN vehiculos v
      ON v.id = i.vehiculo_id
    LEFT JOIN salidas s
      ON i.id = s.ingreso_id
    WHERE v.placa = ?
    AND s.id IS NULL
    ORDER BY i.id DESC
    LIMIT 1
  `;

  conexion.query(sql, [placa], (error, resultado) => {

    if (error) {
      return res.status(500).json({
        error: error.message
      });
    }

    if (resultado.length === 0) {
      return res.status(404).json({
        mensaje: "No existe un ingreso activo para esta placa"
      });
    }

    const ingreso = resultado[0];

    const fechaIngreso =
      new Date(ingreso.fecha_ingreso);

    const fechaSalida =
      new Date();

    const minutos = Math.ceil(
      (fechaSalida - fechaIngreso) /
      (1000 * 60)
    );

    const valor =
      minutos * TARIFA_MINUTO;

    const sqlSalida = `
      INSERT INTO salidas
      (
        ingreso_id,
        fecha_salida,
        minutos,
        valor
      )
      VALUES
      (
        ?,
        NOW(),
        ?,
        ?
      )
    `;

    conexion.query(
      sqlSalida,
      [
        ingreso.id,
        minutos,
        valor
      ],
      (errorSalida, resultadoSalida) => {

        if (errorSalida) {
          return res.status(500).json({
            error: errorSalida.message
          });
        }

        res.json({
          salidaId: resultadoSalida.insertId,
          placa,
          minutos,
          tarifaMinuto: TARIFA_MINUTO,
          valor
        });

      }
    );

  });

};

// =============================
// EXPORTAR
// =============================
module.exports = {
  registrarIngreso,
  registrarSalida
};