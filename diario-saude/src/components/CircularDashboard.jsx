import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Tooltip,
} from 'recharts'

export default function CircularDashboard({ agua = 0, aguaMeta = 2000, refeicoes = 0, refeicoesMeta = 4 }) {
  const aguaPct = Math.min(100, Math.round((agua / aguaMeta) * 100))
  const refeicoesPct = Math.min(100, Math.round((refeicoes / refeicoesMeta) * 100))

  const dataAgua = [{ name: 'Água', value: aguaPct, fill: '#22c55e' }]
  const dataRefeicoes = [{ name: 'Refeições', value: refeicoesPct, fill: '#86efac' }]

  return (
    <section className="tracker-card chart-card full">
      <h2>Painel circular</h2>
      <p className="tracker-subtitle">Resumo visual do progresso do dia</p>

      <div className="circular-grid">
        <div className="circular-box">
          <h3>Água</h3>
          <ResponsiveContainer width="100%" height={240}>
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="65%"
              outerRadius="95%"
              data={dataAgua}
              startAngle={90}
              endAngle={-270}
            >
              <RadialBar dataKey="value" background cornerRadius={10} />
              <Tooltip />
            </RadialBarChart>
          </ResponsiveContainer>
          <p className="circular-value">{agua} / {aguaMeta} ml</p>
        </div>

        <div className="circular-box">
          <h3>Refeições</h3>
          <ResponsiveContainer width="100%" height={240}>
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="65%"
              outerRadius="95%"
              data={dataRefeicoes}
              startAngle={90}
              endAngle={-270}
            >
              <RadialBar dataKey="value" background cornerRadius={10} />
              <Tooltip />
            </RadialBarChart>
          </ResponsiveContainer>
          <p className="circular-value">{refeicoes} / {refeicoesMeta}</p>
        </div>
      </div>
    </section>
  )
}