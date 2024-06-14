const express = require("express");
const cors = require("cors");
const app = express();
const AuthorRoutes = require('./server/routes/AuthorsRoute');

//requerimos la base de datos
require('./server/config/baseDato');

//Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//le pasamos la app a nuestra ruta
AuthorRoutes(app);

app.listen(8080, () => {
    console.log("Server activo en el puerto 8080");
})