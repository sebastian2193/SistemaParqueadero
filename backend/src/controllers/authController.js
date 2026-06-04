const conexion = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = (req, res) => {

    const { usuario, password } = req.body;

    const sql =
    "SELECT * FROM usuarios WHERE usuario = ?";

    conexion.query(
        sql,
        [usuario],
        async (error, resultado) => {

            if (error) {
                return res.status(500).json(error);
            }

            if (resultado.length === 0) {
                return res.status(401).json({
                    mensaje: "Usuario no encontrado"
                });
            }

            const usuarioDB = resultado[0];

            const coincide =
            await bcrypt.compare(
                password,
                usuarioDB.password
            );

            if (!coincide) {

                return res.status(401).json({
                    mensaje: "Contraseña incorrecta"
                });

            }

            const token = jwt.sign(
                {
                    id: usuarioDB.id,
                    usuario: usuarioDB.usuario
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "8h"
                }
            );

            res.json({
                mensaje: "Login correcto",
                token
            });

        }
    );

};

module.exports = {
    login
};