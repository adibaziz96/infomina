# Infomina Member Management Application

NodeJS + ExpressJS + Vue3

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Database Seeding](#database-seeding)
- [Running the Project](#running-the-project)
- [API Endpoints](#api-endpoints)
- [Notes](#notes)

---

## Features

- User authentication (login/logout)
- Member CRUD operation
- Searching data function
- Responsive Vue 3 frontend using Composition API

---

## Requirements

- Node.js >= 23
- Express.js
- NPM / Yarn
- jsonwebtoken
- dotenv
- Database (choose one):
    MySQL ≥ 8.0
    PostgreSQL ≥ 13
    SQLite (for development)

- Optional:
    Sequelize / Prisma ORM
    Postman / Insomnia (API testing)

---

## Installation

Clone the repository:

```bash
git clone https://github.com/adibaziz96/infomina.git
cd infomina
```

---

## Backend Setup

Install dependencies:

```bash
cd backend
npm install
```

Copy .env.example to .env:

```bash
cp .env.example .env
```

Set database, jwt and port in .env:

```bash
PORT=3000
DB_HOST=localhost
DB_NAME=infomina_db
DB_USER=root
DB_PASSWORD=
JWT_SECRET=supersecret
```

Run the project:

```bash
npm run dev
```

---

## Frontend Setup

Navigate to frontend folder:

```bash
cd frontend
```

Install Node dependencies:

```bash
npm install
```

Copy .env.example to .env:

```bash
cp .env.example .env
```

Run the project:

```bash
npm run dev
```

---

## API Endpoints

| Method | Endpoint                | Description                   |
|--------|-------------------------|-------------------------------|
| POST   | `/api/login`            | Login user                    |
| GET    | `/api/member`           | Get all member                |
| POST   | `/api/member`           | Create new member             |
| GET    | `/api/member/:id`       | Get member by id              |
| PUT    | `/api/member/:id`       | Update member by id           |
| DELETE | `/api/member/:id`       | Delete member by id           |

---
