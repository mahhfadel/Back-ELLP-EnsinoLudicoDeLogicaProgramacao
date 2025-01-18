const { Student } = require('../models');

exports.getStudents = async () => {
    try{
        const students = await Student.findAll();
        return students;
    } catch(error){
        throw new Error(error.message);
    }
}

exports.createStudent = async (student) => {
    try{
        const newStudent = await Student.create(student);
        return newStudent;
    } catch(error){
        throw new Error(error.message);
    }
}