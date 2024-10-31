const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Rota principal que responde com "Hello World"
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
