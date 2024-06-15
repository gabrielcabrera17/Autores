// controllers/RegisterController.js

const User = require("../models/UserModel");
const bcrypt = require('bcrypt');


// Función para registrar un nuevo usuario
module.exports.register = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  try {
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      confirmPassword // Asegúrate de pasar confirmPassword al crear el usuario
    });

    await user.save();

    res.status(201).json(user,token);
  } catch (error) {
    res.status(400).json(error);
  }
};

// Función para el login (ejemplo básico)
module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    
    res.statusMessage = "Login successful";
    res.status(200).json({ mensage: "Login successful" });
  } catch (error) {
    res.status(500).json(error);
  }
};
