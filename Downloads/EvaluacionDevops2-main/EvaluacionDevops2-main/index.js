const express = require("express");
const app = express();

app.use(express.json());

let notas = [];

// Obtener notas
app.get("/notas", (req, res) => {
  res.json(notas);
});

// Crear nota
app.post("/notas", (req, res) => {

  if (!req.body.texto || req.body.texto.trim() === "") {
    return res.status(400).json({ error: "El campo texto es obligatorio" });
  }

  const nuevaNota = {
    id: Date.now(),
    texto: req.body.texto,
    fecha: new Date().toISOString()
  };

  notas.push(nuevaNota);
  res.json(nuevaNota);
});

const server = app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});

module.exports = server;