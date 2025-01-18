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
  