const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { check, validationResult } = require('express-validator');
const Course = require('../models/Course');
const { verifyToken, isAdmin } = require('../middleware/auth');
const fs = require('fs');

// Crear el directorio de uploads si no existe
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configuración de multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Agregar la fecha actual al nombre del archivo
  }
});

const upload = multer({ storage: storage });

// Obtener todos los cursos
router.get('/courses', verifyToken, isAdmin, async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

// Crear un nuevo curso
router.post('/courses', upload.single('image'), [
  verifyToken,
  isAdmin,
  [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('description', 'La descripción es obligatoria').not().isEmpty()
  ]
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description } = req.body;
  const image = req.file ? req.file.path : '';

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
router.put('/courses/:id', verifyToken, isAdmin, upload.single('image'), [
  check('title', 'El título es obligatorio').optional().not().isEmpty(),
  check('description', 'La descripción es obligatoria').optional().not().isEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    let course = await Course.findByPk(req.params.id);

    if (!course) {
      return res.status(404).json({ msg: 'Curso no encontrado' });
    }

    course.title = title || course.title;
    course.description = description || course.description;
    if (image) {
      course.image = image;
    }

    await course.save();
    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

// Eliminar un curso
router.delete('/courses/:id', verifyToken, isAdmin, async (req, res) => {
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
