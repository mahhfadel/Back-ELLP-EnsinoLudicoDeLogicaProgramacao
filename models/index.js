const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'postgres',
  port: config.port,
  logging: console.log,
});

const Teacher = require('./teacher')(sequelize, DataTypes);
const Workshop = require('./workshop')(sequelize, DataTypes);
const Student = require('./student')(sequelize, DataTypes);
const TeachersWorkshops = require('./teachers_workshops')(sequelize, DataTypes);
const StudentsWorkshops = require('./students_workshops')(sequelize, DataTypes);

Teacher.belongsToMany(Workshop, {
  through: TeachersWorkshops,
  foreignKey: 'teacherID',
  otherKey: 'workshop_ID',
});

Workshop.belongsToMany(Teacher, {
  through: TeachersWorkshops,
  foreignKey: 'workshopID',
  otherKey: 'teacherID',
});

Student.belongsToMany(Workshop, {
  through: StudentsWorkshops,
  foreignKey: 'studentID',
  otherKey: 'workshopID',
});

Workshop.belongsToMany(Student, {
  through: StudentsWorkshops,
  foreignKey: 'workshopID',
  otherKey: 'studentID',
});

module.exports = {
  sequelize,
  Teacher,
  Workshop,
  Student,
  TeachersWorkshops,
  StudentsWorkshops,
};
