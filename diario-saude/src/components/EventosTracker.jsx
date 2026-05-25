import { useState, useEffect } from 'react'

export default function EventosTracker() {
  const [lista, setLista] = useState([])
  const [texto, setTexto] = useState('')
  const hoje = new Date().toISOString().slice(0,10)

  useEffect(() => {
    const v = localStorage.getItem(`eventos_${hoje}`)
    if (v) setLista(JSON.parse(v))
  }, [hoje])

  useEffect(() => {
    localStorage.setItem(`eventos_${hoje}`, JSON.stringify(lista))
  }, [lista, hoje])

  function adicionar() {
    if (!texto.trim()) return
    setLista([...lista, texto])
    setTexto('')
  }

  return (
    <div>
      <h2>Eventos📅</h2>
      <div style={{display:'flex',gap:8,marginBottom:10}}>
        <input value={texto} onChange={e=>setTexto(e.target.value)} placeholder="Evento" />
        <button onClick={adicionar}>+ Adicionar</button>
      </div>
      <ul style={{listStyle:'none',padding:0}}>
        {lista.map((ev,i)=>(
          <li key={i} style={{marginBottom:6}}>
            {ev} <button onClick={()=>setLista(lista.filter((_,x)=>x!==i))}>x</button>
          </li>
        ))}
      </ul>
    </div>
  )
}