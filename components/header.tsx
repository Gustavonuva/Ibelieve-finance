"use client";

import Link from "next/link";
import Web3Auth from "./web3-auth";
import { Button } from "./ui/button";
import { useAuth } from "@/context/auth-context";
import {
  Bell,
  ChevronDown,
  LogOut,
  Settings,
  User,
  Wallet,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const { authState, logout, switchRole } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  // Header para usuários não autenticados
  const UnauthenticatedHeader = () => (
    <header className="border-b">
      <div className="container mx-auto px-0 py-4 flex items-center justify-between ">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-blue-600 text-white p-1 rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm3 3a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm0 4a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm0 4a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="font-bold text-lg">Ibelieve finance</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/como-funciona"
            className="text-gray-700 hover:text-blue-600"
          >
            Como Funciona
          </Link>
          <Link href="/sobre" className="text-gray-700 hover:text-blue-600">
            Sobre
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Web3Auth />
          <Link href="/login">
            <Button variant="ghost" className="text-blue-600">
              Entrar
            </Button>
          </Link>
          <Link href="/login?tab=register">
            <Button className="bg-blue-600 hover:bg-blue-700">Cadastrar</Button>
          </Link>
        </div>
      </div>
    </header>
  );

  // Header para usuários autenticados
  const AuthenticatedHeader = () => {
    // Links de navegação baseados no perfil do usuário
    const navLinks =
      authState.user?.role === "borrower"
        ? [
            {
              href: "/dashboard",
              label: "Dashboard",
              active: pathname === "/dashboard",
            },
            {
              href: "/",
              label: "Créditos",
              active: pathname === "/creditos",
            },
            {
              href: "/",
              label: "ZK-KYC",
              active: pathname === "/zk-kyc",
            },
          ]
        : [
            {
              href: "/dashboard",
              label: "Dashboard",
              active: pathname === "/dashboard",
            },
            {
              href: "/",
              label: "Relatórios ZK",
              active: pathname === "/relatorios-zk",
            },
          ];

    return (
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-blue-600 text-white p-1 rounded">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm3 3a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm0 4a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm0 4a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="font-bold text-lg">Ibelieve finance</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium ${
                    link.active
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Web3Auth />

            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="/placeholder.svg?height=32&width=32"
                      alt={authState.user?.name}
                    />
                    <AvatarFallback>
                      {authState.user?.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">
                    {authState.user?.name}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Wallet className="mr-2 h-4 w-4" />
                  <span>Carteiras</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configurações</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    );
  };

  return authState.user ? <AuthenticatedHeader /> : <UnauthenticatedHeader />;
}
