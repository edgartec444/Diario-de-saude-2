import { useEffect, useState } from 'react'

const META = 4
const STORAGE_KEY = 'refeicoes_hoje'

export default function MealsTracker() {
  const [refeicoes, setRefeicoes] = useState(() => {
    if (typeof window === 'undefined') return 0
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? Number(saved) : 0
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(refeicoes))
  }, [refeicoes])

  const pct = Math.min(100, Math.round((refeicoes / META) * 100))

  return (
    <section className="tracker-card">
      <h3>Refeições</h3>
      <p>
        {refeicoes} / {META}
      </p>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>

      <div className="tracker-actions">
        <button onClick={() => setRefeicoes((v) => Math.min(META, v + 1))}>
          +1 refeição
        </button>
        <button onClick={() => setRefeicoes(0)}>Resetar</button>
      </div>
    </section>
  )
}