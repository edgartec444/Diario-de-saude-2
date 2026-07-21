import { useMemo, useState } from 'react'
import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts'

const theme = {
  green: '#22c55e',
  greenSoft: '#7cffb2',
  red: '#ef4444',
  yellow: '#f59e0b',
  text: '#e7f5ee',
  muted: '#94a3b8',
  card: '#111816',
  border: 'rgba(255,255,255,0.08)',
}

const foodMap = [
  { keys: ['arroz', 'pão', 'macarrão', 'massa', 'batata', 'farofa'], carb: 28, sugar: 2, fat: 3, protein: 4, cal: 160 },
  { keys: ['pizza', 'hambúrguer', 'fritura', 'batata frita', 'coxinha'], carb: 22, sugar: 5, fat: 24, protein: 10, cal: 310 },
  { keys: ['bolo', 'doce', 'refrigerante', 'suco', 'chocolate', 'biscoito'], carb: 34, sugar: 26, fat: 12, protein: 3, cal: 280 },
  { keys: ['frango', 'ovo', 'carne', 'peixe', 'atum'], carb: 2, sugar: 1, fat: 6, protein: 26, cal: 180 },
  { keys: ['salada', 'legumes', 'verdura', 'alface', 'tomate'], carb: 8, sugar: 3, fat: 2, protein: 4, cal: 60 },
  { keys: ['banana', 'maçã', 'mamão', 'laranja', 'fruta'], carb: 18, sugar: 14, fat: 1, protein: 1, cal: 95 },
]

const defaultMeal = {
  carb: 18,
  sugar: 8,
  fat: 10,
  protein: 12,
  cal: 180,
}

function getMealData(text) {
  const value = text.toLowerCase()
  const result = { ...defaultMeal }

  foodMap.forEach((item) => {
    if (item.keys.some((key) => value.includes(key))) {
      result.carb += item.carb
      result.sugar += item.sugar
      result.fat += item.fat
      result.protein += item.protein
      result.cal += item.cal
    }
  })

  return result
}

function getScore(data) {
  const carbPenalty = Math.min(25, data.carb * 0.4)
  const sugarPenalty = Math.min(35, data.sugar * 1.2)
  const fatPenalty = Math.min(20, data.fat * 0.3)
  const proteinBonus = Math.min(20, data.protein * 0.5)

  const raw = 100 - carbPenalty - sugarPenalty - fatPenalty + proteinBonus
  return Math.max(0, Math.min(100, Math.round(raw)))
}

function getLabel(score) {
  if (score >= 80) return 'Boa'
  if (score >= 55) return 'Moderada'
  return 'Pesada'
}

export default function FoodNutritionChart() {
  const [meal, setMeal] = useState('arroz, frango e salada')
  const [savedMeal, setSavedMeal] = useState('arroz, frango e salada')

  const nutrition = useMemo(() => getMealData(savedMeal), [savedMeal])
  const score = useMemo(() => getScore(nutrition), [nutrition])
  const label = useMemo(() => getLabel(score), [score])

  const bars = useMemo(
    () => [
      {
        name: 'Score',
        value: score,
        fill: score >= 80 ? theme.green : score >= 55 ? theme.yellow : theme.red,
      },
      { name: 'Proteína', value: Math.min(100, nutrition.protein * 3), fill: theme.greenSoft },
      { name: 'Açúcar', value: Math.min(100, nutrition.sugar * 3), fill: theme.red },
      { name: 'Gordura', value: Math.min(100, nutrition.fat * 2), fill: theme.yellow },
    ],
    [score, nutrition]
  )

  const pieData = useMemo(
    () => [
      { name: 'Carboidrato', value: nutrition.carb },
      { name: 'Açúcar', value: nutrition.sugar },
      { name: 'Gordura', value: nutrition.fat },
      { name: 'Proteína', value: nutrition.protein },
    ],
    [nutrition]
  )

  const pieColors = [theme.green, theme.red, theme.yellow, theme.greenSoft]

  return (
    <div className="food-wrap">
      <div className="food-panel food-panel-square">
        <h3>Analisar refeição</h3>
        <p className="events-hint">
          Digite sua refeição. O app vai estimar os nutrientes.
        </p>

        <div className="food-input-row">
          <input
            value={meal}
            onChange={(e) => setMeal(e.target.value)}
            placeholder="Ex: arroz, frango e salada"
          />
          <button onClick={() => setSavedMeal(meal)}>Analisar</button>
        </div>

        <div className="food-summary">
          <div className="food-score">
            <span>Nota</span>
            <strong>{score}</strong>
            <small>{label}</small>
          </div>

          <div className="food-metrics">
            <div><b>{nutrition.carb}g</b><span>Carboidrato</span></div>
            <div><b>{nutrition.sugar}g</b><span>Açúcar</span></div>
            <div><b>{nutrition.fat}g</b><span>Gordura</span></div>
            <div><b>{nutrition.protein}g</b><span>Proteína</span></div>
            <div><b>{nutrition.cal} kcal</b><span>Calorias</span></div>
          </div>
        </div>
      </div>

      <div className="food-chart-grid">
        <div className="food-card">
          <h4>Painel circular</h4>
          <ResponsiveContainer width="100%" height={320}>
            <RadialBarChart
              innerRadius="18%"
              outerRadius="92%"
              data={bars}
              startAngle={180}
              endAngle={-180}
            >
              <RadialBar background dataKey="value" cornerRadius={12} />
              <Tooltip />
              <Legend />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>

        <div className="food-card">
          <h4>Distribuição da refeição</h4>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={4}
              >
                {pieData.map((entry, index) => (
                  <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}