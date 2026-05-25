import WaterTracker from './components/WaterTracker'
import MealsTracker from './components/MealsTracker'
import EventosTracker from './components/EventosTracker'

export default function App() {
  const data = new Date().toLocaleDateString('pt-BR',{weekday:'long',day:'2-digit',month:'long',year:'numeric'})

  return (
    <div style={{maxWidth:520,margin:'20px auto',background:'#b300ff',padding:20,borderRadius:8,boxShadow:'0 6px 18px rgba(0,0,0,0.06)',fontFamily:'Arial'}}>
      <h1 style={{margin:'0 0 8px 0'}}>Diário de Saúde</h1>
      <p style={{color:'#666',marginBottom:16,textTransform:'capitalize'}}>{data}</p>
      <WaterTracker />
      <MealsTracker />
      <EventosTracker />
    </div>
  )
}