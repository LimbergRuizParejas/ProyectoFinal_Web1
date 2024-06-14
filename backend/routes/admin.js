const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Course = require('../models/Course');
const adminAuth = require('../middleware/adminAuth');

// Obtener todos los cursos
router.get('/courses', adminAuth, async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

// Crear un nuevo curso
router.post('/courses', [
  adminAuth,
  [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('description', 'La descripción es obligatoria').not().isEmpty(),
    check('image', 'La URL de la imagen es obligatoria').not().isEmpty()
  ]
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, image } = req.body;

  try {
    const newCourse = await Course.create({
      title,
      description,
      image
    });

    res.json(newCourse);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

// Actualizar un curso
router.put('/courses/:id', adminAuth, async (req, res) => {
  const { title, description, image } = req.body;

  try {
    let course = await Course.findByPk(req.params.id);

    if (!course) {
      return res.status(404).json({ msg: 'Curso no encontrado' });
    }

    // Actualizar los detalles del curso
    course.title = title || course.title;
    course.description = description || course.description;
    course.image = image || course.image;

    await course.save();
    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

// Eliminar un curso
router.delete('/courses/:id', adminAuth, async (req, res) => {
  try {
    let course = await Course.findByPk(req.params.id);

    if (!course) {
      return res.status(404).json({ msg: 'Curso no encontrado' });
    }

    await course.destroy();
    res.json({ msg: 'Curso eliminado' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

module.exports = router;
