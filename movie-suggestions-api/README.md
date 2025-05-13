# Movie Suggestions API

## Overview

A modern RESTful API built with Express.js and TypeScript for movie suggestions. Features JWT authentication, PostgreSQL (Prisma ORM), Redis caching and auto-generated Swagger documentation.

## Features

- ✨ TypeScript with strong typing
- 📚 Auto-generated Swagger docs
- 🔒 JWT auth and CORS enabled
- 💾 PostgreSQL with Prisma ORM
- ⚡ Redis caching
- 🚀 Hot-reload development
- 🧪 Jest unit testing
- 🐳 Docker containerization

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Configure environment:
   Create `.env` file in root with:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/movie_suggestions
REDIS_URL=redis://localhost:6379
AUTH_SECRET=your_secret_key
TMBD_TOKEN=your_tmdb_token
SALT_ROUNDS=10
EMAIL=your_email@example.com
PASS=your_email_password
APP_URL=http://localhost:3000
```

3. Run migrations:

```bash
npx prisma migrate dev
npx prisma generate
```

4. Start server:

```bash
npm start
```

## Available Scripts

- `npm start` - Start server
- `npm test` - Run tests
- `npm run swagger` - Generate docs

## Project Structure

```
src/
├── app.ts              # Entry point
├── config/             # Configurations
├── core/
│   ├── docs/           # Swagger config
│   ├── errors/         # Error classes
│   ├── events/         # Events
│   ├── middlewares/    # Express middleware
│   └── utils/          # Utilities
├── modules/            # Application modules
│   ├── auth/          # Authentication
│   ├── movie/         # Movies
│   ├── reaction/      # Reactions
│   └── user/          # Users
└── routes/            # API routes
```

## API Endpoints

### Auth

- `POST /auth/login` - User login
- `GET /auth/verify-email` - Email verification
- `POST /auth/recover-password` - Password recovery
- `POST /auth/redefine-password` - Password reset

### Users

- `POST /user` - Create user
- `GET /user/:email` - Get user by Email
- `PUT /user/:id` - Update user
- `DELETE /user/:id` - Delete user

### Movies

- `GET /movie/search/:name` - Search movies by name
- `GET /movie/user/:userId` - Movie recommendations
- `GET /movie/trending` - Trending movies

### Reactions

- `POST /reaction` - Create reaction
- `GET /reaction/:userId` - List liked movies

## Documentation

Access Swagger docs at: `http://localhost:3000/docs`

## License

ISC
