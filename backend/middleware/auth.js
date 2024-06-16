const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyToken = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, 'secrettoken');
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (user && user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ msg: 'No tiene permisos de administrador' });
    }
  } catch (err) {
    res.status(500).json({ msg: 'Error del servidor' });
  }
};

module.exports = { verifyToken, isAdmin };
