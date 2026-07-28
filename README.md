# Leave Management System

A simple full stack Leave Management System made using React, Node.js, Express and MongoDB.

## Features

- Login page (checks user in database)
- Dashboard with leave balance
- Apply for leave
- View leave history
- Admin page to approve or reject leave requests

## Tech Stack

- Frontend: React.js, React Router
- Backend: Node.js, Express.js
- Database: MongoDB (Mongoose)

## Folder Structure

```
leave-management-system/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
└── frontend/
    └── src/
        ├── components/
        ├── pages/
        ├── services/
        └── utils/
```

## Setup Instructions

### 1. Backend Setup

```
cd backend
npm install
```

Create a `.env` file in the `backend` folder (copy from `.env.example`):

```
MONGO_URI=mongodb://localhost:27017/leaveManagementDB
PORT=5000
```

Add a test user in the database:

```
npm run seed
```

This creates a test user:

```
Email: test@example.com
Password: 123456
```

Start the backend server:

```
npm run dev
```

The server runs on `http://localhost:5000`.

### 2. Frontend Setup

Open a new terminal.

```
cd frontend
npm install
npm start
```

The frontend runs on `http://localhost:3000`.

## How to Use

1. Go to `http://localhost:3000`.
2. Login using the test user email and password.
3. Check leave balance on the Dashboard page.
4. Apply for leave and view leave history on the Apply Leave page.
5. Go to the Admin page to approve or reject leave requests.

## API Routes

| Method | Route            | Description             |
|--------|-------------------|--------------------------|
| POST   | /api/login        | Login user               |
| POST   | /api/leave        | Apply for leave          |
| GET    | /api/leave        | Get all leaves           |
| GET    | /api/leave?userId | Get leaves for one user  |
| PUT    | /api/leave/:id    | Update leave status      |
