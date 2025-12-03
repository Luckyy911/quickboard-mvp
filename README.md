# QuickBoard

Internal dashboard for team updates. Like Padlet but simpler.

## What it does

- Post updates with title, description, optional media
- Categories: Product, Research, Marketing, Team
- Pin stuff to the top, star things
- Filter and search
- Daily digest view (top 3 per category)

## Tech

- React + Vite + Tailwind
- Express backend
- JSON file for storage (yeah just a file, it's an MVP)

## Setup

Need Node 18+

```bash
npm install
npm run install-all
npm run dev
```

Frontend: `localhost:3000` | Backend: `localhost:3001`

## API

```
GET    /api/posts              # ?tag= or ?search= work too
POST   /api/posts
PATCH  /api/posts/:id
DELETE /api/posts/:id
```

## Usage

Fill out form → posts show up. Click categories to filter, search bar to find stuff. Pin keeps things at top, star marks favorites. Daily Digest tab shows latest 3 per category.

## Customizing

Want different categories? Edit CreatePostForm.jsx, DigestView.jsx, and PostCard.jsx (for tag colors).

Styling is Tailwind - edit tailwind.config.js if you want.

## Future stuff

- [ ] Auth
- [ ] Comments
- [ ] Actual database
- [ ] Email notifications maybe
- [ ] File uploads

## Why this architecture?

Simple client-server with JSON storage. Fast to build, easy to debug, simple to migrate later. Works fine for small teams.

React for UI, Express for API, Axios connects them. Each component does one thing. Pretty standard.

### Performance note

Loads all posts every time right now. Fine for <100 posts. If it grows, add pagination. TODO: debounce search.

## Troubleshooting

**Port in use?**
Change PORT in server/index.js or vite.config.js

**CORS errors?**
Make sure backend runs on 3001

**Posts not loading?**
Check if server is running, look at console

## License

MIT

---

Built for internal use
