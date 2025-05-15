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
      {authState.user.role === "investor" ? (
        <InvestorDashboard />
      ) : (
        <ProposerDashboard />
      )}
    </DashboardLayout>
  );
}

function InvestorDashboard() {
  return (
    <div className="space-y-8">
      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-500">Total Investido</span>
                <BarChart className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-2xl font-bold mb-1">R$ 125.000</div>
              <div className="text-sm text-green-600">↑ 12.5% este mês</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-500">Projetos Ativos</span>
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-2xl font-bold mb-1">8</div>
              <div className="text-sm text-green-600">+ 2 novos este mês</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-500">Retorno Total</span>
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-2xl font-bold mb-1">R$ 15.750</div>
              <div className="text-sm text-green-600">↑ 8.3% este mês</div>
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
                    <div className="font-medium">Novo Investimento</div>
                    <div className="text-sm text-gray-500">
                      Projeto Solar Energy #238
                    </div>
                    <div className="text-xs text-gray-400">Hoje, 14:30</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <DollarSign className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">Retorno Recebido</div>
                    <div className="text-sm text-gray-500">
                      R$ 2.500 - Projeto #186
                    </div>
                    <div className="text-xs text-gray-400">Ontem, 10:15</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <FileCheck className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium">Contrato Finalizado</div>
                    <div className="text-sm text-gray-500">
                      Projeto Tech Innovation #142
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

      {/* Investimentos Ativos */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold">Investimentos Ativos</h2>
          <Button variant="ghost" className="text-blue-600">
            Ver todos →
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Projeto 1 */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold">Solar Energy Project</h3>
                  <div className="text-sm text-gray-500">#238</div>
                </div>
                <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Ativo
                </div>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Investido</span>
                  <span className="font-medium">R$ 25.000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Retorno Esperado</span>
                  <span className="font-medium">12% a.a.</span>
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

          {/* Projeto 2 */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold">Tech Innovation</h3>
                  <div className="text-sm text-gray-500">#142</div>
                </div>
                <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  Em Andamento
                </div>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Investido</span>
                  <span className="font-medium">R$ 15.000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Retorno Esperado</span>
                  <span className="font-medium">15% a.a.</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Prazo</span>
                  <span className="font-medium">24 meses</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Progresso</span>
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

          {/* Projeto 3 */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold">Green Agriculture</h3>
                  <div className="text-sm text-gray-500">#189</div>
                </div>
                <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Ativo
                </div>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Investido</span>
                  <span className="font-medium">R$ 30.000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Retorno Esperado</span>
                  <span className="font-medium">10% a.a.</span>
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
        </div>
      </div>
    </div>
  );
}

function ProposerDashboard() {
  return (
    <div className="space-y-8">
      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-500">Total Arrecadado</span>
                <BarChart className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-2xl font-bold mb-1">R$ 850.000</div>
              <div className="text-sm text-green-600">↑ 15.3% este mês</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-500">Projetos Ativos</span>
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-2xl font-bold mb-1">5</div>
              <div className="text-sm text-green-600">+ 1 novo este mês</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-500">Total Investidores</span>
                <Users className="h-5 w-5 text-blue-600" />
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
                <span className="text-gray-500">Relatórios ZK</span>
                <FileCheck className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-2xl font-bold mb-1">15/15</div>
              <div className="text-sm text-green-600">✓ Todos aprovados</div>
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
              <h2 className="text-lg font-bold mb-6">
                Mensagens de Investidores
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
                    <span className="text-sm font-medium">MI</span>
                  </div>
                  <div>
                    <div className="font-medium">Maria Investidora</div>
                    <div className="text-sm text-gray-500">
                      Pergunta sobre o projeto Tech Hub
                    </div>
                    <div className="text-xs text-gray-400">Há 30 min</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
                    <span className="text-sm font-medium">PA</span>
                  </div>
                  <div>
                    <div className="font-medium">Pedro Analista</div>
                    <div className="text-sm text-gray-500">
                      Solicitação de documentação
                    </div>
                    <div className="text-xs text-gray-400">Há 2 horas</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
                    <span className="text-sm font-medium">AC</span>
                  </div>
                  <div>
                    <div className="font-medium">Ana Consultora</div>
                    <div className="text-sm text-gray-500">
                      Feedback sobre relatório
                    </div>
                    <div className="text-xs text-gray-400">Ontem</div>
                  </div>
                </div>
              </div>
              <Button variant="ghost" className="w-full mt-4 text-blue-600">
                Ver todas as mensagens
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Projetos em Andamento */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold">Projetos em Andamento</h2>
          <Button variant="ghost" className="text-blue-600">
            Gerenciar Projetos →
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Projeto 1 */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold">Tech Hub Innovation</h3>
                  <div className="text-sm text-gray-500">#TH001</div>
                </div>
                <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Em Captação
                </div>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Meta</span>
                  <span className="font-medium">R$ 500.000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Arrecadado</span>
                  <span className="font-medium">R$ 375.000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Investidores</span>
                  <span className="font-medium">45</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Progresso</span>
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

          {/* Projeto 2 */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold">Eco Solutions</h3>
                  <div className="text-sm text-gray-500">#ES002</div>
                </div>
                <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  Em Execução
                </div>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Meta</span>
                  <span className="font-medium">R$ 250.000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Arrecadado</span>
                  <span className="font-medium">R$ 250.000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Investidores</span>
                  <span className="font-medium">32</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Execução</span>
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

          {/* Projeto 3 */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold">Health Tech</h3>
                  <div className="text-sm text-gray-500">#HT003</div>
                </div>
                <div className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                  Preparação
                </div>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Meta</span>
                  <span className="font-medium">R$ 750.000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Documentos</span>
                  <span className="font-medium">80% prontos</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Lançamento</span>
                  <span className="font-medium">Em 15 dias</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Preparação</span>
                  <span className="font-medium">80%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "80%" }}
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
