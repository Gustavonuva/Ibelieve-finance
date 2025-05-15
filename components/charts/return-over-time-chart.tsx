"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent } from "@/components/ui/card"

// Dados de exemplo para o gráfico
const generateData = () => {
  const data = []
  const now = new Date()
  
  // Gerar dados para os últimos 12 meses
  for (let i = 0; i < 12; i++) {
    const date = new Date(now)
    date.setMonth(date.getMonth() - (11 - i))
    
    // Gerar valores aleatórios com tendência de crescimento
    const expectedReturn = 0.8 + Math.random() * 0.4 // Entre 0.8% e 1.2%
    const actualReturn = expectedReturn * (0.8 + Math.random() * 0.4) // Variação em torno do esperado
    
    data.push({
      month: date.toLocaleDateString('pt-BR', { month: 'short' }),
      esperado: parseFloat(expectedReturn.toFixed(2)),
      real: parseFloat(actualReturn.toFixed(2)),
    })
  }
  
  return data
}

const data = generateData()

export default function ReturnOverTimeChart() {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-lg font-bold mb-6">Taxa de Juros Mensal (%)</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `${value}%`} />
              <Tooltip formatter={(value: number) => [`${value}%`, ""]} />
              <Legend />
              <Line
                type="monotone"
                dataKey="esperado"
                name="Taxa Contratada"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="real"
                name="Taxa Efetiva"
                stroke="#82ca9d"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
