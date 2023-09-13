import React, { useEffect, useState } from 'react'
import './App.css'

export default function App() {

  const cores = ['blue', 'red', 'yellow', 'green'];

  const [corAtual, setCorAtual] = useState(cores[0]);
  const [tempoInicio, setTempoInicio] = useState(null);
  const [tempoReacao, setTempoReacao] = useState(null);
  const [contador, setContador] = useState(0);
  const [temposDeReacao, setTemposDeReacao] = useState([]);
  const [temposPorCor, setTemposPorCor] = useState({
    blue: [],
    red: [],
    yellow: [],
    green: [],
  });
  const [mediaTempoReacao, setMediaTempoReacao] = useState(null);

  const handleKeyDown = (e) => {
    if (corAtual === 'green' && e.key === 'w' ||
        corAtual === 'red' && e.key === 'a' ||
        corAtual === 'yellow' && e.key === 's' ||
        corAtual === 'blue' && e.key === 'd') {
      if (tempoInicio === null) {
        const inicio = performance.now();
        setTempoInicio(inicio);
      } else {
        const reacao = (performance.now() - tempoInicio) / 1000;
        setTempoReacao(reacao);
        setTempoInicio(null);
        console.log(`Tempo de reação da cor ${corAtual}: ${reacao.toFixed(2)} segundos`);
        
        // Adiciona o tempo de reação ao vetor
        setTemposDeReacao((prevTempos) => [...prevTempos, reacao]);

        // Adiciona o tempo de reação ao vetor específico da cor atual
        setTemposPorCor((prevTemposPorCor) => ({
          ...prevTemposPorCor,
          [corAtual]: [...prevTemposPorCor[corAtual], reacao.toFixed(2)],
        }));
        
        if (temposDeReacao.length === 5) {
          // Calcula a média dos tempos de reação
          const media = temposDeReacao.reduce((acc, tempo) => acc + parseFloat(tempo), 0) / 5;
          console.log(`Média dos tempos de reação: ${media.toFixed(2)} segundos`);
          setMediaTempoReacao(media); // Atualiza a média
          setTemposDeReacao([]); // Limpa o vetor
        }
      }
    } else {
      setContador((prevContador) => prevContador + 1);
      console.log(contador);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const novaCor = cores[Math.floor(Math.random() * cores.length)];
      setCorAtual(novaCor);
      setTempoReacao(null);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [corAtual]);

  return (
    <div className='container'>
      <div className='styleDados'>
        <div className='medicao'>
          <label className='styleMedicao'>
            Vermelho: tecle A
            Amarelo: tecle S
            Azul: tecle D
            Verde: tecle W
          </label>
        </div>
        <div className='contador-erros'>
          <p>Contagem de Erros: {contador} </p>
        </div>
      </div>
      <div className='bolas' style={{ backgroundColor: corAtual }}/>
      <div className='tempos-por-cor'>
        <p>Tempo Vermelho(segundos): {temposPorCor.red.join(', ')}</p>
        <p>Tempo Amarelo(segundos): {temposPorCor.yellow.join(', ')}</p>
        <p>Tempo Azul(segundos): {temposPorCor.blue.join(', ')}</p>
        <p>Tempo Verde(segundos): {temposPorCor.green.join(', ')}</p>
        <p>Média de Tempo de Reação: {mediaTempoReacao !== null ? mediaTempoReacao.toFixed(2) : '-'}</p>
      </div>
    </div>
  )
}
