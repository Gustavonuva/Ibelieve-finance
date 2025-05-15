export type UserRole = "borrower" | "lender" | "admin"
export type WalletType = "talisman" | "subwallet" | "metamask"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  wallets?: WalletAddress[]
  kycStatus?: "pending" | "verified" | "rejected"
  kycVerifiedAt?: Date
  creditScore?: number
  createdAt: Date
  updatedAt: Date
}

export interface WalletAddress {
  id: string
  userId: string
  address: string
  network: string
  walletType: WalletType
  walletName: string
  isPrimary: boolean
  createdAt: Date
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
}
