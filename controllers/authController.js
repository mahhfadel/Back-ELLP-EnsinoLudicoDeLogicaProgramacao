const { authService, teacherService } = require("../services");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);

    if (token === null) {
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    return res.status(200).json({ token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao tentar fazer login.", error: error.message });
  }
};

exports.register = async (req, res) => {
    const { name, email, phone, birthdate, password, address } = req.body;

    if (!name || !email || !phone || !birthdate || !address || !password) {
      return res
        .status(400)
        .json({ message: "Não existe professor enviado no body. " });
    }

    try {
      const newTeacher = await teacherService.createTeacher({ name, email, phone, birthdate, password, address });
      
      if (!newTeacher) {
        return res.status(400).json({ message: 'Não foi possível criar o usuário.' });
      }
  
      const token = await authService.login(email, password); // Simulando um login após criação
      if (!token) {
        return res.status(401).json({ message: 'Credenciais inválidas.' });
      }
  
      return res.status(201).json({ teacher: newTeacher, token });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao criar professor.' });
    }
};
