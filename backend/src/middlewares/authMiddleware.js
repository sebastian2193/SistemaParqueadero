const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {

        return res.status(401).json({
            mensaje: "Token requerido"
        });

    }

    const token = authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader;

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.usuario = decoded;

        next();

    } catch (error) {

        console.log("ERROR TOKEN:", error);

        return res.status(401).json({
            mensaje: "Token inválido"
        });

    }

};

module.exports = verificarToken;