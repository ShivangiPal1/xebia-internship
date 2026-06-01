# Campus Lost & Found System

A beginner-friendly full-stack CRUD web application where students can report lost or found campus items, browse all posts, update details, delete posts, and mark items as resolved.

## Features

- Add lost, found, or resolved items
- View all posted items in a responsive grid
- Search items by title
- Filter items by status
- View item details
- Edit item details
- Delete items
- Mark items as resolved
- Toast notifications, loading states, and empty states
- MongoDB Atlas ready
- Frontend deployable on Vercel
- Backend deployable on Render

## Tech Stack

**Frontend:** React.js, Vite, React Router DOM, Axios, Tailwind CSS, React Hot Toast  
**Backend:** Node.js, Express.js  
**Database:** MongoDB with Mongoose  
**Deployment:** Vercel, Render, MongoDB Atlas

## Folder Structure

```text
campus-lost-found/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── .gitignore
└── README.md
```

## Installation

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd campus-lost-found
```

### 2. Set up the backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Update `backend/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
```

### 3. Set up the frontend

Open a new terminal:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Update `frontend/.env` if needed:

```env
VITE_API_URL=http://localhost:5001/api
```

The frontend runs at `http://localhost:5173`.

## API Routes

Base URL locally:

```text
http://localhost:5001/api
```

| Method | Route | Description |
| --- | --- | --- |
| GET | `/items` | Get all items |
| GET | `/items/:id` | Get one item |
| POST | `/items` | Create a new item |
| PUT | `/items/:id` | Update an item |
| DELETE | `/items/:id` | Delete an item |

## Item Model

```js
{
  title: String,
  description: String,
  category: String,
  location: String,
  status: "lost" | "found" | "resolved",
  createdAt: Date
}
```

## MongoDB Atlas Setup

1. Create a free MongoDB Atlas account.
2. Create a new project and cluster.
3. Create a database user with a username and password.
4. Add your IP address to Network Access, or use `0.0.0.0/0` for deployment access.
5. Copy the connection string.
6. Paste it into `backend/.env` as `MONGO_URI`.

Example:

```env
MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/campus-lost-found
```

## Deployment Guide

### Backend on Render

1. Push this project to GitHub.
2. Create a new Render Web Service.
3. Select the `backend` folder as the root directory.
4. Set the build command:

```bash
npm install
```

5. Set the start command:

```bash
npm start
```

6. Add environment variables:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
CLIENT_URL=https://your-vercel-app.vercel.app
```

### Frontend on Vercel

1. Create a new Vercel project from the same GitHub repository.
2. Set the root directory to `frontend`.
3. Add this environment variable:

```env
VITE_API_URL=https://your-render-backend.onrender.com/api
```

4. Deploy the project.

## Screenshots

Add screenshots here after running or deploying the project:

```text
screenshots/home.png
screenshots/add-item.png
screenshots/item-details.png
```

## Useful Commands

Backend:

```bash
cd backend
npm run dev
```

Frontend:

```bash
cd frontend
npm run dev
```

Frontend production build:

```bash
cd frontend
npm run build
```

## Project Notes

- No authentication is included.
- No Context API is used.
- API calls are stored in `frontend/src/services/api.js`.
- Backend code follows a simple MVC structure.
- Validation is handled with Mongoose schema rules and Express error middleware.
