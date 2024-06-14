const AuthorController = require('../controllers/AuthorsController');

module.exports = (app) => {
    app.post('/api/create/authors', AuthorController.createAuthor);
    app.get('/api/authors',AuthorController.getAuthors);
    app.get('/api/author/:id',AuthorController.getAAuthor);
    app.put('/api/update/author/:id',AuthorController.updateAuthor);
    app.delete('/api/delete/author/:id',AuthorController.deleteAuthor);
}