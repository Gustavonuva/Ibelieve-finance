"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type {
  User,
  AuthState,
  UserRole,
  WalletAddress,
  WalletType,
} from "@/types/auth";
import { walletService } from "@/service/wallet-service";

// Simulação de API - em um projeto real, isso seria substituído por chamadas reais à API
const mockUsers: User[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao@example.com",
    role: "investor",
    kycStatus: "verified",
    kycVerifiedAt: new Date(2025, 3, 15),
    createdAt: new Date(2024, 1, 10),
    updatedAt: new Date(2025, 3, 15),
  },
  {
    id: "2",
    name: "Carlos Empreendedor",
    email: "carlos@example.com",
    role: "proposer",
    kycStatus: "verified",
    kycVerifiedAt: new Date(2024, 11, 5),
    createdAt: new Date(2024, 10, 20),
    updatedAt: new Date(2024, 11, 5),
  },
];

interface AuthContextType {
  authState: AuthState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  connectWallet: (walletType: WalletType) => Promise<void>;
  disconnectWallet: (walletId: string) => Promise<void>;
  setPrimaryWallet: (walletId: string) => Promise<void>;
  switchRole: (role: UserRole) => Promise<void>;
  getInstalledWallets: () => WalletType[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  });

  // Verificar se o usuário já está logado ao carregar a página
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Em um projeto real, verificaria o token JWT ou sessão
        const savedUser = localStorage.getItem("zkfinance_user");

        if (savedUser) {
          const user = JSON.parse(savedUser) as User;
          setAuthState({
            user,
            isLoading: false,
            error: null,
          });
        } else {
          setAuthState({
            user: null,
            isLoading: false,
            error: null,
          });
        }
      } catch (error) {
        setAuthState({
          user: null,
          isLoading: false,
          error: "Falha ao verificar autenticação",
        });
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

      // Simulação de login - em um projeto real, isso seria uma chamada à API
      const user = mockUsers.find((u) => u.email === email);

      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      // Simular atraso de rede
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Salvar usuário no localStorage (em produção, seria melhor usar cookies HttpOnly)
      localStorage.setItem("zkfinance_user", JSON.stringify(user));

      setAuthState({
        user,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "Erro ao fazer login",
      }));
    }
  };

  const logout = () => {
    localStorage.removeItem("zkfinance_user");
    setAuthState({
      user: null,
      isLoading: false,
      error: null,
    });
  };

  const connectWallet = async (walletType: WalletType) => {
    try {
      if (!authState.user) {
        throw new Error("Usuário não está logado");
      }

      // Conectar carteira usando o serviço
      const walletInfo = await walletService.connectWallet(walletType);

      if (!walletInfo) {
        throw new Error("Falha ao conectar carteira");
      }

      // Verificar se a carteira já está conectada
      const walletExists = authState.user.wallets?.some(
        (w) =>
          w.address.toLowerCase() === walletInfo.address.toLowerCase() &&
          w.walletType === walletInfo.type
      );

      if (walletExists) {
        throw new Error("Esta carteira já está conectada à sua conta");
      }

      // Criar nova carteira
      const newWallet: WalletAddress = {
        id: Date.now().toString(),
        userId: authState.user.id,
        address: walletInfo.address,
        network: walletInfo.network,
        walletType: walletInfo.type,
        walletName: walletInfo.name,
        isPrimary:
          !authState.user.wallets || authState.user.wallets.length === 0,
        createdAt: new Date(),
      };

      // Atualizar usuário
      const updatedUser = {
        ...authState.user,
        wallets: [...(authState.user.wallets || []), newWallet],
      };

      // Em um projeto real, isso seria uma chamada à API
      localStorage.setItem("zkfinance_user", JSON.stringify(updatedUser));

      setAuthState({
        ...authState,
        user: updatedUser,
      });
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        error:
          error instanceof Error ? error.message : "Erro ao conectar carteira",
      }));
    }
  };

  const disconnectWallet = async (walletId: string) => {
    try {
      if (!authState.user || !authState.user.wallets) {
        throw new Error("Nenhuma carteira conectada");
      }

      const walletIndex = authState.user.wallets.findIndex(
        (w) => w.id === walletId
      );

      if (walletIndex === -1) {
        throw new Error("Carteira não encontrada");
      }

      const isRemovingPrimary = authState.user.wallets[walletIndex].isPrimary;
      const remainingWallets = authState.user.wallets.filter(
        (w) => w.id !== walletId
      );

      // Se estiver removendo a carteira primária, definir a primeira carteira restante como primária
      if (isRemovingPrimary && remainingWallets.length > 0) {
        remainingWallets[0].isPrimary = true;
      }

      // Atualizar usuário
      const updatedUser = {
        ...authState.user,
        wallets: remainingWallets,
      };

      // Em um projeto real, isso seria uma chamada à API
      localStorage.setItem("zkfinance_user", JSON.stringify(updatedUser));

      setAuthState({
        ...authState,
        user: updatedUser,
      });
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        error:
          error instanceof Error
            ? error.message
            : "Erro ao desconectar carteira",
      }));
    }
  };

  const setPrimaryWallet = async (walletId: string) => {
    try {
      if (!authState.user || !authState.user.wallets) {
        throw new Error("Nenhuma carteira conectada");
      }

      const walletExists = authState.user.wallets.some(
        (w) => w.id === walletId
      );

      if (!walletExists) {
        throw new Error("Carteira não encontrada");
      }

      // Atualizar carteiras
      const updatedWallets = authState.user.wallets.map((wallet) => ({
        ...wallet,
        isPrimary: wallet.id === walletId,
      }));

      // Atualizar usuário
      const updatedUser = {
        ...authState.user,
        wallets: updatedWallets,
      };

      // Em um projeto real, isso seria uma chamada à API
      localStorage.setItem("zkfinance_user", JSON.stringify(updatedUser));

      setAuthState({
        ...authState,
        user: updatedUser,
      });
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        error:
          error instanceof Error
            ? error.message
            : "Erro ao definir carteira primária",
      }));
    }
  };

  const switchRole = async (role: UserRole) => {
    try {
      if (!authState.user) {
        throw new Error("Usuário não está logado");
      }

      // Em um projeto real, verificaria se o usuário tem permissão para mudar para esse perfil
      // e faria uma chamada à API para atualizar o perfil

      // Atualizar usuário
      const updatedUser = {
        ...authState.user,
        role,
      };

      localStorage.setItem("zkfinance_user", JSON.stringify(updatedUser));

      setAuthState({
        ...authState,
        user: updatedUser,
      });
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : "Erro ao mudar perfil",
      }));
    }
  };

  const getInstalledWallets = (): WalletType[] => {
    const installedProviders = walletService.getInstalledProviders();
    return installedProviders.map((provider) => provider.getType());
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        login,
        logout,
        connectWallet,
        disconnectWallet,
        setPrimaryWallet,
        switchRole,
        getInstalledWallets,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
