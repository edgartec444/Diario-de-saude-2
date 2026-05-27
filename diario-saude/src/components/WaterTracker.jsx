import { useState, useEffect } from 'react'


const META = 2000


export default function WaterTracker() {
  const [agua, setAgua] = useState(0)
  const hoje = new Date().toISOString().slice(0, 10)


  useEffect(() => {
    const v = localStorage.getItem(`agua_${hoje}`)
    if (v) setAgua(+v)
  }, [hoje])


  useEffect(() => {
    localStorage.setItem(`agua_${hoje}`, agua)
  }, [agua, hoje])


  const pct = Math.min(100, Math.round((agua / META) * 100))
  const metaBatida = agua >= META


  return (
    <section className="tracker-card water-card">
      <h2>Água</h2>
      <p className="tracker-subtitle">{agua} / {META} ml</p>


      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${pct}%` }}
        >
          {pct}%
        </div>
      </div>


      <p className={`goal-status ${metaBatida ? 'done' : ''}`}>
        {metaBatida ? 'Meta batida! Excelente hidratação.' : 'Ainda falta para bater a meta de hoje.'}
      </p>


      <div className="button-row">
        <button onClick={() => setAgua(a => a + 250)}>+250 ml</button>
        <button onClick={() => setAgua(a => a + 500)}>+500 ml</button>
        <button onClick={() => setAgua(0)} className="secondary">Resetar</button>
      </div>
    </section>
  )
}