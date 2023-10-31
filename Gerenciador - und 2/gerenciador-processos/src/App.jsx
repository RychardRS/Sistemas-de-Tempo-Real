import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [processes, setProcesses] = useState([]);
  const [pidToKill, setPidToKill] = useState('');
  const [selectedFunction, setSelectedFunction] = useState('SIGKILL'); // Valor padrão é SIGKILL

  useEffect(() => {
    axios.get('http://localhost:3001/processes')
      .then((response) => {
        setProcesses(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar processos:', error);
      });
  }, []);

  const displayedProcesses = processes.slice(0, 10);

  const killProcess = () => {
    if (!pidToKill) {
      console.error('Digite um PID válido.');
      return;
    }

    // Utilize o valor de selectedFunction para determinar a funcionalidade
    let signal = selectedFunction;

    // ...

    axios.post('http://localhost:3001/killProcess', { pid: pidToKill, valor: signal })
      .then((response) => {
        console.log(`Processo ${pidToKill} morto com sucesso.`);
        // Limpar o estado após matar o processo, se desejado
        setPidToKill('');
      })
      .catch((error) => {
        console.error('Erro ao matar processo:', error);
      });
  };

  return (
    <div className="boxContainer">
      <div className="boxGerenciador">
        <div className="backgroundTittle">
          <h2 className="styleTittle">Gerenciador de Tarefas</h2>
        </div>

        <div className="processList">
          <table>
            <thead>
              <tr>
                <th>PID</th>
                <th>PPID</th>
              </tr>
            </thead>
            <tbody>
              {displayedProcesses.map((process, index) => (
                <tr key={index}>
                  <td>{process.pid}</td>
                  <td>{process.ppid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="boxInputs">
          <div className="box2Input">
            <div className="boxGenericInput">
              <label className="tittleInput">Digite o PID</label>
              <input
                type="text"
                name="tittle"
                id="tittle"
                placeholder="Digite o PID do processo..."
                className="genericInput"
                onChange={(e) => setPidToKill(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="boxButtons">
          <div className="genericButton">
            <button className="styleButton" type="button" onClick={() => setSelectedFunction('SIGKILL')}>
              <h3 className="textButton">Kill</h3>
            </button>
          </div>
          <div className="genericButton">
            <button className="styleButton" type="button" onClick={() => setSelectedFunction('SIGSTOP')}>
              <h3 className="textButton">Stop</h3>
            </button>
          </div>
          <div className="genericButton">
            <button className="styleButton" type="button" onClick={() => setSelectedFunction('SIGCONT')}>
              <h3 className="textButton">Cont</h3>
            </button>
          </div>
          <div className="genericButton">
            <button className="styleButton" type="button" onClick={() => setSelectedFunction('SIGINT')}>
              <h3 className="textButton">Interrupt</h3>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
