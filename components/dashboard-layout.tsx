"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { authState, logout, switchRole } = useAuth();
  const pathname = usePathname();

  // Verificar se o usuário está logado
  if (!authState.user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Acesso Restrito</h1>
        <p className="mb-6">
          Você precisa estar logado para acessar esta página.
        </p>
        <Link href="/login">
          <Button className="bg-blue-600 hover:bg-blue-700">Fazer Login</Button>
        </Link>
      </div>
    );
  }

  // Atualizar os links de navegação baseados no perfil do usuário
  const navLinks =
    authState.user.role === "borrower"
      ? [
          {
            href: "/dashboard",
            label: "Dashboard",
            active: pathname === "/dashboard",
          },
          {
            href: "/emprestimos",
            label: "Meus Empréstimos",
            active: pathname === "/emprestimos",
          },
          { href: "/zk-kyc", label: "ZK-KYC", active: pathname === "/zk-kyc" },
          {
            href: "/carteira",
            label: "Carteira",
            active: pathname === "/carteira",
          },
        ]
      : [
          {
            href: "/dashboard",
            label: "Dashboard",
            active: pathname === "/dashboard",
          },
          {
            href: "/solicitacoes",
            label: "Solicitações",
            active: pathname === "/solicitacoes",
          },
          {
            href: "/ofertas",
            label: "Minhas Ofertas",
            active: pathname === "/ofertas",
          },
          {
            href: "/relatorios-zk",
            label: "Relatórios ZK",
            active: pathname === "/relatorios-zk",
          },
        ];

  // Atualizar o título do dashboard baseado no perfil do usuário
  const dashboardTitle =
    authState.user.role === "borrower"
      ? "Dashboard do Solicitante"
      : "Dashboard da Instituição";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-1">{dashboardTitle}</h1>
        <p className="text-gray-600 mb-8">
          Bem-vindo de volta, {authState.user.name}
        </p>

        {children}
      </main>
    </div>
  );
}
