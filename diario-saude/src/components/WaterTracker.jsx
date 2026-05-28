import { useEffect, useState } from 'react'

const META = 2000
const STORAGE_KEY = 'agua_hoje'

export default function WaterTracker() {
  const [agua, setAgua] = useState(0)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) setAgua(Number(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(agua))
  }, [agua])

  const pct = Math.min(100, Math.round((agua / META) * 100))

  return (
    <section className="tracker-card">
      <h3>Água</h3>
      <p>{agua}ml / {META}ml</p>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>

      <div className="tracker-actions">
        <button onClick={() => setAgua((v) => Math.min(META, v + 250))}>+250ml</button>
        <button onClick={() => setAgua((v) => Math.min(META, v + 500))}>+500ml</button>
        <button onClick={() => setAgua(0)}>Resetar</button>
      </div>
    </section>
  )
}