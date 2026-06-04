const conexion = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = (req, res) => {

    const { usuario, password } = req.body;

    if (!usuario || !password) {
        return res.status(400).json({
            mensaje: "Usuario y password son obligatorios"
        });
    }

    const sql = "SELECT * FROM usuarios WHERE usuario = ?";

    conexion.query(sql, [usuario], async (error, resultado) => {

        // 🚨 ERROR MYSQL
        if (error) {
            console.log("ERROR MYSQL:", error);
            return res.status(500).json({
                mensaje: "Error en base de datos",
                error
            });
        }

        // 🚨 USUARIO NO EXISTE
        if (!resultado || resultado.length === 0) {
            return res.status(401).json({
                mensaje: "Usuario no encontrado"
            });
        }

        const usuarioDB = resultado[0];

        // 🔍 DEBUG SEGURO
        console.log("BODY RECIBIDO:", req.body);
        console.log("USUARIO BD:", usuarioDB.usuario);

        if (!usuarioDB.password) {
            console.log("ERROR: password vacío en BD");
            return res.status(500).json({
                mensaje: "Error interno de usuario (password vacío)"
            });
        }

        let coincide = false;

        try {
            coincide = await bcrypt.compare(password, usuarioDB.password);
        } catch (err) {
            console.log("ERROR BCRYPT:", err);
            return res.status(500).json({
                mensaje: "Error al validar contraseña"
            });
        }

        console.log("RESULTADO BCRYPT:", coincide);

        // ❌ PASSWORD INCORRECTO
        if (!coincide) {
            return res.status(401).json({
                mensaje: "Contraseña incorrecta"
            });
        }

        // 🔐 GENERAR TOKEN
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

        return res.json({
            mensaje: "Login correcto",
            token
        });

    });

};

module.exports = {
    login
};