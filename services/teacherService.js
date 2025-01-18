const { Teacher } = require('../models');

exports.createTeacher = async (teacher) => {
    try {
        const newTeacher = await Teacher.create(teacher);

        const teacherWithoutPassword = newTeacher.toJSON();
        delete teacherWithoutPassword.password;

        return teacherWithoutPassword;
    } catch (error) {
        throw new Error('Erro ao criar professor: ' + error.message);
    }
}
