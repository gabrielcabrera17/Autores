// models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "El nobre es obligatorio"]
  },
  lastName: {
    type: String,
    required: [true, "Last name is El apellido es obligatorio"]
  },
  email: {
    type: String,
    required: [true, " El correo es obligatorio y único"],
    unique:[true, "El correo no se puede repetir"],
    validate: {
      validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
      message: "Please enter a valid email"
    }
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria y debe tener 8 caracteres o más"],
    minlength: [8, "Password must be 8 characters or longer"]
  }
}, { timestamps: true });

// Campo virtual para confirmación de contraseña
UserSchema.virtual('confirmPassword')
  .get(function() {
    return this._confirmPassword;
  })
  .set(function(value) {
    this._confirmPassword = value;
  });

// Middleware para validar que las contraseñas coincidan
UserSchema.pre('validate', function(next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate('confirmPassword', 'Password must match confirm password');
  }
  next();
});

// Middleware para hashear la contraseña antes de guardar el usuario
UserSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 10)
    .then(hash => {
      this.password = hash;
      next();
    });
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
