import { useEffect, useMemo, useState } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const locales = {
  'pt-BR': ptBR,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const STORAGE_KEY = 'eventos_calendario'

const tipos = {
  rotina: '#22c55e',
  alerta: '#ef4444',
  meta: '#7c3aed',
  lembrete: '#f59e0b',
}

export default function EventosTracker() {
  const [eventos, setEventos] = useState([])
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [titulo, setTitulo] = useState('')
  const [hora, setHora] = useState('12:00')
  const [tipo, setTipo] = useState('rotina')

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved).map((item) => ({
        ...item,
        start: new Date(item.start),
        end: new Date(item.end),
      }))
      setEventos(parsed)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(eventos))
  }, [eventos])

  const eventsStyled = useMemo(
    () =>
      eventos.map((ev) => ({
        ...ev,
        style: {
          backgroundColor: ev.color,
          borderRadius: '10px',
          border: 'none',
          color: '#fff',
        },
      })),
    [eventos]
  )

  function onSelectSlot(slotInfo) {
    setSelectedSlot(slotInfo.start)
  }

  function salvarEvento() {
    if (!selectedSlot || !titulo.trim()) return

    const [hh, mm] = hora.split(':').map(Number)
    const start = new Date(selectedSlot)
    start.setHours(hh, mm, 0, 0)

    const end = new Date(start)
    end.setHours(start.getHours() + 1)

    const color = tipos[tipo] || '#22c55e'

    setEventos((prev) => [
      ...prev,
      {
        title: titulo.trim(),
        start,
        end,
        color,
      },
    ])

    setTitulo('')
    setHora('12:00')
    setTipo('rotina')
    setSelectedSlot(null)
  }

  return (
    <div className="events-wrap">
      <div className="events-panel">
        <div className="events-form">
          <h3>Novo evento</h3>

          <p className="events-hint">
            Clique em uma data no calendário para escolher o dia.
          </p>

          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Nome do evento"
          />

          <input
            type="time"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
          />

          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="rotina">Rotina</option>
            <option value="alerta">Alerta</option>
            <option value="meta">Meta</option>
            <option value="lembrete">Lembrete</option>
          </select>

          <button onClick={salvarEvento}>Adicionar evento</button>

          {selectedSlot && (
            <p className="events-selected">
              Data escolhida: {selectedSlot.toLocaleDateString('pt-BR')}
            </p>
          )}
        </div>

        <div className="events-list">
          <h3>Eventos do dia</h3>
          {eventos.length === 0 ? (
            <p className="events-empty">Nenhum evento salvo ainda.</p>
          ) : (
            eventos.map((ev, index) => (
              <div key={index} className="event-item" style={{ borderLeftColor: ev.color }}>
                <strong>{ev.title}</strong>
                <span>
                  {ev.start.toLocaleDateString('pt-BR')} às{' '}
                  {ev.start.toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="calendar-box">
        <Calendar
          localizer={localizer}
          events={eventsStyled}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectSlot={onSelectSlot}
          defaultView="month"
          views={['month', 'week', 'day', 'agenda']}
          style={{ height: 650 }}
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: event.color,
              borderRadius: '10px',
              border: 'none',
              color: '#fff',
            },
          })}
        />
      </div>
    </div>
  )
}