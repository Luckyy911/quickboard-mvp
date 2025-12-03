# QuickBoard

Internal dashboard for team updates - like Padlet but simpler.

## Setup

Need Node 18+

```bash
npm install
npm run install-all
npm run dev
```

Frontend: `localhost:3000` | Backend: `localhost:3001`

## What I Built

Dashboard for posting team updates with:
- Posts with title, description, optional media URLs
- Categories: Product, Research, Marketing, Team
- Pin important posts, star favorites
- Filter by category and search
- Daily digest view (top 3 per category)

Built with React + Vite + Tailwind on frontend, Express backend, JSON file for data.

## Why

Needed something simpler than Slack threads but faster than email for team updates. JSON storage keeps it lightweight for MVP - can migrate to real DB later if needed.

## Known Issues

- Search isn't debounced (TODO)
- Loads all posts every time (fine for <100 posts, needs pagination later)
- No auth
- JSON file could corrupt on server crash

## Stretch Goals

- Authentication
- Comments on posts
- Email notifications
- File uploads
- PostgreSQL migration
