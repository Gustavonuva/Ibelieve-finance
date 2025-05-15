"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Dados de exemplo para o gráfico
const generateData = (period: string) => {
  const now = new Date()
  const data = []
  
  // Determinar o número de pontos de dados e o intervalo com base no período
  let numPoints = 7
  let interval = 1
  
  switch (period) {
    case "7D":
      numPoints = 7
      interval = 1
      break
    case "1M":
      numPoints = 30
      interval = 1
      break
    case "3M":
      numPoints = 12
      interval = 7
      break
    case "6M":
      numPoints = 24
      interval = 7
      break
  }
  
  // Gerar dados aleatórios com tendência de crescimento
  let captacaoAcumulada = 0
  const metaDiaria = 850000 / numPoints
  
  for (let i = 0; i < numPoints; i++) {
    const date = new Date(now)
    date.setDate(date.getDate() - (numPoints - i - 1) * interval)
    
    // Adicionar alguma variação aleatória, mas com tendência de crescimento
    const captacaoDia = Math.max(0, metaDiaria * (0.5 + Math.random()))
    captacaoAcumulada += captacaoDia
    
    data.push({
      date: date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      captacao: Math.round(captacaoDia),
      acumulado: Math.round(captacaoAcumulada),
      meta: 850000,
    })
  }
  
  return data
}

export default function FundingProgressChart() {
  const [period, setPeriod] = useState<"7D" | "1M" | "3M" | "6M">("1M")
  const data = generateData(period)
  
  // Formatar valores para exibição no tooltip
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold">Progresso de Financiamento</h2>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className={`text-xs ${period === "7D" ? "bg-blue-600 text-white" : ""}`}
              onClick={() => setPeriod("7D")}
            >
              7D
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className={`text-xs ${period === "1M" ? "bg-blue-600 text-white" : ""}`}
              onClick={() => setPeriod("1M")}
            >
              1M
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className={`text-xs ${period === "3M" ? "bg-blue-600 text-white" : ""}`}
              onClick={() => setPeriod("3M")}
            >
              3M
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className={`text-xs ${period === "6M" ? "bg-blue-600 text-white" : ""}`}
              onClick={() => setPeriod("6M")}
            >
              6M
            </Button>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis 
                yAxisId="left"
                orientation="left"
                tickFormatter={(value) => `R$ ${value/1000}k`}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                tickFormatter={(value) => `R$ ${value/1000}k`}
              />
              <Tooltip 
                formatter={(value: number) => [formatCurrency(value), ""]}
                labelFormatter={(label) => `Data: ${label}`}
              />
              <Legend />
              <Bar 
                yAxisId="left"
                dataKey="captacao" 
                name="Captação Diária" 
                fill="#3b82f6" 
              />
              <Bar 
                yAxisId="right"
                dataKey="acumulado" 
                name="Acumulado" 
                fill="#10b981" 
              />
              <ReferenceLine 
                yAxisId="right"
                y={850000} 
                label="Meta" 
                stroke="#ef4444" 
                strokeDasharray="3 3" 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
