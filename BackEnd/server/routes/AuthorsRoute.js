
const AuthorController = require('../controllers/AuthorsController');
const RegisterController = require('../controllers/RegisterController');

module.exports = (app) => {
    // Rutas de autores
    app.post('/api/create/authors', AuthorController.createAuthor);
    app.get('/api/authors', AuthorController.getAuthors);
    app.get('/api/author/:id', AuthorController.getAAuthor);
    app.put('/api/update/author/:id', AuthorController.updateAuthor);
    app.delete('/api/delete/author/:id', AuthorController.deleteAuthor);

    // Rutas de usuarios
    app.post('/api/register', RegisterController.register);
    app.post('/api/login', RegisterController.login);
}
