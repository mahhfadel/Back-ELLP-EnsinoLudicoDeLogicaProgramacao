const jwt = require("jsonwebtoken");
const { Teacher } = require("../models");
const bcrypt = require("bcrypt");

const generateToken = (teacher) => {
  const payload = {
    id: teacher.id,
    name: teacher.name,
    email: teacher.email,
    address: teacher.address,
    birthdate: teacher.birthdate,
    phone: teacher.phone,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

exports.login = async (email, password) => {
  try {
    const teacher = await Teacher.findOne({ where: { email } });

    if (teacher === null) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, teacher.password);

    if (!isPasswordValid) {
      return null;
    }

    return generateToken(teacher);
  } catch (error) {
    console.error(error);
    throw new Error("Error during login process");
  }
};
