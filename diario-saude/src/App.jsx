import WaterTracker from './components/WaterTracker'
import MealsTracker from './components/MealsTracker'
import EventosTracker from './components/EventosTracker'
import CircularDashboard from './components/CircularDashboard'

export default function App() {
  const data = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="app-shell">
      <div className="app-card">
        <header className="app-header">
          <h1>Diário de Saúde</h1>
          <p className="app-date">{data}</p>
        </header>

        <CircularDashboard agua={1200} refeicoes={3} />

        <div className="trackers-grid">
          <WaterTracker />
          <MealsTracker />
          <EventosTracker />
        </div>
      </div>
    </div>
  )
}