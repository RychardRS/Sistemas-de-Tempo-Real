import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [processes, setProcesses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/processes')
      .then((response) => {
        setProcesses(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar processos:', error);
      });
  }, []);

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
        <th>Nome do Processo</th>
      </tr>
    </thead>
    <tbody>
      {processes.map((process, index) => (
        <tr key={index}>
          <td>{process.pid}</td>
          <td>{process.ppid}</td>
          <td>{process.command}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

        <div className="boxInputs">
          <div className="box2Input">
            <div className="boxGenericInput">
              <label className="tittleInput">Título</label>
              <input
                type="text"
                name="tittle"
                id="tittle"
                placeholder="Digite o seu título..."
                className="genericInput"
                maxLength="50"
              />
            </div>
          </div>
          <div className="box2Input">
            <div className="boxGenericInput" style={{ marginTop: '-30px' }}>
              <label className="tittleInput">Descrição</label>
              <textarea
                type="text"
                name="descricao"
                id="descricao"
                placeholder="Digite sua descrição...."
                className="textArea"
                maxLength="100"
              ></textarea>
            </div>
          </div>
          <div className="box3Input">
            <div className="boxDeadLine" style={{ width: '84%' }}>
              <label className="tittleInput">Deadline</label>
              <input
                type="text"
                name="deadline"
                id="deadline"
                className="genericInput"
                maxLength="50"
              />
            </div>
            <div className="boxDeadLineMobile">
              <label className="tittleInput">Deadline</label>
              <input
                type="text"
                name="deadline2"
                id="deadline2"
                className="genericInput"
                maxLength="50"
              />
            </div>
          </div>
        </div>

        <div className="boxButtons">
          <div className="genericButton">
            <button className="styleButton" type="button">
              <h3 className="textButton">Kill</h3>
            </button>
          </div>
          <div className="genericButton">
            <button className="styleButton" type="button">
              <h3 className="textButton">Stop</h3>
            </button>
          </div>
          <div className="genericButton">
            <button className="styleButton" type="button">
              <h3 className="textButton">Cont</h3>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
