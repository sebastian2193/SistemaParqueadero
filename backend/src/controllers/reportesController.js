const conexion = require("../config/db");

const obtenerReporte = (req, res) => {

  const sql = `
    SELECT
      s.id AS salida_id,
      v.placa,
      v.tipo,
      i.fecha_ingreso,
      s.fecha_salida,
      s.minutos,
      s.valor
    FROM vehiculos v
    INNER JOIN ingresos i
      ON v.id = i.vehiculo_id
    INNER JOIN salidas s
      ON i.id = s.ingreso_id
  `;

  conexion.query(sql, (error, resultado) => {

    if (error) {
      return res.status(500).json(error);
    }

    res.json(resultado);

  });

};

module.exports = {
  obtenerReporte
};