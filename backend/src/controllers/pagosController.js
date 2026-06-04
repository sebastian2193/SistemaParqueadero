const conexion = require("../config/db");

const registrarPago = (req, res) => {

  const { salida_id, metodo_pago } = req.body;

  const sql = `
    INSERT INTO pagos
    (salida_id, metodo_pago, fecha_pago)
    VALUES (?, ?, NOW())
  `;

  conexion.query(
    sql,
    [salida_id, metodo_pago],
    (error, resultado) => {

      if (error) {
        return res.status(500).json(error);
      }

      res.json({
        mensaje: "Pago registrado correctamente",
        pagoId: resultado.insertId
      });

    }
  );

};

module.exports = {
  registrarPago
};