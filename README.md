# AI-Powered App

A full-stack AI chat application featuring a conversational interface powered by OpenAI's GPT-4o-mini, with product review summarization backed by a MySQL database.

**Live Demo:** [https://ai-powered-app-client.vercel.app/](https://ai-powered-app-client.vercel.app/)

---

## What it does

- Chat with an AI assistant that maintains conversation history across messages
- Summarize product reviews stored in the database using AI
- Clean, responsive chat UI with typing indicators, markdown rendering, and sound notifications

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS v4, shadcn/ui |
| Backend | Bun, Express 5, TypeScript |
| AI | OpenAI SDK (GPT-4o-mini) |
| Database | MySQL + Prisma ORM |
| Deployment | Vercel |

## Project Structure

```
ai-powered-app/
├── packages/
│   ├── client/     # React frontend
│   └── server/     # Express API server
└── api/            # Vercel serverless entry point
```

## Getting Started

**Prerequisites:** [Bun](https://bun.sh) and a MySQL database

1. Clone the repo and install dependencies:

```bash
bun install
```

2. Set up environment variables in `packages/server/.env` (see `.env.example`):

```env
DATABASE_URL="mysql://..."
OPENAI_API_KEY="sk-..."
```

3. Run database migrations:

```bash
cd packages/server && bunx prisma migrate dev
```

4. Start the development server:

```bash
bun run dev
```

The client runs on `http://localhost:5173` and the API on `http://localhost:3000`.
