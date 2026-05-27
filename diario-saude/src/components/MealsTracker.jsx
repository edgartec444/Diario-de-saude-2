import { useState, useEffect } from 'react'


const META = 4


const refeicoesPadrao = [
  { id: 'cafe', nome: 'Café da manhã', feito: false },
  { id: 'almoco', nome: 'Almoço', feito: false },
  { id: 'lanche', nome: 'Lanche', feito: false },
  { id: 'jantar', nome: 'Jantar', feito: false },
]


export default function MealsTracker() {
  const hoje = new Date().toISOString().slice(0, 10)
  const [refeicoes, setRefeicoes] = useState(refeicoesPadrao)


  useEffect(() => {
    const v = localStorage.getItem(`refeicoes_${hoje}`)
    if (v) setRefeicoes(JSON.parse(v))
  }, [hoje])


  useEffect(() => {
    localStorage.setItem(`refeicoes_${hoje}`, JSON.stringify(refeicoes))
  }, [refeicoes, hoje])


  function alternarRefeicao(id) {
    setRefeicoes(prev =>
      prev.map(refeicao =>
        refeicao.id === id ? { ...refeicao, feito: !refeicao.feito } : refeicao
      )
    )
  }


  function resetar() {
    setRefeicoes(refeicoesPadrao)
  }


  const n = refeicoes.filter(r => r.feito).length
  const pct = Math.round((n / META) * 100)


  return (
    <section className="tracker-card meals-card">
      <h2>Refeições</h2>
      <p className="tracker-subtitle">{n} / {META} refeições concluídas</p>


      <div className="meal-list">
        {refeicoes.map(refeicao => (
          <button
            key={refeicao.id}
            className={`meal-item ${refeicao.feito ? 'done' : ''}`}
            onClick={() => alternarRefeicao(refeicao.id)}
          >
            <span>{refeicao.nome}</span>
            <strong>{refeicao.feito ? 'Feito' : 'Pendente'}</strong>
          </button>
        ))}
      </div>


      <div className="progress-bar">
        <div className="progress-fill meal-fill" style={{ width: `${pct}%` }}>
          {pct}%
        </div>
      </div>


      <div className="button-row">
        <button onClick={resetar} className="secondary">Resetar</button>
      </div>
    </section>
  )
}