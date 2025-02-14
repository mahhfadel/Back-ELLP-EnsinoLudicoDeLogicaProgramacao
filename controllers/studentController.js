const { studentService } = require('../services');

exports.getStudents = async (req, res) => {
    try{
        const students = await studentService.getStudents();

        return res.status(200).json({
            message: 'Oficinas encontradas com sucesso.',
            data: students
        });
    } catch(error) {
        return res.status(500).json({
            message: 'Erro ao buscar oficinas',
            error: error.message
        });
    }
}

exports.createStudent = async(req, res) => {
    try{
        const student = req.body;

        if(!student){
            return res.status(400).json({ message: 'Não existe estudante enviado no body.'});
        }

        const studentWithId = await studentService.createStudent(student);

        return res.status(201).json({
            message: "Estudante criado com sucesso.",
            data: studentWithId
        });
    } catch (error){
        return res.status(500).json({
            message: 'Erro ao criar estudante.',
            error: error.message
        });
    }
}