# Mini Collection Management System

A simplified application to manage customer details, payments, real-time notifications, and Excel-based bulk uploads. This project demonstrates a full-stack solution using Next.js (frontend) and Node.js + Prisma (backend) with PostgreSQL as the database. It includes JWT-based authentication, Socket.IO for real-time updates, Tailwind CSS for styling, and Docker Compose for easy setup.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture Diagram](#architecture-diagram)
- [Folder Structure](#folder-structure)
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Running with Docker](#running-with-docker)
- [Local Development](#local-development)
- [Useful Commands](#useful-commands)
- [Swagger/OpenAPI Docs](#swaggeropenapi-docs)
- [Technical Decisions](#technical-decisions)
- [Future Improvements](#future-improvements)
- [License](#license)

## Overview

This Mini Collection Management System provides:

- **Authentication**
  - JWT-based login and registration
- **Customer Management**
  - CRUD operations (name, contact info, outstanding amount, payment status)
  - Bulk upload via Excel (with success/error counts)
  - Basic filtering in the UI
- **Payment Management**
  - Mock endpoint for marking payments completed/pending
  - Real-time updates via Socket.IO
- **Notifications**
  - Real-time WebSocket events for new customers, overdue payments, etc.
- **Responsive UI**
  - Next.js 13 (App Router) + Tailwind CSS
- **Docker Compose**
  - Orchestrate PostgreSQL, the Node.js backend, and the Next.js frontend
- **Swagger/OpenAPI**
  - Interactive docs at `/api-docs` (backend)

## Features

### Authentication System
- JWT-based auth
- Register / Login endpoints
- Protected routes

### Customer Management
- CRUD on customers
- Bulk upload from Excel (Multer + ExcelJS)
- Show import success/error summary
- Filtering by name, payment status

### Payment Management
- Endpoint to mark payments as completed/pending
- Real-time status updates

### Notification System
- WebSocket notifications for new customers, payment updates, etc.
- Dashboard to show live event feed

### Docker
- Full environment in containers (Postgres, backend, frontend)
- One `docker-compose.yml` for everything

### Swagger/OpenAPI
- Document and test backend endpoints easily

## Architecture Diagram
mini-collection-management-system/
├── docker-compose.yml
├── backend/
│ ├── Dockerfile
│ ├── .env.example
│ ├── package.json
│ ├── prisma/
│ │ └── schema.prisma
│ └── src/
│ ├── app.js
│ ├── controllers/
│ ├── routes/
│ ├── middlewares/
│ ├── utils/
│ └── ...
└── frontend/
├── Dockerfile
├── .env.example
├── package.json
├── app/
│ ├── layout.tsx
│ ├── page.tsx
│ └── ...
├── components/
├── context/
├── tailwind.config.js
├── postcss.config.js


## Prerequisites

- Docker + Docker Compose
- (Optional) Node.js (v16+) and npm if running locally without Docker

## Environment Variables

### Backend: `backend/.env`

- `DATABASE_URL`: Points to your Postgres instance
- `JWT_SECRET`: Secret key for signing JWT tokens
- `PORT`: Port the backend listens on (default 4000)

### Frontend: `frontend/.env`

- `NEXT_PUBLIC_BACKEND_URL`: The backend's base URL
- `NEXT_PUBLIC_WS_URL`: The WebSocket URL (often same as backend URL)

## Running with Docker

Recommended to quickly spin up the entire stack.

1. Clone the repository:
   ```bash
   git clone https://github.com/youruser/mini-collection-management-system.git
   cd mini-collection-management-system
   ```
2.Set up environment files:
  backend/.env (match your credentials)
  frontend/.env (ensure the URLs match your backend)
  
3.Build & start all containers:
  ```bash
  docker-compose up --build -d
  ```
4.Apply Prisma migrations (inside backend container):
  ```bash
  docker-compose exec backend npx prisma migrate dev --name init
  ```
5.Access the application:
  Frontend: http://localhost:3000
  Backend: http://localhost:4000
  Swagger (if enabled): http://localhost:4000/api-docs

6.Stop containers:
  ```bash
  docker-compose down
```
