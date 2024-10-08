const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

module.exports = {
  async register(req, res) {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
      const user = await userModel.createUser(username, hashedPassword);
      res.status(201).json({ message: 'Usuario creado', user });
    } catch (error) {
      res.status(400).json({ error: 'No se pudo crear el usuario' });
    }
  },

  async login(req, res) {
    const { username, password } = req.body;
    const user = await userModel.findUserByUsername(username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login exitoso', token });
  }
};
