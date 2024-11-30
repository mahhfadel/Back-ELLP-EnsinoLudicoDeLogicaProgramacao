const config = require('./config/config');

const express = require("express");
const app = express();
const bodyParser = require('body-parser');

const { sequelize } = require('./models');

sequelize.sync({ force: true }).then(() => {
  console.log('Banco de dados sincronizado!');
});

const { authRoutes } = require('./routes');

app.use(bodyParser.json());
app.use(authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
