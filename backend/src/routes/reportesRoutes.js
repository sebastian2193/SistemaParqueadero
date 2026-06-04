const express = require("express");
const router = express.Router();

const {
  obtenerReporte
} = require("../controllers/reportesController");

const verificarToken =
require("../middlewares/authMiddleware");

router.get(
  "/",
  verificarToken,
  obtenerReporte
);

module.exports = router;