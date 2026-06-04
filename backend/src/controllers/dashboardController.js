const conexion = require("../config/db");

const obtenerDashboard = (req, res) => {

    const sql = `
    SELECT

    (
        SELECT COUNT(*)
        FROM ingresos i
        LEFT JOIN salidas s
        ON i.id = s.ingreso_id
        WHERE s.id IS NULL
    ) AS vehiculosActivos,

    (
        SELECT COUNT(*)
        FROM ingresos i
        INNER JOIN vehiculos v
        ON i.vehiculo_id = v.id
        LEFT JOIN salidas s
        ON i.id = s.ingreso_id
        WHERE s.id IS NULL
        AND v.tipo = 'Moto'
    ) AS motosActivas,

    (
        SELECT COUNT(*)
        FROM ingresos i
        INNER JOIN vehiculos v
        ON i.vehiculo_id = v.id
        LEFT JOIN salidas s
        ON i.id = s.ingreso_id
        WHERE s.id IS NULL
        AND v.tipo = 'Carro'
    ) AS carrosActivos,

    (
        SELECT COUNT(*)
        FROM ingresos
        WHERE DATE(fecha_ingreso)=CURDATE()
    ) AS ingresosHoy,

    (
        SELECT IFNULL(SUM(valor),0)
        FROM salidas
        WHERE DATE(fecha_salida)=CURDATE()
    ) AS recaudoHoy
    `;

    conexion.query(sql, (error, resultado) => {

        if (error) {
            return res.status(500).json(error);
        }

        res.json(resultado[0]);

    });

};

module.exports = {
    obtenerDashboard
};