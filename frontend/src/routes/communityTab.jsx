import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import Logo from '../components/Logo';
import { 
  Heart, 
  MessageSquare, 
  Send, 
  Trash2, 
  ArrowLeft, 
  Sun, 
  Moon, 
  Loader2, 
  MessageCircleOff
} from 'lucide-react';

export default function CommunityTab({
  user,
  onBackToMain,
  onNavigateToProfile
}) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [activeCommentPostId, setActiveCommentPostId] = useState(null);
  const [commentInputs, setCommentInputs] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isPosting, setIsPosting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchCommunityPosts = async () => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      const res = await api.community.getPosts();
      
      // Handles both direct array responses and paginated { data: [...] } responses
      const postList = Array.isArray(res) 
        ? res 
        : (res && Array.isArray(res.data) ? res.data : (res && Array.isArray(res.posts) ? res.posts : []));

      setPosts(postList);
    } catch (err) {
      console.error('Community Fetch Error:', err);
      setErrorMessage(err.message || 'Failed to sync community posts from server');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCommunityPosts();
  }, []);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    setIsPosting(true);
    setErrorMessage(null);

    try {
      await api.community.createPost({ content: newPostContent.trim() });
      setNewPostContent('');
      await fetchCommunityPosts();
    } catch (err) {
      setErrorMessage(err.message || 'Failed to submit post to database');
    } finally {
      setIsPosting(false);
    }
  };

  const handleToggleLike = async (postId) => {
    try {
      await api.community.toggleLike(postId);
      await fetchCommunityPosts();
    } catch (err) {
      alert(err.message || 'Failed to toggle like');
    }
  };

  const handleAddComment = async (postId) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;

    try {
      await api.community.addComment(postId, text);
      setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
      await fetchCommunityPosts();
    } catch (err) {
      alert(err.message || 'Failed to post comment');
    }
  };

  const handleDeletePost = async (postId) => {
    if (!confirm('Are you sure you want to remove this post?')) return;
    try {
      await api.community.deletePost(postId);
      await fetchCommunityPosts();
    } catch (err) {
      alert(err.message || 'Failed to delete post');
    }
  };

  return (
    <div className={`min-h-screen w-full font-sans transition-colors duration-500 ${
      isDarkMode ? 'bg-[#090e15] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
    }`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 border-b backdrop-blur-xl ${
        isDarkMode ? 'bg-[#0b121c]/90 border-slate-800' : 'bg-white/90 border-slate-200'
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              type="button"
              onClick={onBackToMain}
              className="p-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer shadow-xs active:scale-95"
              title="Back to Landing"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="p-1.5 rounded-2xl border border-slate-700 bg-slate-900 flex items-center justify-center">
              <Logo className="w-7 h-7 text-[#EFE5D8]" />
            </div>
            <div>
              <span className="font-serif text-lg font-bold tracking-wider uppercase">GlobeTrotter</span>
              <p className="text-[9px] uppercase font-mono tracking-widest text-slate-400">Screen 10 — Community Expedition Feed</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2.5 rounded-xl border cursor-pointer ${
              isDarkMode ? 'bg-slate-800/80 border-slate-700 text-amber-300' : 'bg-white border-slate-200 text-slate-700'
            }`}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {errorMessage && (
          <div className="p-3.5 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-mono text-center">
            {errorMessage}
          </div>
        )}

        {/* Post Creation Box */}
        <form onSubmit={handleCreatePost} className={`p-5 rounded-3xl border ${
          isDarkMode ? 'bg-[#0f1722]/80 border-slate-800 shadow-xl' : 'bg-white border-slate-200 shadow-xs'
        } space-y-3`}>
          <textarea
            placeholder="Share route tips, travel recommendations, or recent discoveries..."
            rows={3}
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl border border-slate-700 bg-slate-900 text-xs sm:text-sm outline-none resize-none focus:border-teal-400 placeholder-slate-500"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isPosting || !newPostContent.trim()}
              className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-50 transition-all shadow-md shadow-teal-600/25 active:scale-95"
            >
              {isPosting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
              <span>Post Update</span>
            </button>
          </div>
        </form>

        {/* Live Feed Display */}
        {isLoading ? (
          <div className="p-16 flex flex-col items-center justify-center gap-3 font-mono text-xs text-teal-400">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span>CONNECTING TO DATABASE FEED...</span>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div 
                  key={post.id} 
                  className={`p-6 rounded-3xl border transition-all ${
                    isDarkMode ? 'bg-[#0f1722]/80 border-slate-800' : 'bg-white border-slate-200'
                  } space-y-4`}
                >
                  {/* Author Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-teal-600/20 border border-teal-500/40 text-teal-400 flex items-center justify-center font-bold text-xs font-mono shrink-0">
                        {post.user?.firstName ? post.user.firstName[0].toUpperCase() : 'E'}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-100">
                          {post.user?.firstName || 'Explorer'} {post.user?.lastName || ''}
                        </h4>
                        <span className="text-[10px] font-mono text-slate-400">
                          {post.createdAt ? new Date(post.createdAt).toLocaleDateString(undefined, { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          }) : 'Just now'}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeletePost(post.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Delete Post"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Post Content */}
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-300 font-light">
                    {post.content}
                  </p>

                  {/* Interaction Bar */}
                  <div className="pt-3 border-t border-slate-800/60 flex items-center gap-5 text-xs font-mono text-slate-400">
                    <button
                      type="button"
                      onClick={() => handleToggleLike(post.id)}
                      className="flex items-center gap-1.5 hover:text-rose-400 transition-colors cursor-pointer"
                    >
                      <Heart className="w-4 h-4 text-rose-500" />
                      <span>{post.likes?.length || 0} Likes</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)}
                      className="flex items-center gap-1.5 hover:text-teal-400 transition-colors cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 text-teal-400" />
                      <span>{post.comments?.length || 0} Comments</span>
                    </button>
                  </div>

                  {/* Comments Section */}
                  {activeCommentPostId === post.id && (
                    <div className="pt-3 space-y-3 border-t border-slate-800/40">
                      <div className="space-y-2">
                        {post.comments && post.comments.length > 0 ? (
                          post.comments.map((c, cIdx) => (
                            <div key={c.id || cIdx} className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800 text-xs">
                              <span className="font-bold text-teal-400 font-mono mr-2">
                                {c.user?.firstName || 'Explorer'}:
                              </span>
                              <span className="text-slate-300 font-light">{c.content}</span>
                            </div>
                          ))
                        ) : (
                          <p className="text-[11px] font-mono text-slate-500 italic">No comments yet. Write a response below.</p>
                        )}
                      </div>

                      <div className="flex gap-2 pt-1">
                        <input
                          type="text"
                          placeholder="Write a comment..."
                          value={commentInputs[post.id] || ''}
                          onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                          className="flex-1 px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-900 text-xs outline-none focus:border-teal-400"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddComment(post.id);
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => handleAddComment(post.id)}
                          className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-mono font-bold cursor-pointer"
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="p-16 text-center border-2 border-dashed border-slate-800 rounded-3xl space-y-3">
                <MessageCircleOff className="w-10 h-10 text-slate-600 mx-auto" />
                <h3 className="font-serif font-bold text-base text-slate-200">No Community Posts Yet</h3>
                <p className="text-xs text-slate-400 font-mono max-w-sm mx-auto">
                  Be the first traveler to share an update, route suggestion, or expedition note above!
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}