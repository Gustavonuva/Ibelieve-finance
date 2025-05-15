"use client";

import { useAuth } from "@/context/auth-context";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  FileText,
  Users,
  DollarSign,
  CheckCircle,
  FileCheck,
} from "lucide-react";

// Importe os componentes de gráfico no início do arquivo
import InvestmentHistoryChart from "@/components/charts/investment-history-chart";
import InvestmentDistributionChart from "@/components/charts/investment-distribution-chart";
import ReturnOverTimeChart from "@/components/charts/return-over-time-chart";
import FundingProgressChart from "@/components/charts/funding-progress-chart";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { authState } = useAuth();
  const router = useRouter();

  if (!authState.user) {
    router.push("/"); // Redireciona para a página inicial
    return null;
  }

  // Renderizar dashboard baseado no perfil do usuário
  return (
    <DashboardLayout>
      {authState.user.role === "borrower" ? (
        <BorrowerDashboard />
      ) : (
        <LenderDashboard />
      )}
    </DashboardLayout>
  );
}

// Atualizar as funções de dashboard
function BorrowerDashboard() {
  return (
    <div className="space-y-8">
      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-500">Score de Crédito</span>
                <BarChart className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-2xl font-bold mb-1">850</div>
              <div className="text-sm text-green-600">↑ 15 pontos este mês</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-500">Empréstimos Ativos</span>
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-2xl font-bold mb-1">2</div>
              <div className="text-sm text-green-600">Todos em dia</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-500">Total Devido</span>
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-2xl font-bold mb-1">R$ 45.750</div>
              <div className="text-sm text-gray-500">
                Próximo pagamento: 15/06
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-500">Status KYC</span>
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-green-600 mb-1">
                Verificado
              </div>
              <div className="text-sm text-gray-500">Atualizado há 2 meses</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Histórico e Atividades */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <InvestmentHistoryChart />
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-bold mb-6">Atividades Recentes</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <DollarSign className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium">Empréstimo Aprovado</div>
                    <div className="text-sm text-gray-500">
                      Crédito Pessoal #238
                    </div>
                    <div className="text-xs text-gray-400">Hoje, 14:30</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <DollarSign className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">Pagamento Realizado</div>
                    <div className="text-sm text-gray-500">
                      R$ 1.250 - Empréstimo #186
                    </div>
                    <div className="text-xs text-gray-400">Ontem, 10:15</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <FileCheck className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium">Verificação ZK-KYC</div>
                    <div className="text-sm text-gray-500">
                      Atualização de Score
                    </div>
                    <div className="text-xs text-gray-400">2 dias atrás</div>
                  </div>
                </div>
              </div>
              <Button variant="ghost" className="w-full mt-4 text-blue-600">
                Ver todas as atividades
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Gráficos Adicionais */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <InvestmentDistributionChart />
        <ReturnOverTimeChart />
      </div>

      {/* Empréstimos Ativos */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold">Empréstimos Ativos</h2>
          <Button variant="ghost" className="text-blue-600">
            Ver todos →
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Empréstimo 1 */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold">Crédito Pessoal</h3>
                  <div className="text-sm text-gray-500">#238</div>
                </div>
                <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Em dia
                </div>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Valor Total</span>
                  <span className="font-medium">R$ 25.000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Taxa de Juros</span>
                  <span className="font-medium">1.2% a.m.</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Prazo</span>
                  <span className="font-medium">36 meses</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Progresso</span>
                  <span className="font-medium">45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "45%" }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Empréstimo 2 */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold">Financiamento Auto</h3>
                  <div className="text-sm text-gray-500">#142</div>
                </div>
                <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  Em dia
                </div>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Valor Total</span>
                  <span className="font-medium">R$ 45.000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Taxa de Juros</span>
                  <span className="font-medium">1.5% a.m.</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Prazo</span>
                  <span className="font-medium">48 meses</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Progresso</span>
                  <span className="font-medium">25%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "25%" }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ofertas Recomendadas */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold">Ofertas Recomendadas</h3>
                  <div className="text-sm text-gray-500">
                    Baseadas no seu perfil
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="border-b pb-2">
                  <div className="font-medium">Crédito Consignado</div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Taxa</span>
                    <span className="text-green-600">0.9% a.m.</span>
                  </div>
                </div>
                <div className="border-b pb-2">
                  <div className="font-medium">Crédito Imobiliário</div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Taxa</span>
                    <span className="text-green-600">0.8% a.m.</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full text-blue-600">
                  Ver Todas as Ofertas
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function LenderDashboard() {
  return (
    <div className="space-y-8">
      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-500">Total Emprestado</span>
                <BarChart className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-2xl font-bold mb-1">R$ 2.850.000</div>
              <div className="text-sm text-green-600">↑ 15.3% este mês</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-500">Empréstimos Ativos</span>
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-2xl font-bold mb-1">127</div>
              <div className="text-sm text-green-600">+ 12 novos este mês</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-500">Taxa de Inadimplência</span>
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-2xl font-bold mb-1">1.2%</div>
              <div className="text-sm text-green-600">↓ 0.3% este mês</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-500">Solicitações Pendentes</span>
                <FileCheck className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-2xl font-bold mb-1">15</div>
              <div className="text-sm text-blue-600">Aguardando análise</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progresso e Mensagens */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <FundingProgressChart />
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-bold mb-6">Solicitações Recentes</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
                    <span className="text-sm font-medium">MS</span>
                  </div>
                  <div>
                    <div className="font-medium">Maria Solicitante</div>
                    <div className="text-sm text-gray-500">
                      Crédito Pessoal - R$ 25.000
                    </div>
                    <div className="text-xs text-gray-400">Há 30 min</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
                    <span className="text-sm font-medium">PA</span>
                  </div>
                  <div>
                    <div className="font-medium">Pedro Almeida</div>
                    <div className="text-sm text-gray-500">
                      Financiamento Auto - R$ 45.000
                    </div>
                    <div className="text-xs text-gray-400">Há 2 horas</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
                    <span className="text-sm font-medium">AC</span>
                  </div>
                  <div>
                    <div className="font-medium">Ana Costa</div>
                    <div className="text-sm text-gray-500">
                      Crédito Empresarial - R$ 100.000
                    </div>
                    <div className="text-xs text-gray-400">Ontem</div>
                  </div>
                </div>
              </div>
              <Button variant="ghost" className="w-full mt-4 text-blue-600">
                Ver todas as solicitações
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Ofertas de Crédito */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold">Ofertas de Crédito</h2>
          <Button variant="ghost" className="text-blue-600">
            Gerenciar Ofertas →
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Oferta 1 */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold">Crédito Pessoal</h3>
                  <div className="text-sm text-gray-500">#CP001</div>
                </div>
                <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Ativa
                </div>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Taxa</span>
                  <span className="font-medium">1.2% a.m.</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Valor Máximo</span>
                  <span className="font-medium">R$ 50.000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Solicitações</span>
                  <span className="font-medium">45</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Aprovação</span>
                  <span className="font-medium">75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "75%" }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Oferta 2 */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold">Financiamento Imobiliário</h3>
                  <div className="text-sm text-gray-500">#FI002</div>
                </div>
                <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  Ativa
                </div>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Taxa</span>
                  <span className="font-medium">0.8% a.m.</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Valor Máximo</span>
                  <span className="font-medium">R$ 1.000.000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Solicitações</span>
                  <span className="font-medium">32</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Aprovação</span>
                  <span className="font-medium">60%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "60%" }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Oferta 3 */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold">Crédito Empresarial</h3>
                  <div className="text-sm text-gray-500">#CE003</div>
                </div>
                <div className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                  Nova
                </div>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Taxa</span>
                  <span className="font-medium">1.5% a.m.</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Valor Máximo</span>
                  <span className="font-medium">R$ 500.000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Lançamento</span>
                  <span className="font-medium">Há 3 dias</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Solicitações</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "20%" }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
