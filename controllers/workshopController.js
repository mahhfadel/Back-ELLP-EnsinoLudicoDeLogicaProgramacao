const { workshopService } = require('../services');

exports.getWorkshops = async (req, res) => {
    try{
        const workshops = await workshopService.getWorkshops();

        if(!workshops || workshops.length === 0){
            return res.status(404).json({ message: 'Nenhuma oficina encontrado.'});
        }

        return res.status(200).json({
            message: 'Oficinas encontradas com sucesso.',
            data: workshops
        });
    } catch(error) {
        return res.status(500).json({
            message: 'Erro ao buscar oficinas',
            error: error.message
        });
    }
}

exports.createWorkshop = async(req, res) => {
    try{
        const workshop = req.body;

        if(!workshop){
            return res.status(400).json({ message: 'Não existe oficina enviada no body.'});
        }

        const workshopWithId = await workshopService.createWorkshop(workshop);

        return res.status(201).json({
            message: "Oficina criada com sucesso.",
            data: workshopWithId
        });
    } catch (error){
        return res.status(500).json({
            message: 'Erro ao criar oficina.',
            error: error.message
        });
    }
}

exports.addStudentsToWorkshop = async (req, res) => {
    try {
      const workshopId = parseInt(req.params.id, 10);
  
      if (!workshopId || workshopId <= 0) {
        return res.status(400).json({ message: 'O ID do Workshop deve ser maior que 0.' });
      }
  
      const { studentIds } = req.body;
  
      if (!Array.isArray(studentIds) || studentIds.length === 0) {
        return res.status(400).json({ message: 'É preciso enviar um array de IDs de estudantes no body.' });
      }
  
      const studentsWorkshops = await workshopService.addStudentsToWorkshop(workshopId, studentIds);
  
      return res.status(201).json({
        message: 'Estudantes adicionados à oficina com sucesso.',
        data: studentsWorkshops,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Erro ao associar alunos e oficinas.',
        error: error.message,
      });
    }
  };
  