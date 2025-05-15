import { NextRequest } from "next/server";

const mockProjects = [
    {
        slug: "tech-innovation-hub",
        titulo: "Tech Innovation Hub",
        diasRestantes: 30,
        meta: 500000,
        percentualAtingido: 65,
        valorCaptado: 325000,
        totalInvestidores: 120,
        ticketMinimo: 1000,
        descricao: "Plataforma SaaS para gestão de provas zero-knowledge em processos KYC",
        mercadoAlvo: "Empresas de tecnologia e segurança digital",
        modeloNegocio: "SaaS - Software como Serviço",
        termos: {
            tipo: "Equity",
            percentual: "10%",
            valuation: "5.000.000",
        },
        cronograma: [
            { titulo: "Lançamento MVP", data: "2024-05-01", status: "concluido" },
            { titulo: "Validação mercado", data: "2024-07-01", status: "atual" },
            { titulo: "Expansão", data: "2024-10-01", status: "pendente" },
        ],
        equipe: [
            { nome: "João Silva", cargo: "CEO", avatarUrl: "/avatars/joao.png" },
            { nome: "Maria Costa", cargo: "CTO", avatarUrl: "/avatars/maria.png" },
        ],
        investidores: [
            { nome: "Investidor 1", valor: "R$ 50.000" },
            { nome: "Investidor 2", valor: "R$ 75.000" },
        ],
    },
    {
        slug: "green-energy-solutions",
        titulo: "Green Energy Solutions",
        diasRestantes: 15,
        meta: 300000,
        percentualAtingido: 85,
        valorCaptado: 255000,
        totalInvestidores: 90,
        ticketMinimo: 500,
        descricao: "Implementação de painéis solares em condomínios residenciais",
        mercadoAlvo: "Residências e condomínios",
        modeloNegocio: "Projeto de instalação e manutenção",
        termos: {
            tipo: "Equity",
            percentual: "12%",
            valuation: "2.500.000",
        },
        cronograma: [
            { titulo: "Prototipagem", data: "2024-04-01", status: "concluido" },
            { titulo: "Piloto", data: "2024-06-15", status: "atual" },
            { titulo: "Produção em massa", data: "2024-09-01", status: "pendente" },
        ],
        equipe: [
            { nome: "Maria Santos", cargo: "CEO", avatarUrl: "/avatars/maria_s.png" },
            { nome: "Carlos Lima", cargo: "Engenheiro", avatarUrl: "/avatars/carlos.png" },
        ],
        investidores: [
            { nome: "Investidor A", valor: "R$ 40.000" },
            { nome: "Investidor B", valor: "R$ 60.000" },
        ],
    },
    {
        slug: "defi-payments",
        titulo: "DeFi Payments",
        diasRestantes: 45,
        meta: 400000,
        percentualAtingido: 45,
        valorCaptado: 180000,
        totalInvestidores: 70,
        ticketMinimo: 2000,
        descricao: "Sistema de pagamentos descentralizado com foco em privacidade",
        mercadoAlvo: "Usuários de criptomoedas e fintechs",
        modeloNegocio: "Plataforma blockchain",
        termos: {
            tipo: "Token",
            percentual: "15%",
            valuation: "3.000.000",
        },
        cronograma: [
            { titulo: "Desenvolvimento smart contracts", data: "2024-03-15", status: "concluido" },
            { titulo: "Testes em rede de teste", data: "2024-05-01", status: "atual" },
            { titulo: "Lançamento mainnet", data: "2024-08-01", status: "pendente" },
        ],
        equipe: [
            { nome: "Carlos Mendes", cargo: "CEO" },
            { nome: "Ana Paula", cargo: "Desenvolvedora" },
        ],
        investidores: [
            { nome: "Investidor X", valor: "R$ 100.000" },
            { nome: "Investidor Y", valor: "R$ 80.000" },
        ],
    },
];


export async function GET(
    req: NextRequest,
    context: { params: Promise<{ slug: string }> }
) {
    const { slug } = await context.params;

    const projeto = mockProjects.find((p) => p.slug === slug);

    if (!projeto) {
        return new Response(
            JSON.stringify({ error: "Projeto não encontrado" }),
            { status: 404, headers: { "Content-Type": "application/json" } }
        );
    }

    return new Response(JSON.stringify(projeto), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}
