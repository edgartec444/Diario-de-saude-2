import { useState } from 'react'

const ZONES = [
  {
    id: 'cabeca',
    label: 'Progresso',
    anchor: { x: 160, y: 55, panelTop: '4%' },
    path: 'M160 30 a28 30 0 1 1 -0.1 0 Z',
  },
  {
    id: 'torax',
    label: 'Refeições',
    anchor: { x: 160, y: 150, panelTop: '30%' },
    path: 'M124 108 Q160 96 196 108 L206 172 L160 184 L114 172 Z',
  },
  {
    id: 'abdomen',
    label: 'Hidratação',
    anchor: { x: 160, y: 205, panelTop: '52%' },
    path: 'M116 176 L206 176 L198 232 Q160 244 122 232 Z',
  },
  {
    id: 'bracos',
    label: 'Eventos',
    anchor: { x: 246, y: 160, panelTop: '30%' },
    path: 'M206 112 L246 158 Q252 168 244 176 L214 148 Z M114 112 L74 158 Q68 168 76 176 L106 148 Z',
  },
  {
    id: 'pernas',
    label: 'Atividade',
    anchor: { x: 160, y: 300, panelTop: '76%' },
    path: 'M124 236 L116 328 Q116 338 126 338 L142 338 L148 240 Z M196 236 L204 328 Q204 338 194 338 L178 338 L172 240 Z',
  },
]

export default function HologramBody({ dados = {} }) {
  const [activeZone, setActiveZone] = useState(null)
  const zone = ZONES.find((z) => z.id === activeZone)
  const info = zone ? dados[zone.id] : null

  const overall = ZONES.reduce((sum, z) => sum + (dados[z.id]?.percent ?? 0), 0) / ZONES.length

  return (
    <div className="hologram-wrap">
      <svg viewBox="0 0 320 380" className="hologram-svg" role="img" aria-label="Holograma corporal interativo">
        <defs>
          <linearGradient id="holoGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--holo-violet)" />
            <stop offset="100%" stopColor="var(--holo-cyan)" />
          </linearGradient>
          <radialGradient id="ringFade" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--holo-cyan)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--holo-cyan)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <ellipse cx="160" cy="345" rx="120" ry="18" fill="url(#ringFade)" />
        <ellipse cx="160" cy="345" rx="90" ry="12" className="holo-ring" />

        {/* corpo base (contorno sempre visível) */}
        <g className="holo-wireframe">
          {ZONES.map((z) => (
            <path key={`wire-${z.id}`} d={z.path} />
          ))}
        </g>

        {/* zonas interativas */}
        {ZONES.map((z) => {
          const pct = dados[z.id]?.percent ?? 0
          const isActive = activeZone === z.id
          return (
            <path
              key={z.id}
              d={z.path}
              className={`holo-zone ${isActive ? 'holo-zone--active' : ''}`}
              style={{ '--zone-fill': pct >= 66 ? 'var(--holo-violet)' : pct >= 33 ? 'var(--holo-cyan)' : 'var(--holo-amber)' }}
              tabIndex={0}
              role="button"
              aria-label={`${z.label}: ${Math.round(pct)}%`}
              onClick={() => setActiveZone(isActive ? null : z.id)}
              onKeyDown={(e) => e.key === 'Enter' && setActiveZone(isActive ? null : z.id)}
            />
          )
        })}

        <rect x="30" y="0" width="260" height="14" className="holo-scanline" />
      </svg>

      <p className="hologram-status">{Math.round(overall)}% materializado hoje</p>

      {zone && info && (
        <div className="holo-panel" style={{ top: zone.anchor.panelTop }}>
          <div className="holo-panel__head">
            <span>{zone.label}</span>
            <button onClick={() => setActiveZone(null)} aria-label="Fechar">×</button>
          </div>
          <p className="holo-panel__value">{Math.round(info.percent)}%</p>
          <p className="holo-panel__detail">{info.detail}</p>
        </div>
      )}
    </div>
  )
}