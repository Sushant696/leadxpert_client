# LeadXpert – Lead Management System

A full-stack lead management system to help teams capture, organize, and convert leads through customizable pipelines.

## Project Structure

This is a multi-repo project:

- **Frontend (Web)** – You're here! Next.js dashboard for lead management
- **Backend (API)** – [leadXpert_server](https://github.com/Sushant696/leadXpert_server) – Express + MongoDB REST API
- **Mobile App** – [leadXpert](https://github.com/Sushant696/leadXpert) – Flutter mobile client

---

## Features

- **Lead Management** – Create, assign, and track leads through their lifecycle
- **Custom Pipelines** – Build your own sales stages and move leads through them
- **Tasks & Activities** – Set follow-ups, reminders, and track every interaction
- **Team Collaboration** – Invite workspace members, assign leads to teammates
- **Auth & Permissions** – Secure login with role-based access control
- **Dashboard Analytics** – Quick stats on leads, deals, and pipeline health

---

## Tech Stack

**Frontend (Web)**
- Next.js 16 + React 19
- TypeScript
- TanStack Query for data fetching
- Tailwind CSS + Shadcn UI
- Zustand for state management

**Backend**
- Node.js + Express + TypeScript
- MongoDB with Mongoose
- Zod validation
- JWT auth
- Layered architecture (Controller → Service → Repository)

**Mobile**
- Flutter + Dart
- Check the [mobile repo](https://github.com/Sushant696/leadXpert) for details

---

## Getting Started

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Add your backend API URL

# Run dev server
pnpm dev

# Run tests
pnpm test
```

Make sure the backend server is running (see [backend repo](https://github.com/Sushant696/leadXpert_server) for setup)

---