import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;
const DB_FILE = path.join(__dirname, 'db.json');

// Middleware
app.use(cors());
app.use(express.json());

// Helper function to read database
async function readDB() {
  try {
    if (!existsSync(DB_FILE)) {
      // Initialize with empty posts array
      await writeDB({ posts: [] });
      return { posts: [] };
    }
    const data = await fs.readFile(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database:', error);
    return { posts: [] };
  }
}

// Helper function to write to database
async function writeDB(data) {
  try {
    await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing to database:', error);
    throw error;
  }
}

// GET /api/posts - Get all posts with optional filtering
app.get('/api/posts', async (req, res) => {
  try {
    const db = await readDB();
    let posts = db.posts;

    // Filter by tag if provided
    const { tag, search } = req.query;

    if (tag) {
      posts = posts.filter(post => post.tag === tag);
    }

    // Search in title and description
    if (search) {
      const searchLower = search.toLowerCase();
      posts = posts.filter(post =>
        post.title.toLowerCase().includes(searchLower) ||
        post.description.toLowerCase().includes(searchLower)
      );
    }

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// POST /api/posts - Create a new post
app.post('/api/posts', async (req, res) => {
  try {
    const { title, description, media, tag } = req.body;

    // Validate required fields
    if (!title || !description || !tag) {
      return res.status(400).json({ error: 'Title, description, and tag are required' });
    }

    const db = await readDB();

    // Create new post object
    const newPost = {
      id: Date.now().toString(), // Simple ID generation
      title,
      description,
      media: media || '',
      tag,
      pinned: false,
      starred: false,
      createdAt: new Date().toISOString()
    };

    db.posts.unshift(newPost); // Add to beginning of array
    await writeDB(db);

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// PATCH /api/posts/:id - Update a post (pin/star)
app.patch('/api/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const db = await readDB();
    const postIndex = db.posts.findIndex(post => post.id === id);

    if (postIndex === -1) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Update the post
    db.posts[postIndex] = {
      ...db.posts[postIndex],
      ...updates,
      id, // Ensure ID doesn't change
      createdAt: db.posts[postIndex].createdAt // Preserve creation date
    };

    await writeDB(db);
    res.json(db.posts[postIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update post' });
  }
});

// DELETE /api/posts/:id - Delete a post
app.delete('/api/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = await readDB();

    const postIndex = db.posts.findIndex(post => post.id === id);

    if (postIndex === -1) {
      return res.status(404).json({ error: 'Post not found' });
    }

    db.posts.splice(postIndex, 1);
    await writeDB(db);

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`QuickBoard server running on http://localhost:${PORT}`);
});
