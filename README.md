# Expenses Backend

## [https://expenses.caalb.dev/login](https://expenses.caalb.dev/login)

Este é um projeto backend desenvolvido com **Node.js**, **Express**, **TypeScript** e **TypeORM**, para gerenciar despesas.


## Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)


## Bibliotecas utilizadas
- SendGrid
- Bycript
- Class Transform
- Class Validator
- Date-Fns
- Swaggger
- UUID
- Winston

## Pré-requisitos

Antes de começar, certifique-se de ter o [Node.js](https://nodejs.org/) e o [PostgreSQL](https://www.postgresql.org/) instalados em sua máquina.

## Variáveis de Ambiente

As variáveis de ambiente necessárias para a aplicação estão definidas no arquivo `.env.example`. Para configurar as variáveis de ambiente:

1. **Copie o arquivo de exemplo para `.env`:**
    ```sh
    cp .env.example .env
    ```

2. **Abra o arquivo `.env` e preencha os valores conforme necessário:**
    ```env
    # Exemplo de variáveis de ambiente
    PORT=3000
    DATABASE_HOST=localhost
    DATABASE_PORT=5432
    DATABASE_USERNAME=seu_usuario
    DATABASE_PASSWORD=sua_senha
    DATABASE_NAME=nome_do_banco
    JWT_SECRET=sua_chave_secreta
    ```

## Instalação do Projeto

1. **Clone o repositório:**
    ```sh
    git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/Caalb/expenses-backend.git)
    ```

2. **Acesse o diretório do projeto:**
    ```sh
    cd expenses-backend
    ```

3. **Instale as dependências:**
    ```sh
    npm install
    ```


## Como Rodar o Projeto

### Iniciar o Servidor em Ambiente de Desenvolvimento
```sh
npm run start
```

### O que ficou faltando devido ao tempo de 3 dias.

* [ ] Testes unitários.
