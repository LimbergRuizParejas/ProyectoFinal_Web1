const bcrypt = require('bcryptjs');

const password = 'Patapom24*'; // Cambia esto a la contraseña que deseas cifrar

bcrypt.genSalt(10, (err, salt) => {
  if (err) throw err;
  bcrypt.hash(password, salt, (err, hash) => {
    if (err) throw err;
    console.log('Contraseña cifrada:', hash);
  });
});
