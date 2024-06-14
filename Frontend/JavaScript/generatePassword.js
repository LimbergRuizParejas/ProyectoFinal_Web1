const bcrypt = require('bcryptjs');

const password = 'Patapom24*'; // Reemplaza con la contraseña deseada

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    if (err) throw err;
    console.log('Contraseña cifrada:', hash);
  });
});
