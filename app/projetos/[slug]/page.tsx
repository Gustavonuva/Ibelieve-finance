"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Share2, Clock, CheckCircle, CircleDot } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useParams } from "next/navigation";

type Projeto = {
  titulo: string;
  diasRestantes: number;
  meta: number;
  percentualAtingido: number;
  valorCaptado: number;
  totalInvestidores: number;
  ticketMinimo: number;
  descricao: string;
  mercadoAlvo: string;
  modeloNegocio: string;
  termos: {
    tipo: string;
    percentual: string;
    valuation: string;
  };
  cronograma: {
    titulo: string;
    data: string;
    status: "concluido" | "atual" | "pendente";
  }[];
  equipe: {
    nome: string;
    cargo: string;
    avatarUrl?: string;
  }[];
  investidores: {
    nome: string;
    valor: string;
  }[];
};

export default function ProjetoDetalhe() {
  const params = useParams(); // params já vem como objeto com slug
  const [projeto, setProjeto] = useState<Projeto | null>(null);
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    if (!params.slug) return; // proteja caso slug não exista

    const fetchProjeto = async () => {
      const res = await fetch(`/api/projetos/${params.slug}`);
      const data = await res.json();
      console.log("Dados do projeto:", data);
      setProjeto(data);
    };

    fetchProjeto();
  }, [params.slug]);

  if (!projeto) {
    return <div className="p-8 text-center">Carregando projeto...</div>;
  }

  const handleCadastrarProjetoClick = () => {
    toast({
      title: "Funcionalidade em desenvolvimento",
      description:
        "Aguarde mais um pouco enquanto preparamos essa funcionalidade.",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Coluna da Esquerda - Detalhes do Projeto */}
          <div className="md:col-span-2 space-y-8">
            {/* Título e Progresso */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">{projeto.titulo}</h1>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{projeto.diasRestantes} dias restantes</span>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">R$ {projeto.meta}</span>
                  <span className="font-medium">
                    {projeto.percentualAtingido}% atingido
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full"
                    style={{ width: `${projeto.percentualAtingido}%` }}
                  ></div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-gray-500">Valor captado</div>
                  <div className="font-bold">R$ {projeto.valorCaptado}</div>
                </div>
                <div>
                  <div className="text-gray-500">Investidores</div>
                  <div className="font-bold">{projeto.totalInvestidores}</div>
                </div>
                <div>
                  <div className="text-gray-500">Ticket mínimo</div>
                  <div className="font-bold">R$ {projeto.ticketMinimo}</div>
                </div>
                <div>
                  <div className="text-gray-500">Descrição</div>
                  <div className="font-bold">{projeto.descricao}</div>
                </div>
                <div>
                  <div className="text-gray-500">Mercado Alvo</div>
                  <div className="font-bold">{projeto.mercadoAlvo}</div>
                </div>
                <div>
                  <div className="text-gray-500">Modelo de Negócio</div>
                  <div className="font-bold">{projeto.modeloNegocio}</div>
                </div>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex flex-wrap gap-4">
              <Button
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                onClick={handleCadastrarProjetoClick}
              >
                Investir no Projeto
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={favorited ? "text-red-500 border-red-500" : ""}
                onClick={() => setFavorited(!favorited)}
              >
                <Heart
                  className="h-4 w-4"
                  fill={favorited ? "currentColor" : "none"}
                />
                <span className="sr-only">Favoritar</span>
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Compartilhar</span>
              </Button>
            </div>

            {/* Tabs de Conteúdo */}
            <Tabs defaultValue="sobre">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="sobre">Sobre o Projeto</TabsTrigger>
                <TabsTrigger value="galeria">Galeria</TabsTrigger>
                <TabsTrigger value="equipe">Equipe</TabsTrigger>
              </TabsList>
              <TabsContent value="sobre" className="pt-4">
                <div className="space-y-6">
                  <div>
                    <p className="text-gray-700">
                      Plataforma SaaS revolucionária para gestão de provas
                      zero-knowledge em processos KYC, permitindo verificação de
                      identidade com total privacidade. Nossa solução utiliza
                      criptografia avançada para garantir a segurança dos dados
                      sensíveis enquanto mantém a conformidade regulatória.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-bold mb-2">Mercado Alvo</h3>
                      <p className="text-gray-700">
                        Instituições financeiras, fintechs e empresas reguladas
                      </p>
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Modelo de Negócio</h3>
                      <p className="text-gray-700">
                        SaaS com preço por verificação
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="galeria" className="pt-4">
                <div className="grid grid-cols-3 gap-4">
                  <Image
                    src="/tech.png"
                    alt="Screenshot 1"
                    width={200}
                    height={150}
                    className="rounded-lg"
                  />
                </div>
              </TabsContent>
              <TabsContent value="equipe" className="pt-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage
                        src="/placeholder.svg?height=40&width=40"
                        alt="João Silva"
                      />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-bold">João Silva</div>
                      <div className="text-sm text-gray-500">
                        CEO & Fundador
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage
                        src="/placeholder.svg?height=40&width=40"
                        alt="Pedro Santos"
                      />
                      <AvatarFallback>PS</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-bold">Pedro Santos</div>
                      <div className="text-sm text-gray-500">CTO</div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Perguntas e Respostas */}
            <div>
              <h2 className="text-xl font-bold mb-4">Perguntas e Respostas</h2>
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarFallback>A</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold">Anônimo</span>
                        </div>
                        <p className="font-medium">
                          Como vocês garantem a privacidade dos dados?
                        </p>
                        <p className="text-gray-700 mt-2">
                          Utilizamos provas zero-knowledge para verificar a
                          autenticidade dos dados sem expô-los. Nossa tecnologia
                          é auditada por empresas especializadas.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  <Textarea
                    placeholder="Faça uma pergunta..."
                    className="min-h-[100px]"
                  />
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Enviar Pergunta
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna da Direita - Informações Adicionais */}
          <div className="space-y-6">
            {/* Termos do Investimento */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">
                  Termos do Investimento
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tipo</span>
                    <span className="font-medium">Equity</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">% Oferecida</span>
                    <span className="font-medium">15%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Valuation</span>
                    <span className="font-medium">R$ 13.3M</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cronograma */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Cronograma</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">MVP Desenvolvido</div>
                      <div className="text-sm text-gray-500">Janeiro 2025</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CircleDot className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">Captação</div>
                      <div className="text-sm text-gray-500">Março 2025</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CircleDot className="h-5 w-5 text-gray-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">Lançamento</div>
                      <div className="text-sm text-gray-500">Junho 2025</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Investidores */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Investidores</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback>A</AvatarFallback>
                      </Avatar>
                      <span>Anônimo</span>
                    </div>
                    <span className="font-medium">R$ 100k</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback>A</AvatarFallback>
                      </Avatar>
                      <span>Anônimo</span>
                    </div>
                    <span className="font-medium">R$ 50k</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback>A</AvatarFallback>
                      </Avatar>
                      <span>Anônimo</span>
                    </div>
                    <span className="font-medium">R$ 25k</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Paginação */}
      <div className="container mx-auto px-4 py-4 flex justify-between items-center border-t border-gray-200 mt-8">
        <Button variant="ghost" className="text-blue-600">
          &lt; Projeto Anterior
        </Button>
        <div className="flex items-center">
          <span className="text-gray-500">7 / 9</span>
        </div>
        <Button variant="ghost" className="text-blue-600">
          Próximo Projeto &gt;
        </Button>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Ibelieve finance</h3>
              <p className="text-gray-400 text-sm">
                Plataforma de investimentos P2P com privacidade e segurança
                garantidas por tecnologia ZK.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/projetos"
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    Projetos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/como-funciona"
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    Como Funciona
                  </Link>
                </li>
                <li>
                  <Link
                    href="/beneficios"
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    Benefícios
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sobre"
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    Sobre
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/termos"
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    Termos de Uso
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacidade"
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    Política de Privacidade
                  </Link>
                </li>
                <li>
                  <Link
                    href="/compliance"
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    Compliance
                  </Link>
                </li>
                <li>
                  <Link
                    href="/seguranca"
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    Segurança
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Contato</h3>
              <p className="text-gray-400 text-sm">contato@zkfinance.com</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
