# Dummy Users

Dashboard de gerenciamento de usuários com autenticação, CRUD simulado e cache local usando React, TypeScript, TanStack Query, Ant Design e DummyJSON.

[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?logo=vite)](https://vitejs.dev/)
[![TanStack Query](https://img.shields.io/badge/TanStack%20Query-5.90.2-FF4154?logo=react-query)](https://tanstack.com/query)
[![Ant Design](https://img.shields.io/badge/Ant%20Design-5.27.4-0170FE?logo=antdesign)](https://ant.design/)

## Demo

Projeto ao vivo: [dummy-users.mklly.com.br](https://dummy-users.mklly.com.br/login)

## Sobre

O Dummy Users é uma aplicação React para demonstrar um fluxo completo de gerenciamento de usuários em uma SPA moderna. O projeto inclui autenticação, rotas privadas, listagem paginada, visualização de perfil, criação, edição e exclusão de usuários.

A aplicação usa a API pública da [DummyJSON](https://dummyjson.com/) como backend de demonstração. Como a API não persiste mutações de criação, edição e exclusão, essas ações são refletidas no cache local do TanStack Query para simular uma experiência real de produto.

## Funcionalidades

- Login com credenciais da DummyJSON.
- Refresh token automático via interceptadores do Axios.
- Proteção de rotas autenticadas.
- Listagem paginada de usuários.
- Visualização detalhada de perfil.
- Criação, edição e exclusão de usuários com atualização de cache.
- Tema claro e escuro persistente.
- Feedback visual para carregamento, erro e ações do usuário.

## Stack

- **React 19** para construção da interface.
- **TypeScript** para tipagem estática.
- **Vite** como build tool e servidor de desenvolvimento.
- **React Router 7** para roteamento da SPA.
- **TanStack Query** para cache, sincronização e mutações.
- **Axios** para requisições HTTP e interceptadores de autenticação.
- **Ant Design** para componentes de UI.
- **ESLint** e **Biome** para qualidade e padronização de código.

## Arquitetura

```txt
src/
├── components/          # Componentes reutilizáveis
│   ├── layout/          # Layout da aplicação
│   └── pages/           # Páginas da aplicação
├── contexts/            # Contextos React
├── hooks/               # Custom hooks
├── http/                # Camada de API
│   ├── auth/            # Endpoints de autenticação
│   └── user/            # Endpoints de usuários
├── libs/                # Configurações de bibliotecas
├── providers/           # Providers globais
├── utils/               # Funções utilitárias
└── routes.tsx           # Configuração de rotas
```

## Como executar

### Pré-requisitos

- Node.js 18 ou superior.
- npm.

### Instalação

```bash
git clone <repository-url>
cd dummy-users
npm install
npm run dev
```

Depois, acesse a URL exibida no terminal pelo Vite.

## Scripts disponíveis

```bash
npm run dev      # Inicia o servidor de desenvolvimento
npm run build    # Gera a build de produção
npm run preview  # Visualiza a build localmente
npm run lint     # Executa a análise de código
```

## Credenciais de teste

Use qualquer credencial disponível na [documentação de autenticação da DummyJSON](https://dummyjson.com/docs/auth).

Exemplos:

```txt
Usuário: emilys
Senha: emilyspass

Usuário: michaelw
Senha: michaelwpass
```

## Limitações da API

Funciona diretamente pela DummyJSON:

- Autenticação.
- Refresh token.
- Listagem de usuários.
- Visualização de perfil.

Simulado no cache local:

- Criação de usuários.
- Edição de usuários.
- Exclusão de usuários.

As mutações são aplicadas no cache do TanStack Query para manter a interface responsiva, mesmo sem persistência real no backend público.

## Destaques técnicos

- Arquitetura modular separando componentes, hooks, providers, contextos e camada HTTP.
- Cache de listagem e detalhe de usuários com TanStack Query.
- Atualização local de dados após mutações.
- Interceptadores Axios para anexar token e renovar sessão.
- Tema claro/escuro com persistência.
- Componentização baseada em Ant Design.
- TypeScript em modo estrito.

---

<div align="center">
  <img src="https://github.com/marquesmaycon.png" width="100px" style="border-radius: 50%"/>
  <br/>
  <strong>Maycon Marques</strong>
  <br/>
  <br/>

  [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mayconhenrique/)
  [![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat-square&logo=github&logoColor=white)](https://github.com/marquesmaycon)
  [![Email](https://img.shields.io/badge/Email-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:mayconmarquesh@gmail.com)

  ### Feito com ❤️ e muita 🎵
</div>
