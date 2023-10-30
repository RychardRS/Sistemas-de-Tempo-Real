// server.js

const express = require('express');
const ps = require('ps-node');
const cors = require('cors');

const app = express();
const port = 3001; // Porta do servidor

app.use(cors());

app.get('/processes', (req, res) => {
  ps.lookup({}, (err, resultList) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao buscar processos.');
    }

    const processes = resultList.map((process) => ({
      pid: process.pid,
      ppid: process.ppid,
      command: process.command,
    }));

    res.json(processes);
  });
});

app.listen(port, () => {
  console.log(`Servidor em execução na porta ${port}`);
});