import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

export default function DigestView() {
  const [digestData, setDigestData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = ['Product', 'Research', 'Marketing', 'Team'];

  useEffect(() => {
    const fetchDigest = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/posts`);
        const allPosts = response.data;

        const digest = {};
        categories.forEach((category) => {
          const categoryPosts = allPosts
            .filter((post) => post.tag === category)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 3);
          digest[category] = categoryPosts;
        });

        setDigestData(digest);
        setError(null);
      } catch (err) {
        console.error('Error fetching digest:', err);
        setError('Failed to load digest. Make sure the server is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchDigest();
  }, []);

  // Get tag color
  const getTagColor = (tag) => {
    const colors = {
      Product: 'bg-blue-500',
      Research: 'bg-purple-500',
      Marketing: 'bg-green-500',
      Team: 'bg-yellow-500'
    };
    return colors[tag] || 'bg-gray-500';
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Loading digest...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Daily Digest</h2>
        <p className="text-gray-600 mt-1">
          Top 3 most recent posts from each category
        </p>
      </div>

      {/* Grid of categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <div
            key={category}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            {/* Category Header */}
            <div className={`${getTagColor(category)} text-white px-6 py-4`}>
              <h3 className="text-lg font-semibold">{category}</h3>
              <p className="text-sm opacity-90">
                {digestData[category]?.length || 0} recent post(s)
              </p>
            </div>

            {/* Category Posts */}
            <div className="p-6">
              {digestData[category]?.length > 0 ? (
                <div className="space-y-4">
                  {digestData[category].map((post, index) => (
                    <div
                      key={post.id}
                      className="border-l-4 border-gray-200 pl-4 py-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-medium text-gray-900 flex-1">
                          {post.title}
                        </h4>
                        {post.starred && (
                          <svg
                            className="w-4 h-4 text-yellow-500 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {post.description}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        {formatDate(post.createdAt)}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <svg
                    className="mx-auto h-10 w-10 text-gray-300"
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
                  <p className="mt-2 text-sm">No posts yet</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
