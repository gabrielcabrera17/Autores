const mongoose = require('mongoose');
require('dotenv').config();
const URI = process.env.MONGODB_URL;

mongoose.connect(URI)
    .then(() => console.log('Base de datos conectada'))
    .catch(err => console.log("Error al intentar conectarse con la base de datos", err));