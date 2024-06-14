document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

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
        window.location.href = 'courses.html';
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });
});
