document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const adminLoginButton = document.getElementById('adminLoginButton');

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
                    window.location.href = 'index.html'; // Redirigir a la página principal
                } else {
                    alert(data.msg);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });

        adminLoginButton.addEventListener('click', async () => {
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

                    // Verificar si el usuario es administrador
                    const userResponse = await fetch('http://localhost:5001/api/users/profile', {
                        headers: {
                            'x-auth-token': data.token
                        }
                    });

                    const userData = await userResponse.json();
                    if (userData.role === 'admin') {
                        alert('Inicio de sesión como administrador exitoso');
                        window.location.href = 'admin.html'; // Redirigir a la página de administración
                    } else {
                        alert('No tienes permisos de administrador');
                    }
                } else {
                    alert(data.msg);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }
});
