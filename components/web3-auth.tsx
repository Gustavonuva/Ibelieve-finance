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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { WalletAddress, WalletType } from "@/types/auth";

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
    authState,
    connectWallet,
    disconnectWallet,
    setPrimaryWallet,
    getInstalledWallets,
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

  // Desconectar carteira
  const handleDisconnectWallet = async (walletId: string) => {
    try {
      await disconnectWallet(walletId);
    } catch (error) {
      console.error(error);
    }
  };

  // Definir carteira primária
  const handleSetPrimaryWallet = async (walletId: string) => {
    try {
      await setPrimaryWallet(walletId);
    } catch (error) {
      console.error(error);
    }
  };

  // Formatar endereço da carteira para exibição
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 4
    )}`;
  };

  // Obter carteira primária
  const getPrimaryWallet = (): WalletAddress | undefined => {
    return authState.user?.wallets?.find((w) => w.isPrimary);
  };

  // Renderizar componente
  return (
    <div className="flex items-center gap-2">
      {authState.user ? (
        // Usuário logado
        <div className="flex items-center gap-2">
          {getPrimaryWallet() ? (
            // Usuário tem carteira conectada
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <div className="flex items-center gap-2 text-green-700">
                    <WalletIcon type={getPrimaryWallet()!.walletType} />
                    <span>{formatAddress(getPrimaryWallet()!.address)}</span>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Carteiras Conectadas</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {authState.user.wallets?.map((wallet) => (
                  <DropdownMenuItem
                    key={wallet.id}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center gap-2">
                      <WalletIcon type={wallet.walletType} />
                      <span>{formatAddress(wallet.address)}</span>
                      {wallet.isPrimary && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                          Principal
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {!wallet.isPrimary && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSetPrimaryWallet(wallet.id)}
                          className="h-6 text-xs"
                        >
                          Definir Principal
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDisconnectWallet(wallet.id)}
                        className="h-6 text-xs text-red-500 hover:text-red-700"
                      >
                        Remover
                      </Button>
                    </div>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsWalletDialogOpen(true)}>
                  <span className="text-blue-600 flex items-center gap-1">
                    <Plus className="h-4 w-4" /> Adicionar Nova Carteira
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            // Usuário logado, mas sem carteira conectada
            <Dialog
              open={isWalletDialogOpen}
              onOpenChange={setIsWalletDialogOpen}
            >
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                  <Wallet className="h-4 w-4" />
                  Conectar Carteira
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Conectar Carteira</DialogTitle>
                  <DialogDescription>
                    Escolha uma das carteiras disponíveis para conectar à sua
                    conta.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  {installedWallets.length > 0 ? (
                    installedWallets.map((wallet) => (
                      <Button
                        key={wallet}
                        variant="outline"
                        className="flex items-center justify-start gap-3 h-12"
                        onClick={() => handleConnectWallet(wallet)}
                        disabled={isConnecting}
                      >
                        <WalletIcon type={wallet} />
                        <span>{getWalletName(wallet)}</span>
                      </Button>
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
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      ) : (
        // Usuário não logado
        <Dialog open={isWalletDialogOpen} onOpenChange={setIsWalletDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
              <Wallet className="h-4 w-4" />
              Conectar Carteira
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Conectar Carteira</DialogTitle>
              <DialogDescription>
                Você precisa fazer login antes de conectar uma carteira.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end mt-4">
              <Button onClick={() => setIsWalletDialogOpen(false)}>
                Fechar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
