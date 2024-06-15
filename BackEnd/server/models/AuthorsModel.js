const mongoose = require('mongoose');

const CollectionsAuthor = mongoose.Schema({
    name:{
        type: String,
        required:[true, "El nombre es demandado"],
        unique:[true, "El nombre debe ser único"],
        minlength:[3, "Please enter at least 3 characters"]
    }
})

const Author = mongoose.model('authors', CollectionsAuthor);
module.exports = Author;