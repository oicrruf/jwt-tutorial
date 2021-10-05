const express = require('express');
const mongoose = require('mongoose');
// const bodyparser = require('body-parser');
require('dotenv').config()

const PORT = process.env.PORT || 3001;
const app = express();

// capturar body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Conexión a Base de datos

// import routes

// route middlewares
app.get('/', (req, res) => {
  res.json({
    serverStatus: "ok"
  })
});

// iniciar server
app.listen(PORT, () => {
  console.log(`Servidor en puerto: ${PORT}`)
})