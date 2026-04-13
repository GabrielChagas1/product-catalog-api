<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# 📦 Product Catalog API (NestJS + DDD + Event Driven)

API de catálogo de produtos construída com NestJS, utilizando DDD (Domain Driven Design), arquitetura em camadas, event-driven architecture e um sistema de auditoria baseado em eventos de domínio.

---

# 🚀 Tecnologias

- NestJS
- TypeScript
- TypeORM
- PostgreSQL
- Event-driven architecture (Event Bus interno)
- Jest (testes unitários)
- Docker / Docker Compose
- Class Validator

---

# 🧠 Arquitetura do Projeto

O projeto segue os princípios de **DDD (Domain Driven Design)** + **Clean Architecture**, garantindo separação de responsabilidades, baixo acoplamento e alta testabilidade.

---

## 🏗️ Estrutura de Pastas

```bash
src/
├── domain/          # 🧠 Regras de negócio puras (entities, value objects, domain events)
├── application/     # ⚙️ Casos de uso (orquestração do domínio)
├── infrastructure/  # 🏗️ Implementações externas (DB, ORM, mensageria)
├── presentation/    # 🌐 Camada de entrada (controllers, DTOs)
├── modules/         # 📦 Módulos do NestJS (injeção de dependências)
├── shared/          # 🔄 Código compartilhado (event bus, abstrações)
```

---

# 📌 Decisões arquiteturais

- Domain First: regras de negócio isoladas de framework
- Use Cases: cada ação do sistema é um caso de uso explícito
- Repository Pattern: abstração da persistência
- Mapper Layer: isolamento entre Domain e ORM (TypeORM entities)
- Modules por contexto: category, product, audit

---

# 🧩 Contextos de Domínio

## 📁 Product

Responsável por:

- Criar produtos
- Atualizar produtos
- Ativar / arquivar produtos
- Gerenciar categorias e atributos dinâmicos

---

## 📁 Category

Responsável por:

- Criar categorias
- Atualizar categorias
- Consultar categorias

---

## 📁 Audit

Responsável por:

- Consumir eventos de domínio
- Persistir logs de auditoria

---

# ⚙️ Estratégia de Mensageria / Auditoria

O sistema utiliza um Event Bus interno para desacoplar regras de negócio da auditoria.

---

## 🔁 Fluxo de eventos

- Um Use Case executa uma ação (ex: criar produto)
- O domínio gera um Domain Event
- O EventBus publica o evento
- O módulo de Audit consome o evento
- Um Audit Consumer persiste o log no banco

---

## 📌 Exemplos de eventos

- ProductCreatedEvent
- ProductArchivedEvent
- ProductActivatedEvent
- CategoryCreatedEvent
- ProductAddCategoryEvent

---

## 💡 Benefícios dessa abordagem

- Baixo acoplamento entre módulos
- Auditoria não impacta regra de negócio
- Facilidade de escalabilidade (Kafka/RabbitMQ futuro)
- Permite reprocessamento de eventos

---

# 🗄️ Persistência de Dados

- Utiliza TypeORM
- Mapeamento separado em `infrastructure/persistence/typeorm`
- Entities ORM isoladas do Domain Model
- Repositórios implementam interfaces do domínio

---

# 🧪 Estratégia de Testes

O projeto utiliza Jest:

## ✔ Unit Tests

- Testam Use Cases isoladamente
- Mock de repositórios e EventBus

---

# 🌍 Variáveis de Ambiente

Crie um arquivo `.env` e `.env.test.local` baseado em `.env.example`:

```env
# App
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=product_catalog
```

---

# ▶️ Como rodar o projeto

## 📦 Instalação

```bash
npm install
```

# 🐳 Subir banco (Docker)

```bash
docker-compose up -d
```

# 🚀 Rodar aplicação

```bash
npm run start:dev
```

# 🧪 Rodar testes

```bash
npm run test
```

---
