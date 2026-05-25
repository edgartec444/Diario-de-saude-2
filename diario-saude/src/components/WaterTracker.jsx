import { useState, useEffect } from 'react'

const META = 2000

export default function WaterTracker() {
  const [agua, setAgua] = useState(0)
  const hoje = new Date().toISOString().slice(0,10)

  useEffect(() => {
    const v = localStorage.getItem(`agua_${hoje}`)
    if (v) setAgua(+v)
  }, [hoje])

  useEffect(() => {
    localStorage.setItem(`agua_${hoje}`, agua)
  }, [agua, hoje])

  const pct = Math.min(100, Math.round((agua / META) * 100))
  const cor = pct < 50 ? '#1e88e5' : pct < 100 ? '#43a047' : '#f57f17'

  return (
    <div style={{marginBottom:20}}>
      <h2>Água🫗</h2>
      <p>{agua} / {META} ml</p>
      <div style={{background:'#e6eef6',height:28,borderRadius:12,overflow:'hidden'}}>
        <div style={{width:`${pct}%`,height:'100%',background:cor,transition:'width .3s',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700}}>
          {pct}%
        </div>
      </div>
      <div style={{marginTop:10,gap:8,display:'flex'}}>
        <button onClick={()=>setAgua(a=>a+250)}>+250</button>
        <button onClick={()=>setAgua(a=>a+500)}>+500</button>
        <button onClick={()=>setAgua(0)}>Reset</button>
      </div>
    </div>
  )
}