const express = require("express");
const router = express.Router();

const {
  registrarIngreso,
  registrarSalida
} = require("../controllers/vehiculosController");

router.post("/ingreso", registrarIngreso);
router.post("/salida", registrarSalida);

module.exports = router;