# Mock Interview Platform

A comprehensive platform for AI-powered mock interviews.

## Tech Stack
- **Frontend**: React, Vite, TailwindCSS (optional), Monaco Editor, Framer Motion, Axios, Lucide React
- **Backend**: Node.js, Express, MongoDB (Mongoose), Stripe, JWT
- **AI**: Claude API (Anthropic)

## Setup

### Server
1. Navigate to `server/`
2. Run `npm install`
3. Create a `.env` file with `MONGODB_URI`, `PORT`, `STRIPE_SECRET_KEY`, `CLAUDE_API_KEY`, and `JWT_SECRET`.
4. Run `npm run dev` (using nodemon)

### Client
1. Navigate to `client/`
2. Run `npm install`
3. Run `npm run dev`
