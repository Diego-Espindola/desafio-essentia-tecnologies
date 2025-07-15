# desafio-essentia-tecnologies 📝 To-Do List - Aplicação Web

Uma aplicação web simples e eficiente para gerenciamento de tarefas diárias, com autenticação de usuários.

## Tecnologias Utilizadas

- **Frontend:** Angular
- **Backend:** Node.js + Express + TypeScript
- **Banco de Dados:** MySQL
- **Autenticação:** JWT (JSON Web Token) - Melhoria

---

## Estrutura de Pastas

to-do-app/

├── frontend/ → Aplicação Angular

├── backend/ → API Node.js com TypeScript

---

## Estrutura do banco de dados
![EER Diagram](database/eer-diagram.png)

---

## Para executar o projeto localmente

### Pré-requisitos

- Node.js instalado (v16+ recomendado) - `https://nodejs.org/pt/download`
- Angular CLI (`npm install -g @angular/cli`)
- MySQL instalado e rodando

## Setup
  Crie um arquivo chamado .env na pasta ./backend do projeto com as variáveis de ambiente necessárias:


```env
# Configurações do Banco de Dados
DB_HOST=localhost
DB_USER=meu_usuario
DB_PASSWORD=minha_senha_banco
DB_NAME=todolist

# Configurações do JWT (JSON Web Token)
JWT_SECRET=minha_chave_secreta_super_segura_aleatoria
JWT_EXPIRES_IN=8h
```

Crie o banco de dados com o SQL contido na pasta ./database
---

### Passos para rodar o Frontend

No bash:
```
cd frontend
npm install
ng serve
```
O frontend estará disponível em: http://localhost:4200

### Passos para rodar o Backend
No bash:
```
cd backend
npm install
npm run dev
```

### O PROGRAMA ESTÁ PRONTO PARA USO ###

------


# Funcionalidades
-- Autenticação JWT e senhas criptografadas

-- CRUD de tarefas

-- Cada usuário visualiza apenas suas tarefas

# Melhorias futuras possíveis
-- Adicionar um banco MongoDB para permitir anexar documentos às tarefas

-- Permitir múltiplos comentários para uma tarefa utilizando um banco de dados noSql

# Criação de usuários
-- Este projeto possui um script auxiliar para criar um usuário diretamente no banco de dados com a senha já codificada.

### Local do script

```bash
backend/scripts/create-user.ts
```
Orientações de execução estão dentro do script, preencha as constantes username e password.

# Testes
Os testes podem ser feitos manualmente no navegador e via Postman/Insomnia.
