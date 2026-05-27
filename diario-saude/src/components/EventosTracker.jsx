import { useState, useEffect } from 'react'


export default function EventosTracker() {
  const [lista, setLista] = useState([])
  const [texto, setTexto] = useState('')
  const hoje = new Date().toISOString().slice(0, 10)


  useEffect(() => {
    const v = localStorage.getItem(`eventos_${hoje}`)
    if (v) setLista(JSON.parse(v))
  }, [hoje])


  useEffect(() => {
    localStorage.setItem(`eventos_${hoje}`, JSON.stringify(lista))
  }, [lista, hoje])


  function adicionar() {
    if (!texto.trim()) return
    setLista([...lista, texto.trim()])
    setTexto('')
  }


  function remover(i) {
    setLista(lista.filter((_, x) => x !== i))
  }


  return (
    <section className="tracker-card events-card">
      <h2>Eventos</h2>
      <p className="tracker-subtitle">Anote compromissos, tarefas ou observações do dia</p>


      <div className="input-row">
        <input
          value={texto}
          onChange={e => setTexto(e.target.value)}
          placeholder="Digite um evento"
        />
        <button onClick={adicionar}>Adicionar</button>
      </div>


      <ul className="event-list">
        {lista.length === 0 ? (
          <li className="empty-state">Nenhum evento registrado hoje.</li>
        ) : (
          lista.map((ev, i) => (
            <li key={i} className="event-item">
              <span>{ev}</span>
              <button onClick={() => remover(i)} className="remove-btn">x</button>
            </li>
          ))
        )}
      </ul>
    </section>
  )
}