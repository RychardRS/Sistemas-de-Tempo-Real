// server.js

const express = require('express');
const ps = require('ps-node');
const cors = require('cors');
const bodyParser = require('body-parser'); // Importe o bodyParser

const app = express();
const port = 3001; // Porta do servidor

app.use(cors());

// Use o bodyParser para analisar o corpo da solicitação
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.post('/killProcess', (req, res) => {
  const { pid, valor } = req.body;

  // Verifique o valor da funcionalidade e envie o sinal apropriado para matar o processo
  let signal;
  switch (valor) {
    case 19:
      signal = 'SIGSTOP';
      break;
    case 18:
      signal = 'SIGCONT';
      break;
    case 2:
      signal = 'SIGINT';
      break;
    case 9:
      signal = 'SIGKILL';
      break;
    default:
      return res.status(400).send('Valor de funcionalidade inválido.');
  }

  try {
    // Utilize o sinal para matar o processo
    process.kill(pid, signal);
    res.status(200).send(`Processo ${pid} morto com sucesso.`);
  } catch (error) {
    console.error('Erro ao matar processo:', error);
    res.status(500).send('Erro ao matar processo.');
  }
});

app.listen(port, () => {
  console.log(`Servidor em execução na porta ${port}`);
});
