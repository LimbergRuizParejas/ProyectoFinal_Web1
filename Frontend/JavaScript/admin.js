document.addEventListener('DOMContentLoaded', () => {
  const addCourseForm = document.getElementById('addCourseForm');
  const coursesList = document.getElementById('coursesList');
  const logoutButton = document.getElementById('logoutButton');
  const token = localStorage.getItem('token');

  if (!token) {
    alert('No estás autenticado. Por favor, inicia sesión.');
    window.location.href = 'login.html';
  }

  const getCourses = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/admin/courses', {
        headers: {
          'x-auth-token': token
        }
      });
      const courses = await response.json();
      renderCourses(courses);
    } catch (error) {
      console.error('Error al obtener los cursos:', error);
    }
  };

  const renderCourses = (courses) => {
    coursesList.innerHTML = '';
    courses.forEach(course => {
      const courseDiv = document.createElement('div');
      courseDiv.classList.add('course');
      courseDiv.innerHTML = `
        <h3>${course.title}</h3>
        <p>${course.description}</p>
        <img src="${course.image}" alt="${course.title}">
        <button onclick="editCourse(${course.id})">Editar</button>
        <button onclick="deleteCourse(${course.id})">Eliminar</button>
      `;
      coursesList.appendChild(courseDiv);
    });
  };

  addCourseForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', document.getElementById('title').value);
    formData.append('description', document.getElementById('description').value);
    formData.append('image', document.getElementById('image').files[0]);

    try {
      const response = await fetch('http://localhost:5001/api/admin/courses', {
        method: 'POST',
        headers: {
          'x-auth-token': token
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const newCourse = await response.json();
      getCourses();
      addCourseForm.reset();
    } catch (error) {
      console.error('Error al agregar el curso:', error);
    }
  });

  window.deleteCourse = async (id) => {
    if (confirm('¿Estás seguro de que deseas eliminar este curso?')) {
      try {
        const response = await fetch(`http://localhost:5001/api/admin/courses/${id}`, {
          method: 'DELETE',
          headers: {
            'x-auth-token': token
          }
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        getCourses();
      } catch (error) {
        console.error('Error al eliminar el curso:', error);
      }
    }
  };

  window.editCourse = async (id) => {
    const newTitle = prompt('Ingrese el nuevo título del curso:');
    const newDescription = prompt('Ingrese la nueva descripción del curso:');
    if (newTitle && newDescription) {
      try {
        const response = await fetch(`http://localhost:5001/api/admin/courses/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token
          },
          body: JSON.stringify({ title: newTitle, description: newDescription })
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        getCourses();
      } catch (error) {
        console.error('Error al actualizar el curso:', error);
      }
    }
  };

  logoutButton.addEventListener('click', () => {
    localStorage.removeItem('token');
    alert('Sesión cerrada');
    window.location.href = 'login.html';
  });

  getCourses();
});
