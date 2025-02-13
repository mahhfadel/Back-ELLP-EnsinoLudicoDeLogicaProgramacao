const { Workshop } = require('../models');
const { StudentsWorkshops } = require('../models');

exports.getWorkshops = async () => {
    try{
        const workshops = await Workshop.findAll({});
        return workshops;
    } catch(error){
        throw new Error(error.message);
    }
}

exports.createWorkshop = async (workshop) => {
    try{
        const newWorkshop = await Workshop.create(workshop);
        return newWorkshop;
    } catch(error){
        throw new Error(error.message);
    }
}

exports.addStudentsToWorkshop = async (workshopId, studentIds) => {
    try {
      const studentWorkshopData = studentIds.map((studentId) => ({
        studentID: studentId,
        workshopID: workshopId,
      }));
  
      const newStudentsWorkshops = await StudentsWorkshops.bulkCreate(studentWorkshopData);
  
      return newStudentsWorkshops;
    } catch (error) {
      throw new Error(`Error adding students to workshop: ${error.message}`);
    }
  };

  exports.getStudentsByWorkshop = async (workshopId) => {
    try {
        // Encontrar todos os estudantes associados ao workshop
        const students = await StudentsWorkshops.findAll({
            where: { workshopID: workshopId },
            include: [
                {
                    model: Student, // Supondo que a tabela de estudantes se chama 'Student'
                    attributes: ['id', 'name', 'email'], // Adicione os campos desejados dos estudantes
                },
            ],
        });

        // Extrair os dados dos estudantes do resultado
        const studentList = students.map(studentWorkshop => studentWorkshop.Student);
        
        return studentList;
    } catch (error) {
        throw new Error(`Error fetching students for workshop: ${error.message}`);
    }
};
  
exports.markStudentAsCompleted = async (workshopId, studentId) => {
  try {
      const studentWorkshop = await StudentsWorkshops.findOne({
          where: {
              workshopID: workshopId,
              studentID: studentId
          }
      });

      if (!studentWorkshop) {
          throw new Error('Student not found in this workshop');
      }
      studentWorkshop.isCompleted = true;
      await studentWorkshop.save();

      return studentWorkshop;
  } catch (error) {
      throw new Error(`Error marking student as completed: ${error.message}`);
  }
};