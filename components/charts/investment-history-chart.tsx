"use client"

import { useState } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Dados de exemplo para o gráfico
const generateData = (period: string) => {
  const now = new Date()
  const data = []
  
  // Determinar o número de pontos de dados e o intervalo com base no período
  let numPoints = 30
  let interval = 1
  let format = "DD/MM"
  
  switch (period) {
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
    case "1A":
      numPoints = 12
      interval = 30
      break
  }
  
  // Gerar dados aleatórios com tendência de crescimento
  let investedValue = 80000
  let returnValue = 5000
  
  for (let i = 0; i < numPoints; i++) {
    const date = new Date(now)
    date.setDate(date.getDate() - (numPoints - i - 1) * interval)
    
    // Adicionar alguma variação aleatória, mas com tendência de crescimento
    investedValue += Math.random() * 5000 - 2000
    returnValue += Math.random() * 1000 - 300
    
    if (investedValue < 0) investedValue = 1000
    if (returnValue < 0) returnValue = 500
    
    data.push({
      date: date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      investido: Math.round(investedValue),
      retorno: Math.round(returnValue),
      total: Math.round(investedValue + returnValue),
    })
  }
  
  return data
}

export default function InvestmentHistoryChart() {
  const [period, setPeriod] = useState<"1M" | "3M" | "6M" | "1A">("3M")
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
          <h2 className="text-lg font-bold">Histórico de Investimentos</h2>
          <div className="flex gap-2">
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
            <Button 
              variant="outline" 
              size="sm" 
              className={`text-xs ${period === "1A" ? "bg-blue-600 text-white" : ""}`}
              onClick={() => setPeriod("1A")}
            >
              1A
            </Button>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
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
                tickFormatter={(value) => `R$ ${value/1000}k`}
              />
              <Tooltip 
                formatter={(value: number) => [formatCurrency(value), ""]}
                labelFormatter={(label) => `Data: ${label}`}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="investido" 
                name="Valor Investido" 
                stackId="1"
                stroke="#3b82f6" 
                fill="#3b82f6" 
                fillOpacity={0.6}
              />
              <Area 
                type="monotone" 
                dataKey="retorno" 
                name="Retorno" 
                stackId="1"
                stroke="#10b981" 
                fill="#10b981" 
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
