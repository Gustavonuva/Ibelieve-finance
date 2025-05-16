# 🔒 Plataforma de Financiamento Privado – Front-End

[👉 Acesse a versão online do projeto](https://ibelieve-finance.vercel.app/)

## 🎯 Objetivo

Desenvolver uma **Plataforma de Financiamento Privado inovadora**, que combina tecnologias avançadas para garantir segurança, privacidade e eficiência no acesso ao crédito.

A plataforma permitirá que usuários comprovem sua **solvência financeira para obtenção de crédito**, sem precisar revelar seus dados sensíveis, utilizando:

- **Zero-Knowledge Proofs (ZKPs)**, que garantem a veracidade da informação sem exposição dos detalhes financeiros;
- **Blockchain**, para validação transparente, imutável e auditável das provas;
- **Inteligência Artificial (IA)**, para análise de risco, detecção de fraudes e suporte inteligente aos usuários.

### Principais funcionalidades previstas:

- Autenticação via carteiras digitais (wallet connect);
- Geração e validação de provas ZKP na blockchain;
- Integração com instituições financeiras via APIs seguras;
- Painéis interativos para usuários e instituições acompanharem status e histórico;
- Uso de IA para otimizar provas, analisar comportamento financeiro e oferecer orientações.

> Este projeto está sendo desenvolvido em fases, iniciando pela construção do front-end e arquitetura, com posterior integração do backend, contratos inteligentes e modelos de IA.


---

## 🛠️ Tecnologias Utilizadas

- **React + Next.js** – Framework para construção da interface com renderização SSR
- **TypeScript** – Tipagem estática para maior robustez
- **Tailwind CSS** – Estilização rápida com utilitários

---

## 🚀 Como rodar localmente

### ✅ Pré-requisitos

- Node.js 18+
- Yarn ou npm

### ▶️ Passos

```bash
git clone https://github.com/Gustavonuva/Ibelieve-finance.git
cd Ibelieve-finance
npm install
npm run dev
````

Acesse: `http://localhost:3000`

---

## 📁 Estrutura do Projeto

```txt
├── app/                # Rotas e páginas (Next.js App Router)
├── components/         # Componentes reutilizáveis de UI
├── context/            # Contextos globais (ex: autenticação, tema, etc.)
├── hooks/              # Hooks customizados (ex: useAuth, useZKP, etc.)
├── lib/                # Funções auxiliares (ex: formatação, validações)
├── public/             # Arquivos estáticos (imagens, ícones)
├── service/            # Lógicas de comunicação externa (ex: APIs futuras)
├── styles/             # Estilos globais e configurações do Tailwind
├── types/              # Tipagens TypeScript compartilhadas
```

---

## 🧩 Componentes de UI



* `dashboard-layout.tsx` – Layout padrão da aplicação
* `header.tsx` – Cabeçalho com navegação
* `theme-provider.tsx` – Suporte a dark/light mode
* `web3-auth.tsx` – Placeholder para autenticação via Web3
* `supported-wallets.tsx` – Listagem de carteiras compatíveis

---

## 📅 Roadmap por Etapas

| Fase | Nome                         | Principais Entregas                                                                 |
|------|------------------------------|-------------------------------------------------------------------------------------|
| 1    | Planejamento & Design        | Escopo, arquitetura, definição das provas ZKP, wireframes                           |
| 2    | Infraestrutura & Blockchain  | Setup de rede Testnet, integração com carteiras, contratos Solidity básicos         |
| 3    | Desenvolvimento ZKP          | Gerador/validador de provas ZK (ex: zkVerify ou ZoKrates), estrutura de solvência   |
| 4    | Backend & IA                 | API RESTful (Go), primeiros modelos de IA para risco, integração com ZKPs           |
| 5    | Frontend MVP                 | Painel do usuário, conexão com carteira, geração e envio de provas                  |
| 6    | Testes & Auditoria           | Testes de segurança, validação de provas, auditoria de contratos                    |
| 7    | MVP Público em Testnet       | Lançamento para testes com usuários reais                                           |
| 8    | Feedback & Iteração          | Coleta de feedback, ajustes de usabilidade e segurança                              |


---

## 👤 Autor

* **Gustavo Vaz Nunes Mendanha** – `@Gustavonuva`
* **Jay Bulgarelli** - `@codebulgarelli`
* **Gileno** - `@GibaDev`
* **JISTRIANE BRUNIELLI** - `@Jistriane`

---

## 📄 Licença

Licenciado sob a **MIT License**. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

```
