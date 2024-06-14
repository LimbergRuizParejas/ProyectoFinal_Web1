const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async function (req, res, next) {
  // Leer el token del header
  const token = req.header('x-auth-token');

  // Revisar si no hay token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Validar el token
  try {
    const decoded = jwt.verify(token, 'secrettoken');
    req.user = decoded.user;

    // Verificar si el usuario es administrador
    const user = await User.findByPk(req.user.id);
    if (user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied' });
    }

    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
