# QuickBoard MVP

A lightweight internal dashboard for team updates and collaboration, inspired by Padlet. Built with React, Express, and Tailwind CSS.

![QuickBoard](https://img.shields.io/badge/status-MVP-green)

## Features

- **Posts / Updates**
  - Title and description for each post
  - Optional media field (image URL or link URL)
  - Category tags: Product, Research, Marketing, Team
  - Pin posts to keep them at the top
  - Star favorite posts
  - Date-ordered feed (newest first)

- **Filter & Search**
  - Filter posts by category
  - Search by title or description
  - Real-time filtering

- **Daily Digest View**
  - Shows 3 most recent posts per category
  - Quick overview of team activities

- **Auto Features**
  - Auto-preview images from URLs
  - Auto-link URLs in descriptions
  - Responsive design for all devices

## Tech Stack

- **Frontend:** React 18 + Vite + Tailwind CSS
- **Backend:** Node.js + Express
- **Database:** JSON file storage (MVP)
- **HTTP Client:** Axios

## Project Structure

```
quickboard-mvp/
├── server/
│   ├── index.js          # Express server with CRUD API
│   ├── db.json           # JSON database
│   └── package.json
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CreatePostForm.jsx
│   │   │   ├── Feed.jsx
│   │   │   ├── PostCard.jsx
│   │   │   ├── FilterBar.jsx
│   │   │   └── DigestView.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm installed

### Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd "C:\Users\Sanjana\QuickBoard MVP"
   ```

2. **Install root dependencies:**
   ```bash
   npm install
   ```

3. **Install all dependencies (frontend + backend):**
   ```bash
   npm run install-all
   ```

### Running the Application

**Option 1: Run both frontend and backend together (recommended)**
```bash
npm run dev
```

**Option 2: Run frontend and backend separately**

In one terminal:
```bash
npm run dev:server
```

In another terminal:
```bash
npm run dev:client
```

### Access the Application

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:3001](http://localhost:3001)

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/posts` | Get all posts (supports `?tag=` and `?search=` query params) |
| POST | `/api/posts` | Create a new post |
| PATCH | `/api/posts/:id` | Update a post (pin/star) |
| DELETE | `/api/posts/:id` | Delete a post |

## Usage Guide

### Creating a Post

1. Navigate to the **Feed** tab
2. Fill in the form:
   - **Title:** Short, descriptive title
   - **Description:** Detailed information
   - **Media URL:** (Optional) Image URL or link
   - **Category:** Select from Product, Research, Marketing, or Team
3. Click "Create Post"

### Managing Posts

- **Star:** Click the star icon to mark as favorite
- **Pin:** Click the pin icon to keep at the top of the feed
- **Delete:** Click the trash icon and confirm deletion

### Filtering & Search

- Click category buttons to filter by tag
- Use the search bar to find posts by title or description
- Clear filters/search to show all posts

### Daily Digest

- Navigate to the **Daily Digest** tab
- View the 3 most recent posts from each category
- Great for daily standup or quick team updates

## Development

### Backend Development

The backend uses Node.js with `--watch` flag for auto-reload:
```bash
cd server
npm run dev
```

### Frontend Development

The frontend uses Vite for fast HMR:
```bash
cd client
npm run dev
```

### Building for Production

```bash
cd client
npm run build
```

## Customization

### Adding New Categories

1. Update the categories in [CreatePostForm.jsx](client/src/components/CreatePostForm.jsx)
2. Update the categories in [DigestView.jsx](client/src/components/DigestView.jsx)
3. Update the color mapping in [PostCard.jsx](client/src/components/PostCard.jsx)

### Styling

All styles use Tailwind CSS. Modify [tailwind.config.js](client/tailwind.config.js) to customize the theme.

## Future Enhancements

- [ ] User authentication and permissions
- [ ] Comments and reactions on posts
- [ ] Email notifications for new posts
- [ ] Rich text editor for descriptions
- [ ] File upload for images and documents
- [ ] Analytics and usage tracking
- [ ] Database migration (PostgreSQL/MongoDB)
- [ ] Real-time updates with WebSockets

## Design Rationale

### Why This Architecture?

QuickBoard uses a simple client-server architecture with JSON file storage. This approach prioritizes rapid development and ease of deployment for an MVP while maintaining the flexibility to scale later.

### Key Design Decisions

- **JSON File Storage:** Perfect for MVP - no database setup required, easy to inspect and debug, simple to migrate to a proper database later
- **React + Tailwind:** Rapid UI development with utility-first CSS, responsive by default
- **Component Architecture:** Each feature is isolated in its own component for maintainability and reusability
- **RESTful API:** Standard HTTP methods make the API intuitive and easy to extend

### User Experience Choices

- **Pinned Posts:** Keep important announcements visible without manual sorting
- **Star System:** Lightweight bookmarking without complex organization
- **Category Filters:** Quick navigation without overwhelming the user
- **Daily Digest:** High-level overview for busy team members
- **Auto-linking:** Reduces friction when sharing resources

### Performance Considerations

The current implementation loads all posts on each request, which is fine for an MVP with a small number of posts. As the application grows, consider implementing:
- Pagination for large datasets
- Virtual scrolling for better performance
- Server-side filtering and search
- Caching strategies for frequently accessed data

## Troubleshooting

**Problem: Port already in use**
- Frontend (3000): Change port in [vite.config.js](client/vite.config.js)
- Backend (3001): Change `PORT` constant in [server/index.js](server/index.js)

**Problem: CORS errors**
- Ensure backend is running on port 3001
- Check CORS configuration in [server/index.js](server/index.js)

**Problem: Posts not loading**
- Verify backend server is running
- Check console for API errors
- Ensure [db.json](server/db.json) exists and is valid JSON

## License

MIT License - Feel free to use this project for your team!

## Contributing

This is an MVP project. Feel free to fork and customize for your needs!

---

Built with ❤️ for better team collaboration
