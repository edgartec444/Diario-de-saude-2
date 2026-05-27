import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Text,
} from 'recharts'

export default function CircularDashboard({ agua = 0, aguaMeta = 2000, refeicoes = 0, refeicoesMeta = 4 }) {
  const aguaPct = Math.min(100, Math.round((agua / aguaMeta) * 100))
  const refeicoesPct = Math.min(100, Math.round((refeicoes / refeicoesMeta) * 100))

  // Função para calcular posição da agulha
  const getAgulhaRotation = (pct) => {
    return 180 - (pct / 100) * 180
  }

  return (
    <section className="tracker-card chart-card full">
      <h2>Painel de Progresso</h2>
      <p className="tracker-subtitle">Resumo visual do progresso do dia</p>

      <div className="circular-grid">
        {/* Gráfico de Água - Estilo Speedometer de Moto */}
        <div className="circular-box">
          <h3>💧 Água</h3>
          <div style={{ position: 'relative', width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%"
                cy="55%"
                innerRadius="75%"
                outerRadius="95%"
                startAngle={180}
                endAngle={0}
                data={[{ name: 'agua', value: aguaPct, fill: '#22c55e' }]}
                barSize={18}
              >
                <RadialBar
                  dataKey="value"
                  cornerRadius={12}
                  background={{ fill: '#1a2f23' }}
                />
                <Text
                  x="50%"
                  y="48%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#e7f5ee"
                  fontSize={36}
                  fontWeight="700"
                  fontFamily="system-ui"
                >
                  {aguaPct}
                </Text>
                <Text
                  x="50%"
                  y="56%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#9ab3a7"
                  fontSize={14}
                  fontWeight="500"
                >
                  {agua} ml
                </Text>
              </RadialBarChart>
            </ResponsiveContainer>
            
            {/* Agulha do speedometer */}
            <div
              style={{
                position: 'absolute',
                top: '10%',
                left: '50%',
                width: '4px',
                height: '35%',
                background: 'linear-gradient(to top, #ff4444, #ff6b6b)',
                transformOrigin: 'bottom center',
                transform: `translateX(-50%) rotate(${getAgulhaRotation(aguaPct)}deg)`,
                borderRadius: '2px 2px 0 0',
                zIndex: 10,
                boxShadow: '0 0 10px rgba(255, 68, 68, 0.5)'
              }}
            />
            
            {/* Ponto central da agulha */}
            <div
              style={{
                position: 'absolute',
                top: '45%',
                left: '50%',
                width: '16px',
                height: '16px',
                background: '#22c55e',
                borderRadius: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 11,
                boxShadow: '0 0 15px rgba(34, 197, 94, 0.6)'
              }}
            />
            
            {/* Marcadores da escala */}
            <div style={{
              position: 'absolute',
              top: '5%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '92%',
              height: '90%'
            }}>
              {[0, 25, 50, 75, 100].map((tick) => {
                const angle = 180 - (tick / 100) * 180
                const rad = (angle - 90) * (Math.PI / 180)
                const r = 125
                const x = 50 + (r * Math.cos(rad)) / 3.5
                const y = 48 + (r * Math.sin(rad)) / 2.8
                
                return (
                  <div
                    key={tick}
                    style={{
                      position: 'absolute',
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: 'translate(-50%, -50%)',
                      color: tick <= aguaPct ? '#22c55e' : '#2d4a3f',
                      fontSize: '12px',
                      fontWeight: '700'
                    }}
                  >
                    {tick}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Gráfico de Refeições - Estilo Speedometer de Moto */}
        <div className="circular-box">
          <h3>🍽️ Refeições</h3>
          <div style={{ position: 'relative', width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%"
                cy="55%"
                innerRadius="75%"
                outerRadius="95%"
                startAngle={180}
                endAngle={0}
                data={[{ name: 'refeicoes', value: refeicoesPct, fill: '#86efac' }]}
                barSize={18}
              >
                <RadialBar
                  dataKey="value"
                  cornerRadius={12}
                  background={{ fill: '#1a2f23' }}
                />
                <Text
                  x="50%"
                  y="48%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#e7f5ee"
                  fontSize={36}
                  fontWeight="700"
                  fontFamily="system-ui"
                >
                  {refeicoesPct}
                </Text>
                <Text
                  x="50%"
                  y="56%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#9ab3a7"
                  fontSize={14}
                  fontWeight="500"
                >
                  {refeicoes}/{refeicoesMeta}
                </Text>
              </RadialBarChart>
            </ResponsiveContainer>
            
            {/* Agulha do speedometer */}
            <div
              style={{
                position: 'absolute',
                top: '10%',
                left: '50%',
                width: '4px',
                height: '35%',
                background: 'linear-gradient(to top, #ff4444, #ff6b6b)',
                transformOrigin: 'bottom center',
                transform: `translateX(-50%) rotate(${getAgulhaRotation(refeicoesPct)}deg)`,
                borderRadius: '2px 2px 0 0',
                zIndex: 10,
                boxShadow: '0 0 10px rgba(255, 68, 68, 0.5)'
              }}
            />
            
            {/* Ponto central da agulha */}
            <div
              style={{
                position: 'absolute',
                top: '45%',
                left: '50%',
                width: '16px',
                height: '16px',
                background: '#86efac',
                borderRadius: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 11,
                boxShadow: '0 0 15px rgba(134, 239, 172, 0.6)'
              }}
            />
            
            {/* Marcadores da escala */}
            <div style={{
              position: 'absolute',
              top: '5%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '92%',
              height: '90%'
            }}>
              {[0, 25, 50, 75, 100].map((tick) => {
                const angle = 180 - (tick / 100) * 180
                const rad = (angle - 90) * (Math.PI / 180)
                const r = 125
                const x = 50 + (r * Math.cos(rad)) / 3.5
                const y = 48 + (r * Math.sin(rad)) / 2.8
                
                return (
                  <div
                    key={tick}
                    style={{
                      position: 'absolute',
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: 'translate(-50%, -50%)',
                      color: tick <= refeicoesPct ? '#86efac' : '#2d4a3f',
                      fontSize: '12px',
                      fontWeight: '700'
                    }}
                  >
                    {tick}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}