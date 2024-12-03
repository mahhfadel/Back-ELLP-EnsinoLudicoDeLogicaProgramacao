const express = require("express");
const app = express();
const { sequelize } = require('./models');
const { authRoutes } = require('./routes');

const cors = require('cors');

app.use(cors({
    origin: 'https://ellp-ten.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Adicione os métodos que seu servidor suporta
}));


sequelize.sync({ alter: true })
  .then(() => {
    console.log('Banco de dados sincronizado!');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar banco de dados:', error);
  });

app.use(express.json());
app.use(authRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Erro interno do servidor' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

module.exports = app;