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

## 📌 Decisões Arquiteturais

A arquitetura do projeto foi pensada para garantir **baixo acoplamento**, **alta coesão** e **facilidade de evolução**, seguindo princípios de DDD (Domain Driven Design) e Clean Architecture.

### 🧱 Separação em camadas

O sistema está dividido em camadas bem definidas:

- **Domain**: contém as entidades e regras de negócio puras, sem dependência de frameworks
- **Application**: responsável por orquestrar os casos de uso do sistema
- **Infrastructure**: implementação de detalhes técnicos (banco de dados, ORM, mensageria)
- **Presentation**: camada de entrada da aplicação (controllers e DTOs)

Essa separação permite que regras de negócio permaneçam isoladas e independentes de tecnologia.

---

### ⚙️ Use Cases como ponto central

Cada ação do sistema é representada por um **Use Case**, como:

- `CreateProduct`
- `AddCategoryToProduct`
- `ActivateProduct`

Isso garante:

- Clareza na intenção do código
- Facilidade de testes
- Baixo acoplamento entre camadas

---

### 🗄️ Repository Pattern

Foi utilizado o padrão de repositório para abstrair o acesso a dados.

- Interfaces são definidas na camada de **Application**
- Implementações ficam na **Infrastructure**

Isso permite trocar a tecnologia de persistência sem impactar a regra de negócio.

---

### 🔄 Mapper Layer

Para evitar acoplamento com o ORM (TypeORM), foi criada uma camada de **mapeamento** entre:

- Entidades de domínio
- Entidades de persistência (ORM)

---

### 📦 Modularização por contexto

O sistema é dividido em módulos por domínio:

- `Product`
- `Category`
- `Audit`

## ⚙️ Estratégia de Mensageria / Auditoria

A auditoria do sistema foi projetada utilizando uma abordagem baseada em **eventos de domínio (Domain Events)**, permitindo desacoplar completamente a regra de negócio da geração de logs.

---

### 🔁 Fluxo de funcionamento

O fluxo de auditoria segue os seguintes passos:

1. Um **Use Case** executa uma ação relevante (ex: criação de produto)
2. A entidade ou o caso de uso gera um **Domain Event**
3. O evento é publicado através de um **Event Bus interno**
4. O módulo de **Audit** consome esse evento
5. Um **consumer** persiste as informações no banco de dados

---

### 📌 Exemplos de eventos

- `ProductCreatedEvent`
- `ProductActivatedEvent`
- `ProductArchivedEvent`
- `CategoryCreatedEvent`
- `ProductAddCategoryEvent`

---

### 🎯 Objetivos da abordagem

Essa estratégia foi adotada para:

- **Desacoplar a auditoria da regra de negócio**
- Evitar efeitos colaterais dentro dos Use Cases
- Permitir evolução independente do mecanismo de auditoria
- Facilitar integração futura com mensageria externa (Kafka, RabbitMQ)

---

### 🚀 Benefícios

- Melhor organização e separação de responsabilidades
- Facilidade para adicionar novos consumidores de eventos
- Possibilidade de escalar o processamento de eventos
- Base preparada para arquitetura distribuída

---

### 🔮 Evolução futura

O Event Bus interno pode ser facilmente substituído por um broker externo, como:

- Kafka
- RabbitMQ

Permitindo que o sistema evolua para um modelo mais distribuído sem grandes mudanças na regra de negócio.

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
