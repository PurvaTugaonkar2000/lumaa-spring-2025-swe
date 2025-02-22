# MyTask Scheduler

MyTask Scheduler is a minimal full-stack task management application that allows users to register, log in, and manage their tasks (create, update, delete). The backend is built with Node.js and PostgreSQL, and the frontend is built with React and TypeScript. Authentication is implemented with JWT and passwords are securely hashed using bcrypt.

---

## Table of Contents

- [Database Setup](#database-setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
  - [Backend](#running-the-backend)
  - [Frontend](#running-the-frontend)
- [Testing Notes](#testing-notes)
- [Salary Expectations](#salary-expectations)
- [Video Demo](#video-demo)
- [Additional Notes](#additional-notes)

---

## Database Setup

1. **Install PostgreSQL:**  
   Ensure PostgreSQL is installed and running on your machine.

2. **Create a Database:**  
   Open your terminal and create a new database (for example, `mytaskscheduler`):
   ```bash
   createdb mytaskscheduler
-- Create Users Table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create Tasks Table
CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  isComplete BOOLEAN DEFAULT false,
  userId INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- (Optional) Add a foreign key constraint linking tasks to users:
ALTER TABLE tasks
ADD CONSTRAINT fk_user
FOREIGN KEY (userId)
REFERENCES users (id)
ON DELETE CASCADE;

## Environment Variables

Environment variables are used to store configuration settings that should not be hard-coded into your source code. In this project, you'll need to configure environment variables for both the backend and (optionally) the frontend.

### Backend Environment Variables

Create a file named `.env` in the **backend** directory. This file should contain the following variables:

A sample `.env` file for the backend might look like this:

```env
PGUSER=your_username
PGHOST=localhost
PGDATABASE=mytaskscheduler
PGPASSWORD=your_password
PGPORT=5432
JWT_SECRET=your_jwt_secret
PORT=3000

