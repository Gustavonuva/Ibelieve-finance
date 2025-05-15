import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Lock, CheckCircle, BarChart } from "lucide-react";

export default function Sobre() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Sobre a Ibelieve finance</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Transformando o mercado de investimentos com privacidade e
            transparência através da tecnologia Zero-Knowledge
          </p>
        </div>
      </section>

      {/* Nossa Missão */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Nossa Missão</h2>
              <p className="text-lg text-gray-700 mb-6">
                A Ibelieve finance nasceu com o propósito de democratizar o
                acesso a investimentos em projetos inovadores, garantindo total
                privacidade dos dados pessoais e, ao mesmo tempo, oferecendo
                transparência nas transações.
              </p>
              <p className="text-lg text-gray-700">
                Acreditamos que a tecnologia Zero-Knowledge Proof (ZKP) pode
                revolucionar o mercado financeiro, permitindo verificações de
                identidade sem exposição de dados sensíveis, enquanto mantém a
                conformidade com regulamentações.
              </p>
            </div>
            <div className="flex justify-center">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Nossa Missão"
                width={400}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Nossa Tecnologia */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Nossa Tecnologia
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-4 rounded-full mb-4">
                    <Lock className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">
                    Zero-Knowledge Proofs
                  </h3>
                  <p className="text-gray-700">
                    Utilizamos provas criptográficas avançadas que permitem
                    verificar a validade de uma informação sem revelar a
                    informação em si. Isso garante que seus dados pessoais nunca
                    sejam expostos durante o processo de KYC.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-4 rounded-full mb-4">
                    <BarChart className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">
                    Blockchain e Smart Contracts
                  </h3>
                  <p className="text-gray-700">
                    Todas as transações são registradas em blockchain,
                    garantindo imutabilidade e transparência. Nossos smart
                    contracts automatizam processos como distribuição de
                    recursos e gestão de participações, eliminando
                    intermediários e reduzindo custos.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Nossos Valores */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Nossos Valores
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-4 rounded-full mb-4">
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Privacidade</h3>
                  <p className="text-gray-700">
                    Acreditamos que seus dados pessoais pertencem a você. Nossa
                    plataforma foi projetada para garantir que você mantenha
                    controle total sobre suas informações.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-4 rounded-full mb-4">
                    <CheckCircle className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Transparência</h3>
                  <p className="text-gray-700">
                    Embora protejamos a privacidade dos usuários, acreditamos na
                    total transparência das transações e fluxos financeiros,
                    permitindo que todos acompanhem o uso dos recursos.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-4 rounded-full mb-4">
                    <BarChart className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Inovação</h3>
                  <p className="text-gray-700">
                    Estamos constantemente buscando novas formas de aplicar
                    tecnologias emergentes para melhorar a experiência dos
                    usuários e a segurança da plataforma.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Equipe */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nossa Equipe</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Image
                    src="/placeholder.svg?height=150&width=150"
                    alt="João Silva"
                    width={150}
                    height={150}
                    className="rounded-full mb-4"
                  />
                  <h3 className="text-xl font-bold mb-1">João Silva</h3>
                  <p className="text-blue-600 mb-4">CEO & Fundador</p>
                  <p className="text-gray-700">
                    Especialista em criptografia e blockchain com mais de 10
                    anos de experiência no mercado financeiro.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Image
                    src="/placeholder.svg?height=150&width=150"
                    alt="Maria Santos"
                    width={150}
                    height={150}
                    className="rounded-full mb-4"
                  />
                  <h3 className="text-xl font-bold mb-1">Maria Santos</h3>
                  <p className="text-blue-600 mb-4">CTO</p>
                  <p className="text-gray-700">
                    Desenvolvedora blockchain com foco em privacidade e
                    segurança de dados. Contribuidora de projetos open-source.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Image
                    src="/placeholder.svg?height=150&width=150"
                    alt="Carlos Mendes"
                    width={150}
                    height={150}
                    className="rounded-full mb-4"
                  />
                  <h3 className="text-xl font-bold mb-1">Carlos Mendes</h3>
                  <p className="text-blue-600 mb-4">COO</p>
                  <p className="text-gray-700">
                    Especialista em operações com experiência em fintechs e
                    empresas de tecnologia financeira.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Junte-se à Revolução Financeira
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Faça parte de uma comunidade que está transformando o futuro dos
            investimentos com privacidade e transparência.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-white text-blue-600 hover:bg-blue-50">
              Explorar Projetos
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-blue-700"
            >
              Cadastrar Projeto
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
