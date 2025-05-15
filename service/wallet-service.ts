export type WalletType = "talisman" | "subwallet" | "metamask"

export interface WalletInfo {
  address: string
  network: string
  type: WalletType
  name: string
}

export interface WalletProvider {
  isInstalled: () => boolean
  connect: () => Promise<string[]>
  getNetwork: () => Promise<string>
  getAccounts: () => Promise<string[]>
  getName: () => string
  getType: () => WalletType
  getIcon: () => string
}

class TalismanProvider implements WalletProvider {
  isInstalled(): boolean {
    const { talismanEth } = window as any
    return !!talismanEth
  }

  async connect(): Promise<string[]> {
    try {
      const { talismanEth } = window as any
      if (!talismanEth) {
        throw new Error("Talisman não está instalado")
      }

      const accounts = await talismanEth.request({ method: "eth_requestAccounts" })
      return accounts
    } catch (error) {
      console.error("Erro ao conectar Talisman:", error)
      throw error
    }
  }

  async getNetwork(): Promise<string> {
    try {
      const { talismanEth } = window as any
      if (!talismanEth) {
        throw new Error("Talisman não está instalado")
      }

      const chainId = await talismanEth.request({ method: "eth_chainId" })
      return this.getNetworkName(chainId)
    } catch (error) {
      console.error("Erro ao obter rede do Talisman:", error)
      throw error
    }
  }

  async getAccounts(): Promise<string[]> {
    try {
      const { talismanEth } = window as any
      if (!talismanEth) {
        throw new Error("Talisman não está instalado")
      }

      const accounts = await talismanEth.request({ method: "eth_accounts" })
      return accounts
    } catch (error) {
      console.error("Erro ao obter contas do Talisman:", error)
      throw error
    }
  }

  getName(): string {
    return "Talisman"
  }

  getType(): WalletType {
    return "talisman"
  }

  getIcon(): string {
    return "/talisman-logo.svg" // Você precisará adicionar este ícone
  }

  private getNetworkName(chainId: string): string {
    const networks: Record<string, string> = {
      "0x1": "Ethereum Mainnet",
      "0x5": "Goerli Testnet",
      "0xaa36a7": "Sepolia Testnet",
      // Redes Polkadot/Kusama
      "0x162": "Polkadot",
      "0x164": "Kusama",
      "0x144": "Moonbeam",
      "0x504": "Moonriver",
    }

    return networks[chainId] || `Chain ID: ${chainId}`
  }
}

class SubWalletProvider implements WalletProvider {
  isInstalled(): boolean {
    const { SubWallet } = window as any
    return !!SubWallet
  }

  async connect(): Promise<string[]> {
    const { SubWallet } = window as any
    if (!SubWallet) throw new Error("SubWallet não está instalado")
    const accounts = await SubWallet.request({ method: "eth_requestAccounts" })
    return accounts

  }

  async getNetwork(): Promise<string> {
    try {
      const { subwallet } = window as any
      if (!subwallet) {
        throw new Error("SubWallet não está instalado")
      }

      const chainId = await subwallet.request({ method: "eth_chainId" })
      return this.getNetworkName(chainId)
    } catch (error) {
      console.error("Erro ao obter rede do SubWallet:", error)
      throw error
    }
  }

  async getAccounts(): Promise<string[]> {
    try {
      const { subwallet } = window as any
      if (!subwallet) {
        throw new Error("SubWallet não está instalado")
      }

      const accounts = await subwallet.request({ method: "eth_accounts" })
      return accounts
    } catch (error) {
      console.error("Erro ao obter contas do SubWallet:", error)
      throw error
    }
  }

  getName(): string {
    return "SubWallet"
  }

  getType(): WalletType {
    return "subwallet"
  }

  getIcon(): string {
    return "/subwallet-icon.png" // Você precisará adicionar este ícone
  }

  private getNetworkName(chainId: string): string {
    const networks: Record<string, string> = {
      "0x1": "Ethereum Mainnet",
      "0x5": "Goerli Testnet",
      "0xaa36a7": "Sepolia Testnet",
      // Redes Polkadot/Kusama
      "0x162": "Polkadot",
      "0x164": "Kusama",
      "0x144": "Moonbeam",
      "0x504": "Moonriver",
      // Parachains adicionais
      "0x250": "Astar",
      "0x251": "Shiden",
      "0x2004": "Acala",
    }

    return networks[chainId] || `Chain ID: ${chainId}`
  }
}

class MetamaskProvider implements WalletProvider {
  isInstalled(): boolean {
    const { ethereum } = window as any
    return !!ethereum && ethereum.isMetaMask
  }

  async connect(): Promise<string[]> {
    try {
      const { ethereum } = window as any
      if (!ethereum || !ethereum.isMetaMask) {
        throw new Error("Metamask não está instalado")
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" })
      return accounts
    } catch (error) {
      console.error("Erro ao conectar Metamask:", error)
      throw error
    }
  }

  async getNetwork(): Promise<string> {
    try {
      const { ethereum } = window as any
      if (!ethereum || !ethereum.isMetaMask) {
        throw new Error("Metamask não está instalado")
      }

      const chainId = await ethereum.request({ method: "eth_chainId" })
      return this.getNetworkName(chainId)
    } catch (error) {
      console.error("Erro ao obter rede do Metamask:", error)
      throw error
    }
  }

  async getAccounts(): Promise<string[]> {
    try {
      const { ethereum } = window as any
      if (!ethereum || !ethereum.isMetaMask) {
        throw new Error("Metamask não está instalado")
      }

      const accounts = await ethereum.request({ method: "eth_accounts" })
      return accounts
    } catch (error) {
      console.error("Erro ao obter contas do Metamask:", error)
      throw error
    }
  }

  getName(): string {
    return "MetaMask"
  }

  getType(): WalletType {
    return "metamask"
  }

  getIcon(): string {
    return "/metamask-icon.png" // Você precisará adicionar este ícone
  }

  private getNetworkName(chainId: string): string {
    const networks: Record<string, string> = {
      "0x1": "Ethereum Mainnet",
      "0x5": "Goerli Testnet",
      "0xaa36a7": "Sepolia Testnet",
      "0x89": "Polygon Mainnet",
      "0x13881": "Mumbai Testnet",
    }

    return networks[chainId] || `Chain ID: ${chainId}`
  }
}

export class WalletService {
  private providers: WalletProvider[]

  constructor() {
    this.providers = [new TalismanProvider(), new SubWalletProvider(), new MetamaskProvider()]
  }

  getInstalledProviders(): WalletProvider[] {
    return this.providers.filter((provider) => provider.isInstalled())
  }

  getProvider(type: WalletType): WalletProvider | undefined {
    return this.providers.find((provider) => provider.getType() === type)
  }

  async connectWallet(type: WalletType): Promise<WalletInfo | null> {
    const provider = this.getProvider(type)
    if (!provider) {
      throw new Error(`Provedor de carteira ${type} não encontrado`)
    }

    if (!provider.isInstalled()) {
      throw new Error(`${provider.getName()} não está instalado`)
    }

    try {
      const accounts = await provider.connect()
      if (accounts.length === 0) {
        throw new Error("Nenhuma conta autorizada")
      }

      const network = await provider.getNetwork()

      return {
        address: accounts[0],
        network,
        type,
        name: provider.getName(),
      }
    } catch (error) {
      console.error(`Erro ao conectar ${provider.getName()}:`, error)
      throw error
    }
  }
}

// Exportar uma instância única do serviço
export const walletService = new WalletService()
