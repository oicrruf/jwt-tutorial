const express = require('express');
const mongoose = require('mongoose');
// const bodyparser = require('body-parser');
const authRoutes = require('./routes/auth');
const dashboadRoutes = require('./routes/dashboard');
const verifyToken = require('./routes/validate-token');
const cors = require('cors')

require('dotenv').config()


const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors())
// capturar body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Conexión a Base de datos
const uri = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@cluster0.mml2l.mongodb.net/${process.env.DBNAME}?authSource=admin&replicaSet=atlas-fxlrc3-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`;

mongoose.connect(uri,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log('Base de datos conectada 🤘'))
  .catch(e => console.log('error db:', e))

// import routes

// route middlewares
app.get('/', (req, res) => {
  res.json({
    serverStatus: "ok"
  })
});

app.use('/api/dashboard', verifyToken, dashboadRoutes); // Posee un middleware que valida que haya un usuario logueado

app.use('/api/user', authRoutes);

// iniciar server
app.listen(PORT, () => {
  console.log(`Servidor en puerto: ${PORT}`)
})