import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function SupportedWallets() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="Talisman" width={40} height={40} />
            <CardTitle>Talisman</CardTitle>
          </div>
          <CardDescription>
            Carteira focada no ecossistema Polkadot
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Talisman é uma carteira de criptomoedas que permite gerenciar ativos
            em redes Polkadot, Kusama e Ethereum. Oferece suporte a staking,
            participação em crowdloans e muito mais.
          </p>
          <div className="flex justify-between">
            <Button variant="outline" size="sm" asChild>
              <a
                href="https://talisman.xyz/download"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instalar
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a
                href="https://talisman.xyz"
                target="_blank"
                rel="noopener noreferrer"
              >
                Saiba mais
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <CardTitle>SubWallet</CardTitle>
          </div>
          <CardDescription>
            Carteira completa para Polkadot e Substrate
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            SubWallet é uma carteira multi-chain que suporta todas as parachains
            do ecossistema Polkadot e Kusama, além de redes EVM compatíveis.
            Disponível como extensão e aplicativo móvel.
          </p>
          <div className="flex justify-between">
            <Button variant="outline" size="sm" asChild>
              <a
                href="https://subwallet.app/download"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instalar
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a
                href="https://subwallet.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Saiba mais
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <CardTitle>MetaMask</CardTitle>
          </div>
          <CardDescription>
            Carteira popular para Ethereum e EVM
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            MetaMask é uma das carteiras mais populares para Ethereum e redes
            compatíveis com EVM. Permite interagir com dApps, enviar e receber
            tokens, e gerenciar seus ativos digitais.
          </p>
          <div className="flex justify-between">
            <Button variant="outline" size="sm" asChild>
              <a
                href="https://metamask.io/download"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instalar
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a
                href="https://metamask.io"
                target="_blank"
                rel="noopener noreferrer"
              >
                Saiba mais
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
