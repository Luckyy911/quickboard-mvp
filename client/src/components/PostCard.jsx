export default function PostCard({ post, onUpdate, onDelete }) {
  const getTimeAgo = (dateString) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffInSeconds = Math.floor((now - postDate) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  const isImageUrl = (url) => {
    if (!url) return false;
    return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url);
  };

  const linkifyText = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  const getTagColor = (tag) => {
    const colors = {
      Product: 'bg-blue-100 text-blue-800',
      Research: 'bg-purple-100 text-purple-800',
      Marketing: 'bg-green-100 text-green-800',
      Team: 'bg-yellow-100 text-yellow-800'
    };
    return colors[tag] || 'bg-gray-100 text-gray-800';
  };

  const handleToggleStar = () => {
    onUpdate(post.id, { ...post, starred: !post.starred });
  };

  const handleTogglePin = () => {
    onUpdate(post.id, { ...post, pinned: !post.pinned });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      onDelete(post.id);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-5 mb-4 border-l-4 ${
      post.pinned ? 'border-blue-500' : 'border-transparent'
    }`}>
      {/* Header: Title and Actions */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
            {post.pinned && (
              <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded">
                Pinned
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2 py-1 rounded-full ${getTagColor(post.tag)}`}>
              {post.tag}
            </span>
            <span className="text-xs text-gray-500">{getTimeAgo(post.createdAt)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 ml-4">
          <button
            onClick={handleToggleStar}
            className={`p-2 rounded hover:bg-gray-100 transition-colors ${
              post.starred ? 'text-yellow-500' : 'text-gray-400'
            }`}
            title={post.starred ? 'Unstar' : 'Star'}
          >
            <svg className="w-5 h-5" fill={post.starred ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </button>

          <button
            onClick={handleTogglePin}
            className={`p-2 rounded hover:bg-gray-100 transition-colors ${
              post.pinned ? 'text-blue-500' : 'text-gray-400'
            }`}
            title={post.pinned ? 'Unpin' : 'Pin'}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L11 4.323V3a1 1 0 011-1zm-5 8.274l-.818 2.552c-.25.78.421 1.567 1.233 1.447l.537-.098-.455.852a1 1 0 01-.757.494l-2.5.374a1 1 0 11-.293-1.978l1.25-.187.818-1.527-2.833-.516a1 1 0 11.362-1.966l2.5.456a1 1 0 01.757.494l.455.852-.537-.098c-.812-.12-.883-.907-.633-1.687l.818-2.552a1 1 0 011.958.588l-.818 2.552z"/>
            </svg>
          </button>

          <button
            onClick={handleDelete}
            className="p-2 rounded hover:bg-red-100 text-red-500 transition-colors"
            title="Delete"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 mb-3 whitespace-pre-wrap">
        {linkifyText(post.description)}
      </p>

      {/* Media Preview */}
      {post.media && (
        <div className="mt-3">
          {isImageUrl(post.media) ? (
            <img
              src={post.media}
              alt="Post media"
              className="max-w-full h-auto rounded-lg max-h-96 object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          ) : (
            <a
              href={post.media}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:underline"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              {post.media}
            </a>
          )}
        </div>
      )}
    </div>
  );
}
