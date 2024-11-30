const { Teacher } = require('../models')

exports.createTeacher = async (teacher) => {
    try{
        const newTeacher = await Teacher.create(teacher);

        return newTeacher;
    } catch (error) {
        throw new Error('Erro ao criar professor: ' + error.message);
    }
}