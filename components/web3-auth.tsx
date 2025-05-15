"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wallet, CircleAlert, ChevronDown, Plus } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { WalletType } from "@/types/auth";

// Componente para o ícone da carteira
function WalletIcon({ type }: { type: WalletType }) {
  switch (type) {
    case "talisman":
      return (
        <img
          src="/talisman-logo.svg"
          alt="talisman logo"
          width={24}
          height={24}
        />
      );
    case "subwallet":
      return (
        <img
          src="/subwallet-logo.png"
          alt="subwallet logo"
          width={24}
          height={24}
        />
      );
    case "metamask":
      return (
        <img
          src="/metamask-logo.png"
          alt="MetaMask logo"
          width={24}
          height={24}
        />
      );

    default:
      return <Wallet className="h-4 w-4" />;
  }
}

// Componente para o nome da carteira
function getWalletName(type: WalletType): string {
  switch (type) {
    case "talisman":
      return "Talisman";
    case "subwallet":
      return "SubWallet";
    case "metamask":
      return "MetaMask";
    default:
      return "Carteira";
  }
}

export default function Web3Auth() {
  const {
    connectWallet,
    disconnectWallet,
    setPrimaryWallet,
    authState,
    getInstalledWallets,
    walletConnected,
  } = useAuth();
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isWalletDialogOpen, setIsWalletDialogOpen] = useState(false);

  // Obter carteiras instaladas
  const installedWallets = getInstalledWallets();

  // Verificar se nenhuma carteira foi detectada
  if (installedWallets.length === 0) {
    console.warn(
      "Nenhuma carteira detectada. Verifique se as extensões estão instaladas corretamente."
    );
  }

  // Conectar carteira
  const handleConnectWallet = async (walletType: WalletType) => {
    setIsConnecting(true);
    setError(null);

    try {
      await connectWallet(walletType);
      setIsWalletDialogOpen(false);
    } catch (error: any) {
      if (error.code === 4001) {
        // Usuário rejeitou a conexão
        setError("Conexão rejeitada pelo usuário");
      } else {
        setError(error.message || "Erro ao conectar carteira");
        console.error(error);
      }
    } finally {
      setIsConnecting(false);
    }
  };

  // Formatar endereço da carteira para exibição
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 4
    )}`;
  };

  // Renderizar componente
  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            {walletConnected ? (
              <>
                <WalletIcon type={walletConnected.type} />
                <span>{formatAddress(walletConnected.address)}</span>
              </>
            ) : authState.user &&
              authState.user.wallets &&
              authState.user.wallets.length > 0 ? (
              <>
                <WalletIcon type={authState.user.wallets[0].walletType} />
                <span>{formatAddress(authState.user.wallets[0].address)}</span>
              </>
            ) : (
              <div className="flex items-center gap-2 text-green-700">
                <Wallet className="h-4 w-4" />
                <span>Carteiras</span>
              </div>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Carteiras Conectadas</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {installedWallets.length > 0 ? (
            installedWallets.map((wallet) => (
              <DropdownMenuItem
                key={wallet}
                onSelect={(e) => {
                  e.preventDefault(); // <-- evita fechar o dropdown
                }}
                className="flex justify-between items-center"
              >
                <div className="flex items-center gap-2">
                  <WalletIcon type={wallet} />
                  <span>{getWalletName(wallet)}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    console.log("Botão conectar clicado:", wallet);
                    return handleConnectWallet(wallet);
                  }}
                  className="h-6 text-xs"
                >
                  Conectar
                </Button>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="text-center p-4">
              <p className="text-gray-500 mb-4">
                Nenhuma carteira compatível encontrada.
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href="https://talisman.xyz/download"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Instalar Talisman
                </a>
                <a
                  href="https://subwallet.app/download"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Instalar SubWallet
                </a>
              </div>
            </div>
          )}
          {error && (
            <div className="text-red-500 text-sm flex items-center gap-1 mt-2">
              <CircleAlert className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
