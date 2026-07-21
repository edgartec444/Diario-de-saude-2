const etapas = [
  { id: 'agua', nome: 'Água registrada', feito: true },
  { id: 'refeicoes', nome: 'Refeições marcadas', feito: true },
  { id: 'eventos', nome: 'Eventos adicionados', feito: true },
  { id: 'nutricao', nome: 'Tela de nutrição criada', feito: true },
  { id: 'avancos', nome: 'Tela de avanços criada', feito: true },
  { id: 'visual', nome: 'Ajuste visual final', feito: false },
]

export default function Avancos() {
  const concluidas = etapas.filter((item) => item.feito).length
  const pct = Math.round((concluidas / etapas.length) * 100)

  return (
    <div className="advance-box">
      <div className="advance-summary">
        <div>
          <h3>Progresso geral</h3>
          <p>{pct}% concluído</p>
        </div>
        <div className="advance-number">
          {concluidas}/{etapas.length}
        </div>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${pct}%` }}
        />
      </div>

      <ul className="advance-list">
        {etapas.map((item) => (
          <li key={item.id} className={item.feito ? 'done' : 'todo'}>
            {item.feito ? '✓' : '•'} {item.nome}
          </li>
        ))}
      </ul>
    </div>
  )
}