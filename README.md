# BACKEND USER

![INDT](./indt-removebg-preview.png)

Este repositório contém as informações necessárias para facilitar deploy e instalação, do back-end do sistema User no seu ambiente de desenvolvimento ou de produção.

# Tabela de conteúdos

<!--ts-->

- [Tecnologias](#1-Tecnlogias)
- [Estrutura de pastas](#2-estrutura-de-pastas)
- [Pré-requisitos](#3-pré-requisitos)
- [Clonando o repositório de back-end do projeto BACKEND USER](#4-clonando-o-repositório-de-back-end-do-projeto-backend-user)
- [Configurações](#5-configurações)
- [Configuração de deploy back-end do projeto BACKEND USER usando o Docker](#6-configuração-de-deploy-back-end-do-projeto-backend-user-usando-o-docker)

<!--te-->

## 1. Tecnologias

- Typescript
- Swagger
- Nestjs
- Postgresql
- TypeORM
- Docker
- Docker compose

## 2. Estrutura de pastas

```bash
📦 BACKEND-USER
📦src
 ┣ 📂authentication
 ┃ ┣ 📂decorators
 ┃ ┃ ┣ 📜private.decorator.ts
 ┃ ┃ ┣ 📜public.decorator.ts
 ┃ ┃ ┗ 📜roles.decorator.ts
 ┃ ┗ 📜auth.guard.ts
 ┣ 📂common
 ┃ ┗ 📂database
 ┃ ┃ ┗ 📂typeorm
 ┃ ┃ ┃ ┗ 📜typeorm.module.ts
 ┣ 📂core
 ┃ ┣ 📂entities
 ┃ ┃ ┣ 📜entity.ts
 ┃ ┃ ┣ 📜unique-entity-id.ts
 ┃ ┃ ┗ 📜value-object.ts
 ┃ ┣ 📂erros
 ┃ ┃ ┗ 📜use-case-error.contract.ts
 ┃ ┣ 📂repositories
 ┃ ┃ ┣ 📜base-repository.contract.ts
 ┃ ┃ ┗ 📜pagination-params.contract.ts
 ┃ ┣ 📂types
 ┃ ┃ ┣ 📜either.spec.ts
 ┃ ┃ ┣ 📜either.ts
 ┃ ┃ ┗ 📜optional.ts
 ┃ ┗ 📂utils
 ┣ 📂modules
 ┃ ┣ 📂auth
 ┃ ┃ ┣ 📂domain
 ┃ ┃ ┃ ┗ 📂application
 ┃ ┃ ┃ ┃ ┗ 📂use-cases
 ┃ ┃ ┃ ┃ ┃ ┣ 📂errors
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜email-or-password-invalid-error.ts
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜role-not-authorized-error.ts
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜token-expired-error.ts
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜token-invalid-error.ts
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜token-not-provided-error copy.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜authenticate.use-case.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜compare-password.use-case.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜decode-jwt.use-case.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜extract-token.use-case.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜generate-token.use-case.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜set-permissions.use-case.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜sign-in.use-case.ts
 ┃ ┃ ┃ ┃ ┃ ┗ 📜verify-token.use-case.ts
 ┃ ┃ ┗ 📂infra
 ┃ ┃ ┃ ┗ 📂http
 ┃ ┃ ┃ ┃ ┣ 📂controllers
 ┃ ┃ ┃ ┃ ┃ ┗ 📜auth.controller.ts
 ┃ ┃ ┃ ┃ ┣ 📂dtos
 ┃ ┃ ┃ ┃ ┃ ┗ 📜sign-in.dto.ts
 ┃ ┃ ┃ ┃ ┣ 📂presenters
 ┃ ┃ ┃ ┃ ┗ 📜http-auth.module.ts
 ┃ ┗ 📂user
 ┃ ┃ ┣ 📂domain
 ┃ ┃ ┃ ┣ 📂application
 ┃ ┃ ┃ ┃ ┣ 📂repositories
 ┃ ┃ ┃ ┃ ┃ ┗ 📜user.repository.contract.ts
 ┃ ┃ ┃ ┃ ┗ 📂use-cases
 ┃ ┃ ┃ ┃ ┃ ┣ 📂erros
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜email-already-registered-error.ts
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜invalid-type-uuid.error.ts
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜user-not-found.error.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜create-user.use-case.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜data-to-graph.use-case.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜delete-user.use-case.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜find-user-by-email.use-case.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜find-user-by-id.use-case.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜get-all-user.use-case.ts
 ┃ ┃ ┃ ┃ ┃ ┗ 📜update-user.use-case.ts
 ┃ ┃ ┃ ┗ 📂enterprise
 ┃ ┃ ┃ ┃ ┣ 📂value-objects
 ┃ ┃ ┃ ┃ ┃ ┗ 📜user-vo.ts
 ┃ ┃ ┃ ┃ ┣ 📜user.entity.spec.ts
 ┃ ┃ ┃ ┃ ┗ 📜user.entity.ts
 ┃ ┃ ┗ 📂infra
 ┃ ┃ ┃ ┣ 📂http
 ┃ ┃ ┃ ┃ ┣ 📂controllers
 ┃ ┃ ┃ ┃ ┃ ┗ 📜user.controller.ts
 ┃ ┃ ┃ ┃ ┣ 📂dtos
 ┃ ┃ ┃ ┃ ┃ ┣ 📜create-user.dto.ts
 ┃ ┃ ┃ ┃ ┃ ┗ 📜update-user.dto.ts
 ┃ ┃ ┃ ┃ ┣ 📂presenters
 ┃ ┃ ┃ ┃ ┃ ┗ 📜user.presenters.ts
 ┃ ┃ ┃ ┃ ┗ 📜http-user.module.ts
 ┃ ┃ ┃ ┗ 📂persistence
 ┃ ┃ ┃ ┃ ┣ 📂typeorm
 ┃ ┃ ┃ ┃ ┃ ┣ 📂models
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜user.model.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📂repositories
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜typeorm-user-repository.impl.ts
 ┃ ┃ ┃ ┃ ┃ ┗ 📜persistence-user.module.ts
 ┃ ┃ ┃ ┃ ┗ 📜user.module.ts
 ┣ 📜app.module.ts
 ┗ 📜main.ts
```

## 3. Pré-requisitos

- Sistema operacional Linux Ubuntu 22 lts ou Windows 11

- Instalar VS CODE para visualizar os projetos

- Instalar Node versão 21.7.0

- Instalar Yarn versão 1.22.18 LTS (ou versão superior LTS)

- Instalar a versão Git 2.25.1 LTS (ou superior LTS)

- Instalar Docker versão 20.10.11 LTS (ou versão superior LTS)

- Instalar Docker-compose versão 1.29.2 LTS (ou versão superior LTS)

## 4. Clonando o repositório de back-end do projeto BACKEND USER

- Clonar o repositório

  - git clone <endereço-do-repositório>

  - Abrir a pasta clonada
    <br /><br />

## 5. Configurações

Configure o arquivo .env de acordo com as especificações desejadas

DATABASE_HOST: O endereço IP ou o nome de host do servidor onde o banco de dados PostgreSQL está hospedado.

DATABASE_PORT: A porta na qual o servidor PostgreSQL está ouvindo conexões. O padrão para o PostgreSQL é 5432.

DATABASE_NAME: O nome do banco de dados que a aplicação está configurada para usar.

DATABASE_USER: O nome de usuário usado para autenticar a conexão com o banco de dados PostgreSQL.

DATABASE_PASSWORD: A senha associada ao usuário do banco de dados especificado.

DATABASE_MY_SYNC: Uma variável que indica se a sincronização personalizada com o banco de dados está ativada ou não.

HOST: O endereço IP ou o nome de host no qual o servidor da aplicação está sendo executado.

PORT: A porta na qual o servidor da aplicação irá rodar.

NODE_ENV: O ambiente de execução da aplicação. Neste caso, está definido como "produção", indicando que a aplicação está em produção.

SECRET_KEY_ACCESS_TOKEN: Uma chave secreta usada para assinar e verificar tokens de acesso, provavelmente para autenticação ou autorização na aplicação. Esta chave é importante para garantir a segurança dos tokens de acesso gerados pela aplicação.

- Porta utilizada no back-end: 3000

## 6. Configuração de deploy back-end do projeto BACKEND USER usando o Docker

Abra o terminal de comando e navegue até pasta do projeto e execute:

```sh
$ cd <diretorio_do_seu_projeto>
$ docker compose up -d --build
```

Após o container ser criado, utilize o comando abaixo para ver os logs do contêiner:

```sh
$ docker logs <id_do_container> -f
```

Executar o comando abaixo para iniciar o projeto Backend User.

```sh
yarn start
```

## 7. Utilizando o Swagger

Para acessar a documentação das rotas, acesse a url:

```bash
http://<endereço_do_backend>:<porta_do_backend>/swagger
```

#

# Observações

- Neste projeto, utilizei no backend DDD, conceitos de Clean Architecture e SOLID.
