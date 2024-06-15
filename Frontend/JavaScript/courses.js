document.addEventListener('DOMContentLoaded', () => {
    const coursesList = document.getElementById('coursesList');

    const getCourses = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/courses');
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
                <img src="uploads/${course.image}" alt="${course.title}">
            `;
            coursesList.appendChild(courseDiv);
        });
    };

    getCourses();
});
