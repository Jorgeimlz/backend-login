require('dotenv').config();
const express = require('express');
const app = express();

// Configuraciones
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

// Puerto de escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
