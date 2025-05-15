"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Clock, List, LayoutGrid, User, Info } from "lucide-react";

export default function Projetos() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const mockProjects = [
    {
      slug: "tech-innovation-hub",
      title: "Tech Innovation Hub",
      category: "Tecnologia",
      retorno: "Equity",
      diasRestantes: 30,
      descricao:
        "Plataforma SaaS para gestão de provas zero-knowledge em processos KYC",
      atingido: 65,
      autor: "João Silva",
      imagem: "/tech.png",
    },
    {
      slug: "green-energy-solutions",
      title: "Green Energy Solutions",
      category: "Sustentabilidade",
      retorno: null,
      diasRestantes: 15,
      descricao: "Implementação de painéis solares em condomínios residenciais",
      atingido: 85,
      autor: "Maria Santos",
      imagem: "/solar.png",
    },
    {
      slug: "defi-payments",
      title: "DeFi Payments",
      category: "Finanças",
      retorno: "DeFi",
      diasRestantes: 45,
      descricao:
        "Sistema de pagamentos descentralizado com foco em privacidade",
      atingido: 45,
      autor: "Carlos Mendes",
      imagem: "/mobile.png",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Barra de pesquisa e filtros */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
            <div className="w-full md:w-auto flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Buscar projetos..." className="pl-10" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className={viewMode === "list" ? "bg-gray-100" : ""}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4 mr-2" />
                Lista
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={viewMode === "grid" ? "bg-gray-100" : ""}
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-4 w-4 mr-2" />
                Grid
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <select className="w-full border border-gray-300 rounded-md p-2 text-sm">
                <option value="">Categoria</option>
                <option value="tecnologia">Tecnologia</option>
                <option value="sustentabilidade">Sustentabilidade</option>
                <option value="financas">Finanças</option>
              </select>
            </div>
            <div>
              <select className="w-full border border-gray-300 rounded-md p-2 text-sm">
                <option value="">Status</option>
                <option value="ativo">Ativo</option>
                <option value="finalizado">Finalizado</option>
                <option value="cancelado">Cancelado</option>
              </select>
            </div>
            <div>
              <select className="w-full border border-gray-300 rounded-md p-2 text-sm">
                <option value="">Tipo de Retorno</option>
                <option value="equity">Equity</option>
                <option value="dividendos">Dividendos</option>
                <option value="royalties">Royalties</option>
              </select>
            </div>
            <div>
              <select className="w-full border border-gray-300 rounded-md p-2 text-sm">
                <option value="">Prazo</option>
                <option value="curto">Curto (&lt; 30 dias)</option>
                <option value="medio">Médio (30-90 dias)</option>
                <option value="longo">Longo (&gt; 90 dias)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-600 flex items-center gap-1"
            >
              <Info className="h-4 w-4" />
              Limpar Filtros
            </Button>
          </div>
        </div>

        {/* Lista de Projetos */}
        <div
          className={`grid ${
            viewMode === "grid" ? "md:grid-cols-3" : "md:grid-cols-1"
          } gap-6 mb-8`}
        >
          {mockProjects.map((project) => (
            <Card
              key={project.slug}
              className="overflow-hidden border border-gray-200"
            >
              <div className="relative">
                <Image
                  src={project.imagem}
                  alt={project.title}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2 flex gap-2">
                  {project.category && (
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                      {project.category}
                    </Badge>
                  )}
                  {project.retorno && (
                    <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                      {project.retorno}
                    </Badge>
                  )}
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold">{project.title}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{project.diasRestantes} dias restantes</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  {project.descricao}
                </p>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Meta: R$ 2000000,00</span>
                      <span>{project.atingido}% atingido</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${project.atingido}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center mr-2">
                        <User className="h-4 w-4" />
                      </div>
                      <span className="text-sm">Por {project.autor}</span>
                    </div>
                    <Link href={`/projetos/${project.slug}`}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-blue-600 border-blue-600"
                      >
                        Ver Detalhes
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Paginação */}
        <div className="flex justify-center gap-2">
          <Button variant="outline" size="icon" disabled>
            <span className="sr-only">Página anterior</span>
            &lt;
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            <span className="sr-only">Página 1</span>1
          </Button>
          <Button variant="outline" size="icon">
            <span className="sr-only">Página 2</span>2
          </Button>
          <Button variant="outline" size="icon">
            <span className="sr-only">Página 3</span>3
          </Button>
          <Button variant="outline" size="icon" disabled>
            <span className="sr-only">Mais páginas</span>
            ...
          </Button>
          <Button variant="outline" size="icon">
            <span className="sr-only">Página 10</span>
            10
          </Button>
          <Button variant="outline" size="icon">
            <span className="sr-only">Próxima página</span>
            &gt;
          </Button>
        </div>
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
