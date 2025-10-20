# 👥 Dummy Users - Sistema de Gerenciamento de Usuários

> 🚀 **Aplicação React moderna** desenvolvida para demonstrar boas práticas e padrões de desenvolvimento frontend.

[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?logo=vite)](https://vitejs.dev/)
[![TanStack Query](https://img.shields.io/badge/TanStack%20Query-5.90.2-FF4154?logo=react-query)](https://tanstack.com/query)
[![Ant Design](https://img.shields.io/badge/Ant%20Design-5.27.4-0170FE?logo=antdesign)](https://ant.design/)

## 📖 Sobre o Projeto

Sistema completo de gerenciamento de usuários que demonstra implementação de **autenticação**, **CRUD de usuários**, **gerenciamento de estado** e **boas práticas de desenvolvimento frontend**. 

⚠️ **Importante**: As mutações (criar, editar, deletar) **não persistem na API** DummyJSON utilizada. As alterações são aplicadas apenas no **cache local** através do TanStack Query, simulando um comportamento real de aplicação.

## 🔐 Login - usuários de teste disponíveis na [documentação da DummyJSON](https://dummyjson.com/docs/auth).
Exemplos: 
```
Usuário: emilys
Senha: emilyspass

Usuário: michaelw
Senha: michaelwpass
```

## ✨ Principais Funcionalidades

### 🔐 **Autenticação Completa**
- Login com credenciais
- Refresh token automático
- Logout e limpeza de sessão

### 👤 **Gestão de Usuários**
- ✅ Listagem paginada de usuários
- ✅ Visualização detalhada de perfil
- ✅ Criação de novos usuários
- ✅ Edição de dados existentes
- ✅ Exclusão com confirmação

### 🎨 **Interface & UX**
- Design com Ant Design
- Tema claro/escuro com toggle
- Modais para formulários
- Feedback visual para ações
- Loading states e tratamento de erros

## 🛠️ Stack Tecnológica

### **Frontend Core**
- **React 19** - Biblioteca principal
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **React Router 7** - Roteamento SPA

### **Gerenciamento de Estado & API**
- **TanStack Query** - Cache, sincronização e mutações
- **Axios** - Cliente HTTP com interceptadores
- **js-cookie** - Gestão de cookies para auth

### **UI & Styling**
- **Ant Design** - Biblioteca de componentes

### **Qualidade de Código**
- **ESLint** - Análise estática de código
- **Biome** - Formatação e linting
- **TypeScript Strict Mode** - Tipagem rigorosa

## 🏗️ Arquitetura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── layout/         # Layout da aplicação
│   └── pages/          # Componentes de página
├── contexts/           # Contexts React (Auth, Theme)
├── hooks/              # Custom hooks
├── http/               # Camada de API
│   ├── auth/          # Endpoints de autenticação
│   └── user/          # Endpoints de usuários
├── libs/               # Configurações de bibliotecas
├── providers/          # Providers React
├── utils/              # Funções utilitárias
└── routes.tsx          # Configuração de rotas
```

## 🚀 Como Executar

### **Pré-requisitos**
- Node.js 18+
- npm ou yarn

### **Instalação**
```bash
# Clone o repositório
git clone <repository-url>

# Instale as dependências
npm install

# Execute em modo de desenvolvimento
npm run dev
```

### **Comandos Disponíveis**
```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build para produção
npm run preview  # Preview da build
npm run lint     # Análise de código
```

## 🔑 Credenciais de Teste

Para fazer login na aplicação, use qualquer uma das credenciais disponíveis na [documentação da DummyJSON](https://dummyjson.com/docs/auth):

```
Usuário: emilys
Senha: emilyspass

Usuário: michaelw
Senha: michaelwpass
```

## 🌐 API & Limitações

A aplicação utiliza a **DummyJSON API** como backend de demonstração:

### ✅ **Funciona Normalmente**
- Autenticação e refresh tokens
- Listagem e busca de usuários
- Visualização de perfis

### ⚠️ **Simulado via Cache Local**
- Criação de usuários
- Edição de dados
- Exclusão de registros

> 💡 **Nota**: As mutações são aplicadas otimisticamente no cache do TanStack Query, proporcionando uma experiência fluida mesmo sem persistência real na API.

## 🎯 Destaques Técnicos

### **Otimizações de Performance**
- ⚡ Lazy loading de componentes
- 🔄 Cache inteligente com TanStack Query
- 📊 Paginação eficiente
- 🎣 Custom hooks para reutilização

### **Experiência do Usuário**
- 🌙 Tema claro/escuro persistente
- ⏳ Estados de loading elegantes
- 🚨 Tratamento de erros

### **Segurança & Autenticação**
- 🔐 Tokens JWT com renovação automática
- 🛡️ Proteção de rotas privadas
- 🍪 Gestão segura de cookies
- 🔄 Interceptadores para requests

### **Desenvolvimento**
- 🔧 TypeScript para type safety
- 📏 ESLint + Biome para qualidade
- 🏗️ Arquitetura modular e escalável
- 🧪 Estrutura preparada para testes


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

