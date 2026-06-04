const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Conexión a la base de datos
require("./src/config/db");

// Importar rutas
const vehiculosRoutes = require("./src/routes/vehiculosRoutes");
const pagosRoutes = require("./src/routes/pagosRoutes");
const reportesRoutes = require("./src/routes/reportesRoutes");
const dashboardRoutes = require("./src/routes/dashboardRoutes");
const authRoutes = require("./src/routes/authRoutes");
const pdfRoutes = require("./src/routes/pdfRoutes");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente");
});

// Ruta de prueba
app.get("/test", (req, res) => {
  res.send("TEST OK");
});

// Rutas del sistema
app.use("/vehiculos", vehiculosRoutes);
app.use("/pagos", pagosRoutes);
app.use("/reportes", reportesRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/auth", authRoutes);
app.use("/pdf", pdfRoutes);
// Puerto
const PORT = process.env.PORT || 3001;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});