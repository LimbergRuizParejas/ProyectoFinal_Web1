const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Course = require('./Course');

const Lesson = sequelize.define('Lesson', {
  course_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Course,
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Lesson;
