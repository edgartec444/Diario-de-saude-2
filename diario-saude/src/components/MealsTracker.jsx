import { useState, useEffect } from 'react'

const META = 5

export default function MealsTracker() {
  const [n, setN] = useState(0)
  const hoje = new Date().toISOString().slice(0,10)

  useEffect(() => {
    const v = localStorage.getItem(`refeicoes_${hoje}`)
    if (v) setN(+v)
  }, [hoje])

  useEffect(() => {
    localStorage.setItem(`refeicoes_${hoje}`, n)
  }, [n, hoje])

  return (
    <div style={{marginBottom:20}}>
      <h2>Refeições🍽️</h2>
      <p>{n} / {META} refeições</p>
      <div style={{marginTop:10,gap:8,display:'flex'}}>
        <button onClick={()=>setN(n=>Math.min(META,n+1))}>+1</button>
        <button onClick={()=>setN(n=>Math.max(0,n-1))}>-1</button>
        <button onClick={()=>setN(0)}>Reset</button>
      </div>
    </div>
  )
}
