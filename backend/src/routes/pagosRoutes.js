const express = require("express");
const router = express.Router();

const {
  registrarPago
} = require("../controllers/pagosController");

router.post("/", registrarPago);

module.exports = router;