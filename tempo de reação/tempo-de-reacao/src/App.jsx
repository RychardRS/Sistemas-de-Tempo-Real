import React, { useEffect, useState } from 'react'
import './App.css'

export default function App() {

  const cores = ['blue', 'red', 'yellow', 'green'];

  var tempoAzul = [];
  var tempoVermelho = [];
  var tempoAmarelo = [];
  var tempoVerde = [];

  const [corAtual, setCorAtual] = useState(cores[0]);
  const [tempoInicio, setTempoInicio] = useState(null);
  const [tempoReacao, setTempoReacao] = useState(null);

  const handleKeyDown = (e) => {
    
    if(corAtual === 'green' && e.key === 'w'){
      if(tempoInicio === null){
        const inicio = performance.now();
        setTempoInicio(inicio);
      }else{
        // Calcula o tempo de reação
        const reacao = (performance.now() - tempoInicio) / 1000;
        setTempoReacao(reacao);
        tempoVerde.push(reacao);
        setTempoInicio(null);
        console.log("Vetor tempo verde: "+ tempoVerde);
        console.log(`Tempo de reação verde: ${reacao.toFixed(2)} segundos`);
      }
    }
   
    if (corAtual === 'red' && e.key === 'a') {
      if (tempoInicio === null) {
        // Inicia a contagem de tempo
        const inicio = performance.now();
        setTempoInicio(inicio);
      } else {
        // Calcula o tempo de reação
        const reacao = (performance.now() - tempoInicio) / 1000;
        setTempoReacao(reacao);
        setTempoInicio(null);
        console.log(`Tempo de reação vermelho: ${reacao.toFixed(2)} segundos`);
      }
    }

    if (corAtual === 'yellow' && e.key === 's') {
      if (tempoInicio === null) {
        // Inicia a contagem de tempo
        const inicio = performance.now();
        setTempoInicio(inicio);
      } else {
        // Calcula o tempo de reação
        const reacao = (performance.now() - tempoInicio) / 1000;
        setTempoReacao(reacao);
        setTempoInicio(null);
        console.log(`Tempo de reação amarelo: ${reacao.toFixed(2)} segundos`);
      }
    }

    if (corAtual === 'blue' && e.key === 'd') {
      if (tempoInicio === null) {
        // Inicia a contagem de tempo
        const inicio = performance.now();
        setTempoInicio(inicio);
      } else {
        // Calcula o tempo de reação
        const reacao = (performance.now() - tempoInicio) / 1000;
        setTempoReacao(reacao);
        setTempoInicio(null);
        console.log(`Tempo de reação azul: ${reacao.toFixed(2)} segundos`);
      }
    }

   };

  useEffect(() => {
    const interval = setInterval(() => {
      // Escolhe uma cor aleatória do vetor
      const novaCor = cores[Math.floor(Math.random() * cores.length)];
      setCorAtual(novaCor);
      setTempoReacao(null); // Reseta o tempo de reação ao mudar de cor
    }, 3000); // 3 segundos

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [corAtual]);

  const calcularMediaVerde = () => {
    if (tempoVerde.length === 0) {
      return 0;
    }
    const soma = tempoVerde.reduce((acc, tempo) => acc + tempo, 0);
    return soma / tempoVerde.length;
  };


  return (
      <div className='container'>
        <div className='medicao'>
          <label className='styleMedicao'>
          Vermelho: tecle A
          Amarelo: tecle S
          Azul: tecle D
          Verde: tecle W
          </label>
        </div>
        <div className='bolas' style={{ backgroundColor: corAtual }}>
        </div>
      </div>
    
  )

}


