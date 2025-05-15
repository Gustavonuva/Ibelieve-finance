import {
  User,
  Shield,
  Search,
  BarChart,
  FileText,
  FileCheck,
  Megaphone,
  BarChart2,
  Lock,
  CheckCircle,
  FileSpreadsheet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ComoFunciona() {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Atualizar o título e descrição */}
        <h1 className="text-3xl font-bold text-center mb-4">Como Funciona</h1>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-16">
          Conheça o processo simplificado e seguro para solicitar crédito ou
          oferecer financiamento através de nossa plataforma com ZK-KYC
        </p>

        {/* Para Investidores */}
        <div className="mb-16">
          {/* Atualizar a seção "Para Solicitantes" */}
          <h2 className="text-2xl font-bold text-center mb-8">
            Para Solicitantes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Passo 1 */}
            <Card className="border border-gray-200">
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="bg-blue-100 p-4 rounded-full mb-4">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  {/* Atualizar os passos para solicitantes */}
                  <h3 className="font-bold mb-2">1. Registro</h3>
                  <p className="text-sm text-gray-600 text-center">
                    Crie sua conta e complete o processo de verificação básica
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Passo 2 */}
            <Card className="border border-gray-200">
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="bg-blue-100 p-4 rounded-full mb-4">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-bold mb-2">2. ZK-KYC</h3>
                  <p className="text-sm text-gray-600 text-center">
                    Comprove sua solvência financeira sem revelar dados
                    sensíveis
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Passo 3 */}
            <Card className="border border-gray-200">
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="bg-blue-100 p-4 rounded-full mb-4">
                    <Search className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-bold mb-2">3. Solicite</h3>
                  <p className="text-sm text-gray-600 text-center">
                    Escolha as melhores ofertas de crédito disponíveis para seu
                    perfil
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Passo 4 */}
            <Card className="border border-gray-200">
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="bg-blue-100 p-4 rounded-full mb-4">
                    <BarChart className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-bold mb-2">4. Gerencie</h3>
                  <p className="text-sm text-gray-600 text-center">
                    Acompanhe seus empréstimos e pagamentos
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Para Proponentes */}
        <div className="mb-16">
          {/* Atualizar a seção "Para Instituições Financeiras" */}
          <h2 className="text-2xl font-bold text-center mb-8">
            Para Instituições Financeiras
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Passo 1 */}
            <Card className="border border-gray-200">
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="bg-green-100 p-4 rounded-full mb-4">
                    <FileText className="h-6 w-6 text-green-600" />
                  </div>
                  {/* Atualizar os passos para instituições */}
                  <h3 className="font-bold mb-2">1. Cadastro</h3>
                  <p className="text-sm text-gray-600 text-center">
                    Registre sua instituição e complete a verificação
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Passo 2 */}
            <Card className="border border-gray-200">
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="bg-green-100 p-4 rounded-full mb-4">
                    <FileCheck className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-bold mb-2">2. Configuração</h3>
                  <p className="text-sm text-gray-600 text-center">
                    Defina seus critérios de crédito e taxas de juros
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Passo 3 */}
            <Card className="border border-gray-200">
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="bg-green-100 p-4 rounded-full mb-4">
                    <Megaphone className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-bold mb-2">3. Análise</h3>
                  <p className="text-sm text-gray-600 text-center">
                    Avalie solicitações com nossa IA sem acesso a dados
                    sensíveis
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Passo 4 */}
            <Card className="border border-gray-200">
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="bg-green-100 p-4 rounded-full mb-4">
                    <BarChart2 className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-bold mb-2">4. Gestão</h3>
                  <p className="text-sm text-gray-600 text-center">
                    Acompanhe empréstimos e receba pagamentos automaticamente
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* ZK-KYC e Transparência */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* ZK-KYC */}
          <Card className="border border-gray-200">
            <CardContent className="p-6">
              {/* Atualizar a seção "ZK-KYC e Transparência" */}
              <h3 className="text-xl font-bold mb-6">
                ZK-KYC: Privacidade com Conformidade
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full shrink-0">
                    <Lock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Dados Protegidos</h4>
                    <p className="text-sm text-gray-600">
                      Seus extratos bancários e informações financeiras nunca
                      são expostos ou armazenados
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full shrink-0">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">
                      Verificação Matemática
                    </h4>
                    <p className="text-sm text-gray-600">
                      Provas criptográficas garantem a validade dos dados
                      financeiros sem revelá-los
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full shrink-0">
                    <FileCheck className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">
                      Conformidade Regulatória
                    </h4>
                    <p className="text-sm text-gray-600">
                      Atendimento às exigências KYC/AML sem comprometer
                      privacidade
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transparência On-Chain */}
          <Card className="border border-gray-200">
            <CardContent className="p-6">
              {/* Atualizar a seção "Transparência On-Chain" */}
              <h3 className="text-xl font-bold mb-6">
                Análise de Crédito com IA
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-full shrink-0">
                    <BarChart className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Avaliação Justa</h4>
                    <p className="text-sm text-gray-600">
                      Algoritmos avançados analisam seu perfil sem vieses
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-full shrink-0">
                    <FileSpreadsheet className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">
                      Contratos Inteligentes
                    </h4>
                    <p className="text-sm text-gray-600">
                      Termos de empréstimo automatizados e transparentes
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-full shrink-0">
                    <FileCheck className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Registro Imutável</h4>
                    <p className="text-sm text-gray-600">
                      Todas as transações são registradas na blockchain
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          {/* Atualizar o CTA */}
          <h2 className="text-2xl font-bold mb-6">Pronto para começar?</h2>
          <div className="flex justify-center gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Solicitar Crédito
            </Button>
            <Button variant="outline" className="border-blue-600 text-blue-600">
              Para Instituições
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
