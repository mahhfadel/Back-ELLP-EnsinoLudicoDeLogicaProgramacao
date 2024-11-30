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
  try {
    const teacher = req.body;

    if (!teacher) {
      return res
        .status(400)
        .json({ message: "Não existe user enviado no body. " });
    }

    const teacherWithId = await teacherService.createTeacher(teacher);

    if (!teacherWithId) {
      return res
        .status(400)
        .json({ message: "Não foi possível criar o usuário." });
    }

    const { email, password } = req.body;
    const token = await authService.login(email, password);

    if (token === null) {
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    return res
      .status(201)
      .json({
        teacher: {
          id: teacherWithId.id,
          email: teacherWithId.email,
          phone: teacherWithId.phone,
          name: teacherWithId.name,
          address: teacherWithId.address,
          birthdate: teacherWithId.birthdate,
        },
        token,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao criar professor.", error: error.message });
  }
};
