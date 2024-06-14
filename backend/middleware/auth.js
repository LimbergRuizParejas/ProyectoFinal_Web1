const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
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
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
