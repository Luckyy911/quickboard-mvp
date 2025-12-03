import { useState, useEffect } from 'react';
import axios from 'axios';
import CreatePostForm from './CreatePostForm';
import FilterBar from './FilterBar';
import PostCard from './PostCard';

const API_BASE_URL = 'http://localhost:3001/api';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const params = {};
      if (activeFilter) params.tag = activeFilter;
      if (searchTerm) params.search = searchTerm;

      const response = await axios.get(`${API_BASE_URL}/posts`, { params });
      setPosts(response.data);
      setFilteredPosts(sortPosts(response.data));
      setError(null);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load posts. Make sure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const sortPosts = (postsArray) => {
    return [...postsArray].sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // TODO: maybe debounce this?
  useEffect(() => {
    fetchPosts();
  }, [activeFilter, searchTerm]);

  // Create new post
  const handlePostCreated = async (postData) => {
    try {
      await axios.post(`${API_BASE_URL}/posts`, postData);
      await fetchPosts(); // Refresh the feed
    } catch (err) {
      console.error('Error creating post:', err);
      throw err;
    }
  };

  // Update post (pin/star)
  const handlePostUpdate = async (postId, updatedPost) => {
    try {
      await axios.patch(`${API_BASE_URL}/posts/${postId}`, updatedPost);
      await fetchPosts(); // Refresh the feed
    } catch (err) {
      console.error('Error updating post:', err);
      alert('Failed to update post');
    }
  };

  // Delete post
  const handlePostDelete = async (postId) => {
    try {
      await axios.delete(`${API_BASE_URL}/posts/${postId}`);
      await fetchPosts(); // Refresh the feed
    } catch (err) {
      console.error('Error deleting post:', err);
      alert('Failed to delete post');
    }
  };

  // Handle filter change
  const handleFilterChange = (tag) => {
    setActiveFilter(tag);
  };

  // Handle search change
  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Create Post Form */}
      <CreatePostForm onPostCreated={handlePostCreated} />

      {/* Filter Bar */}
      <FilterBar
        onFilterChange={handleFilterChange}
        onSearchChange={handleSearchChange}
      />

      {/* Posts Feed */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading posts...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-12 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No posts found</h3>
          <p className="mt-2 text-gray-500">
            {searchTerm || activeFilter
              ? 'Try adjusting your filters or search term'
              : 'Create your first post to get started!'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onUpdate={handlePostUpdate}
              onDelete={handlePostDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
