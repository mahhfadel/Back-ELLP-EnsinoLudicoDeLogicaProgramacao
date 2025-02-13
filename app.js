const express = require("express");
const app = express();
const { sequelize } = require('./models');
const { authRoutes, studentRoutes, workshopRoutes } = require('./routes');

const cors = require('cors');

app.use(cors());


sequelize.sync({ alter: true })
  .then(() => {
    console.log('Banco de dados sincronizado!');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar banco de dados:', error);
  });

app.use(express.json());
app.use(authRoutes);
app.use(studentRoutes);
app.use(workshopRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Erro interno do servidor' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

module.exports = app;