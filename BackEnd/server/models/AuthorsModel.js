const mongoose = require('mongoose');

const CollectionsAuthor = mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength:[3, "Please enter at least 3 characters"]
    }
})

const Author = mongoose.model('authors', CollectionsAuthor);
module.exports = Author;