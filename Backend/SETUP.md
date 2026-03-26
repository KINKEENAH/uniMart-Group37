# Backend Setup

## Prerequisites
- Node.js 18+
- PostgreSQL running locally

## Steps

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env
```
Edit `.env` and update:
- `DATABASE_URL` — your local PostgreSQL connection string
- `JWT_SECRET` — any long random string

### 3. Generate Prisma client
```bash
npm run db:generate
```

### 4. Run migrations (creates all tables)
```bash
npm run db:migrate
```

### 5. Start the dev server
```bash
npm run dev
```

API runs on `http://localhost:5000`

---

## Auth Endpoints

| Method | Endpoint | Body |
|--------|----------|------|
| POST | `/api/auth/signup` | `full_name, student_id, email, password` |
| POST | `/api/auth/verify-email` | `user_id, code` |
| POST | `/api/auth/login` | `email, password` |
| POST | `/api/auth/verify-login` | `user_id, code` |
| POST | `/api/auth/resend-otp` | `user_id, type?` |

### Flow
**Signup:** `signup` → get `user_id` → `verify-email` with OTP → receive JWT

**Login:** `login` → get `user_id` → `verify-login` with OTP → receive JWT

> In development (`NODE_ENV=development`), OTP codes are printed to the console instead of being emailed.

---

TO VIEW THE DATABASE IN THE BROWSER INSTEAD OF POSTGRESQL RUN THE COMMAND BELOW
```bash
npm run db:studio    # Visual database browser
