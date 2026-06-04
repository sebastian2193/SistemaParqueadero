const PDFDocument = require("pdfkit");
const conexion = require("../config/db");

const generarPDF = (req, res) => {

    const sql = `
        SELECT
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
        ORDER BY s.fecha_salida DESC
    `;

    conexion.query(sql, (error, resultados) => {

        if (error) {
            return res.status(500).json(error);
        }

        const doc = new PDFDocument({
            margin: 30,
            size: "A4"
        });

        res.setHeader(
            "Content-Type",
            "application/pdf"
        );

        res.setHeader(
            "Content-Disposition",
            "attachment; filename=reporte_parqueadero.pdf"
        );

        doc.pipe(res);

        doc.fontSize(20);
        doc.text(
            "REPORTE GENERAL DE PARQUEADERO",
            { align: "center" }
        );

        doc.moveDown();

        doc.fontSize(12);

        resultados.forEach((item, index) => {

            doc.text(
                `${index + 1}. Placa: ${item.placa}`
            );

            doc.text(
                `Tipo: ${item.tipo}`
            );

            doc.text(
                `Ingreso: ${item.fecha_ingreso}`
            );

            doc.text(
                `Salida: ${item.fecha_salida}`
            );

            doc.text(
                `Minutos: ${item.minutos}`
            );

            doc.text(
                `Valor: $${item.valor}`
            );

            doc.moveDown();

        });

        doc.end();

    });

};

module.exports = {
    generarPDF
};