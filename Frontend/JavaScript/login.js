document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');
  const loginForm = document.getElementById('loginForm');
  const adminLoginForm = document.getElementById('adminLoginForm');

  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const response = await fetch('http://localhost:5001/api/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();
        alert(data.msg);
      } catch (error) {
        console.error('Error:', error);
      }
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;

      try {
        const response = await fetch('http://localhost:5001/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (data.token) {
          localStorage.setItem('token', data.token);
          alert('Inicio de sesión exitoso');
          window.location.href = 'index.html';
        } else {
          alert(data.msg);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });
  }

  if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('adminLoginEmail').value;
      const password = document.getElementById('adminLoginPassword').value;

      try {
        const response = await fetch('http://localhost:5001/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (data.token && data.role === 'admin') {
          localStorage.setItem('token', data.token);
          alert('Inicio de sesión de administrador exitoso');
          window.location.href = 'admin.html';
        } else {
          alert(data.msg || 'No tienes permisos de administrador');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });
  }
});
