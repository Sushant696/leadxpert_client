# LeadXpert – Lead Management System

A modern lead management system designed to help teams capture, organize, track, and convert leads efficiently through structured pipelines, tasks, and activity tracking.

Built with a clean architecture and separation of concerns to support long-term scalability.

---

## Features

- **Authentication & Authorization**
  - User registration and login
  - Role-based access control (future-ready)

- **Lead Management**
  - Create, update, delete leads
  - Assign leads to users
  - Track lead lifecycle and status

- **Pipelines**
  - Custom pipelines with stages
  - Move leads across stages

- **Tasks & Activities**
  - Attach tasks to leads
  - Follow-ups and reminders
  - Activity history per lead

- **Scalable Architecture**
  - Controller → Service → Repository pattern
  - DTO-based data flow
  - Validation at boundaries

---

## 🛠 Tech Stack

### Frontend
- Next.js
- TypeScript
- React Hook Form + Zod
- Tailwind CSS, Shadcn

### Backend
- Node.js
- Express
- TypeScript
- MongoDB (Mongoose)
- Zod (validation)

