import { useMemo, useState, useEffect } from 'react'
import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  Label,
} from 'recharts'

export default function CircularDashboard({ agua = 1200, refeicoes = 3 }) {
  const waterGoal = 2500
  const mealsGoal = 5
  const markers = [10, 25, 50, 75, 100]

  const [total, setTotal] = useState(50)
  const [activeMarker, setActiveMarker] = useState(null)
  const [aguaLocal, setAguaLocal] = useState(agua)
  const [comidaLocal, setComidaLocal] = useState(refeicoes * 100)

  useEffect(() => {
    const porcentAgua = Math.round((aguaLocal / waterGoal) * 100)
    const porcentComida = Math.round((comidaLocal / (mealsGoal * 100)) * 100)
    const novoTotal = Math.round((porcentAgua + porcentComida) / 2)

    setTotal(novoTotal)

    let closestMarker = null
    let minDiff = Infinity

    markers.forEach((marker) => {
      const diff = Math.abs(marker - novoTotal)
      if (diff < minDiff) {
        minDiff = diff
        closestMarker = marker
      }
    })

    setActiveMarker(minDiff <= 5 ? closestMarker : null)
  }, [aguaLocal, comidaLocal])

  const data = useMemo(
    () => [
      {
        name: 'Total',
        value: total,
        fill: activeMarker ? '#00ff88' : '#22c55e',
      },
    ],
    [total, activeMarker]
  )

  return (
    <div className="circular-wrap">
      <div className="circular-card">
        <h3 className="circular-title">⚡ Gauge Moto - Água e Comida</h3>

        <div className="moto-gauge">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="70%"
              outerRadius="95%"
              startAngle={-180}
              endAngle={0}
              data={data}
            >
              <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
              <RadialBar
                minAngle={15}
                background
                clockWise
                dataKey="value"
                fill={activeMarker ? '#00ff88' : '#22c55e'}
                stroke="none"
              />
              <Label
                content={({ viewBox }) => {
                  if (!viewBox || !('cx' in viewBox) || !('cy' in viewBox)) return null

                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      style={{
                        fontSize: '32px',
                        fontWeight: 'bold',
                        fill: '#00ff88',
                      }}
                    >
                      <tspan x={viewBox.cx} dy="-5">
                        {total}
                      </tspan>
                      <tspan x={viewBox.cx} dy="26" fontSize="14px" fill="#888">
                        TOTAL
                      </tspan>
                    </text>
                  )
                }}
              />
            </RadialBarChart>
          </ResponsiveContainer>

          <div
            style={{
              position: 'absolute',
              top: '8%',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 10,
            }}
          >
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: '15px solid transparent',
                borderRight: '15px solid transparent',
                borderTop: '25px solid #ff0055',
                filter: 'drop-shadow(0 0 10px rgba(255, 0, 85, 0.7))',
              }}
            />
          </div>

          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: 0,
              left: 0,
            }}
          >
            {markers.map((marker) => {
              const angle = (marker / 100) * 180 - 180
              const isActive = activeMarker === marker
              const radius = 88
              const cos = Math.cos((angle * Math.PI) / 180)
              const sin = Math.sin((angle * Math.PI) / 180)
              const x = 50 + (radius * cos) / 2
              const y = 50 + (radius * sin) / 2 - 5

              return (
                <div
                  key={marker}
                  style={{
                    position: 'absolute',
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: 'translate(-50%, -50%)',
                    width: isActive ? '6px' : '4px',
                    height: isActive ? '25px' : '18px',
                    background: isActive ? '#00ff88' : '#666',
                    borderRadius: '2px',
                    boxShadow: isActive
                      ? '0 0 15px 5px rgba(0, 255, 136, 0.9)'
                      : 'none',
                    animation: isActive ? 'pulse-glow 1.5s infinite' : 'none',
                    zIndex: 5,
                  }}
                />
              )
            })}

            {markers.map((marker) => {
              const angle = (marker / 100) * 180 - 180
              const isActive = activeMarker === marker
              const radius = 82
              const cos = Math.cos((angle * Math.PI) / 180)
              const sin = Math.sin((angle * Math.PI) / 180)
              const x = 50 + (radius * cos) / 2
              const y = 50 + (radius * sin) / 2 + 10

              return (
                <div
                  key={`text-${marker}`}
                  style={{
                    position: 'absolute',
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: 'translate(-50%, -50%)',
                    fontSize: isActive ? '20px' : '16px',
                    fontWeight: 'bold',
                    color: isActive ? '#00ff88' : '#666',
                    textShadow: isActive
                      ? '0 0 15px rgba(0, 255, 136, 0.9)'
                      : 'none',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {marker}
                </div>
              )
            })}
          </div>
        </div>

        <div className="control-row">
          <div className="control-group">
            <label htmlFor="aguaSlider">💧 Água</label>
            <input
              type="range"
              id="aguaSlider"
              min="0"
              max={waterGoal}
              value={aguaLocal}
              onChange={(e) => setAguaLocal(Number(e.target.value))}
              style={{
                width: '100%',
                accentColor: '#00ff88',
              }}
            />
            <div className="control-value">{aguaLocal}ml</div>
          </div>

          <div className="control-group">
            <label htmlFor="comidaSlider">🍖 Comida</label>
            <input
              type="range"
              id="comidaSlider"
              min="0"
              max={mealsGoal * 100}
              value={comidaLocal}
              onChange={(e) => setComidaLocal(Number(e.target.value))}
              style={{
                width: '100%',
                accentColor: '#00ff88',
              }}
            />
            <div className="control-value">{Math.round(comidaLocal / 100)} ref.</div>
          </div>
        </div>

        <div className="total-display">
          <label>MÉDIA TOTAL</label>
          <div
            className="total-value"
            style={{
              color: '#00ff88',
              textShadow: activeMarker
                ? '0 0 20px rgba(0, 255, 136, 0.9)'
                : '0 0 15px rgba(0, 255, 136, 0.8)',
            }}
          >
            {total}%
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 15px 5px rgba(0, 255, 136, 0.9);
          }
          50% {
            box-shadow: 0 0 30px 10px rgba(0, 255, 136, 1);
          }
        }

        .moto-gauge {
          position: relative;
          width: 100%;
          height: 320px;
          margin: 20px 0;
          background: radial-gradient(circle, #1a1a2e 0%, #0a0a15 70%, #000 100%);
          border-radius: 50%;
          border: 3px solid #3a3a5c;
          box-shadow:
            0 0 30px rgba(0, 255, 136, 0.3),
            inset 0 0 50px rgba(0, 0, 0, 0.8);
        }

        .control-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-top: 20px;
        }

        .control-group {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .control-group label {
          font-weight: 600;
          margin-bottom: 10px;
          color: #00ff88;
          font-size: 16px;
          text-shadow: 0 0 5px rgba(0, 255, 136, 0.5);
        }

        .control-value {
          font-size: 18px;
          font-weight: bold;
          margin-top: 8px;
          color: #00ff88;
        }

        .total-display {
          margin-top: 20px;
          padding-top: 15px;
          border-top: 1px solid #3a3a5c;
          text-align: center;
        }

        .total-display label {
          font-weight: 600;
          color: #888;
          font-size: 14px;
        }

        .total-value {
          font-size: 32px;
          font-weight: bold;
          margin-top: 8px;
        }
      `}</style>
    </div>
  )
}
