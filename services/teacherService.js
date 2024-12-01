const { Teacher } = require('../models');

exports.createTeacher = async (teacher) => {
    try {
        const newTeacher = await Teacher.create(teacher);

        // Remover o campo 'password' antes de retornar
        const teacherWithoutPassword = newTeacher.toJSON();
        delete teacherWithoutPassword.password;

        return teacherWithoutPassword;
    } catch (error) {
        throw new Error('Erro ao criar professor: ' + error.message);
    }
}
