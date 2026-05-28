import { useMemo, useState } from 'react'
import WaterTracker from './components/WaterTracker'
import MealsTracker from './components/MealsTracker'
import EventosTracker from './components/EventosTracker'
import CircularDashboard from './components/CircularDashboard'
import FoodNutritionChart from './components/FoodNutritionChart'
import Avancos from './components/Avancos'
import './index.css'

export default function App() {
  const [view, setView] = useState('resumo')

  const hoje = useMemo(() => {
    return new Date().toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }, [])

  return (
    <div className="app-shell">
      <div className="app-card">
        <header className="app-header">
          <div>
            <h1>Diário de Saúde</h1>
            <p>Controle de água, refeições, eventos e progresso diário</p>
          </div>

          <div className="app-actions">
            <button
              className={view === 'resumo' ? 'action-btn active' : 'action-btn'}
              onClick={() => setView('resumo')}
            >
              Resumo
            </button>
            <button
              className={view === 'comida' ? 'action-btn active' : 'action-btn'}
              onClick={() => setView('comida')}
            >
              Comida
            </button>
            <button
              className={view === 'avancos' ? 'action-btn active' : 'action-btn'}
              onClick={() => setView('avancos')}
            >
              Avanços
            </button>
          </div>
        </header>

        <p className="app-date">{hoje}</p>

        {view === 'resumo' && (
          <>
            <CircularDashboard agua={1200} refeicoes={3} />

            <div className="trackers-grid">
              <WaterTracker />
              <MealsTracker />
              <EventosTracker />
            </div>
          </>
        )}

        {view === 'comida' && (
          <section className="screen-section">
            <div className="section-card">
              <div className="section-head">
                <h2>Nutrição da refeição</h2>
                <p>
                  Veja carboidratos, açúcar, gordura, proteína e calorias.
                </p>
              </div>

              <FoodNutritionChart />
            </div>
          </section>
        )}

        {view === 'avancos' && (
          <section className="screen-section">
            <div className="section-card">
              <div className="section-head">
                <h2>Avanços do processo</h2>
                <p>
                  Progresso geral das metas e ações já concluídas.
                </p>
              </div>

              <Avancos />
            </div>
          </section>
        )}
      </div>
    </div>
  )
}