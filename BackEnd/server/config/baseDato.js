const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/autores_db')
    .then(() => console.log('Base de datos conectada'))
    .catch(err => console.log("Error al intentar conectarse con la base de datos", err));