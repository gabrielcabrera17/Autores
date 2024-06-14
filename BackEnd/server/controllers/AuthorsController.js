const Author = require("../models/AuthorsModel");

module.exports.createAuthor = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.statusMessage = "Por favor ingrese el nombre del autor";
    return res.status(406).json({ mensaje: "El nombre es obligatorio" });
  }
  if (name.length < 3) {
    return res
      .status(406)
      .json({ mensaje: "El nombre debe ser mayor o igual a 3 caracteres" });
  }

  return Author.create({ name })
    .then((author) => {
      return res.status(201).json(author);
    })
    .catch((err) => {
      return res.status(500).json({ mensaje: "Algo salio mal" }, err);
    });
};

module.exports.getAuthors = (req, res) => {
  return Author.find()
    .then((authors) => {
      return res.status(200).json(authors);
    })
    .catch((err) => {
      return res.status(500).json({ mensaje: "Algo salio mal" }, err);
    });
};

module.exports.getAAuthor = (req, res) => {
    const id  = req.params.id;
    return Author.findById(id)
      .then((author) => {
        return res.status(200).json(author);
      })
      .catch((err) => {
        return res.status(500).json({ mensaje: "Algo salio mal" }, err);
      });
  };
  
  

  module.exports.updateAuthor = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
  
    if (!name) {
      res.statusMessage = "Por favor ingrese el nombre del autor";
      return res.status(406).json({ mensaje: "El nombre es obligatorio" });
    }
    if (name.length < 3) {
      return res.status(406).json({ mensaje: "El nombre debe ser mayor o igual a 3 caracteres" });
    }
  
    return Author.findByIdAndUpdate(id, { name }, { new: true })
      .then((author) => {
        if (!author) {
          return res.status(404).json({ mensaje: "No pudimos encontrar el autor que estás buscando." });
        }
        return res.status(200).json(author);
      })
      .catch((err) => {
        return res.status(500).json({ mensaje: "Algo salio mal", error: err });
      });
  };
  

module.exports.deleteAuthor = (req, res) => {
  const id = req.params.id;
  return Author.findByIdAndDelete(id)
    .then(() => {
      return res.status(200).json({ mensaje: "El autor ha sido eliminado" });
    })
    .catch((err) => {
      return res.status(500).json({ mensaje: "Algo salio mal" }, err);
    });
};
