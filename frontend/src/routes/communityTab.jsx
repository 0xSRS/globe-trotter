import React, { useState } from 'react';
import Logo from '../components/Logo';
import { 
  Search, 
  Layers, 
  Filter, 
  ArrowUpDown, 
  Heart, 
  MessageSquare, 
  Share2, 
  Send, 
  Sparkles, 
  ArrowLeft, 
  Sun, 
  Moon, 
  User, 
  MapPin, 
  Compass, 
  Image as ImageIcon,
  Plus
} from 'lucide-react';

const CommunityTab = ({ 
  user = { name: "Explorer", avatar: null },
  onBackToMain,
  onNavigateToProfile
}) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [groupBy, setGroupBy] = useState('Topic');
  const [sortBy, setSortBy] = useState('Top');
  const [newPostContent, setNewPostContent] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock community posts matching Screen 10 layout (Avatar on Left + Post Card on Right)
  const [posts, setPosts] = useState([
    {
      id: 101,
      author: {
        name: "Elena Rostova",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        location: "Geneva, Switzerland"
      },
      timeAgo: "2 hours ago",
      tripTag: "Patagonia Glacial Crossing",
      content: "Just wrapped up an incredible 8-day traverse through the Fitz Roy massif! If you're doing this route in October, make sure to book the Laguna de los Tres early morning shuttle to catch the alpine glow.",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80",
      likes: 48,
      isLiked: false,
      commentsCount: 14,
      comments: [
        { user: "Marcus Chen", text: "Did you need microspikes for the final climb?" },
        { user: "Elena Rostova", text: "Yes! Essential for the top 300m above the tree line." }
      ]
    },
    {
      id: 102,
      author: {
        name: "Kaito Tanaka",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
        location: "Kyoto, Japan"
      },
      timeAgo: "5 hours ago",
      tripTag: "Kyoto Autumn Temples",
      content: "Hidden gem alert: Skip the main crowd at Kiyomizu-dera and head up to Shoren-in during dusk illumination. The bamboo forest courtyard has an ambient blue light display that is unmatched.",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80",
      likes: 82,
      isLiked: true,
      commentsCount: 21,
      comments: []
    },
    {
      id: 103,
      author: {
        name: "Liam O'Connor",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
        location: "Dublin, Ireland"
      },
      timeAgo: "Yesterday",
      tripTag: "Nordic Fjord Route",
      content: "Electric ferry transit between Flåm and Gudvangen is 100% worth the slight premium over the standard diesel boat. Pure silent cruising through the UNESCO Nærøyfjord.",
      image: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1000&q=80",
      likes: 35,
      isLiked: false,
      commentsCount: 6,
      comments: []
    },
    {
      id: 104,
      author: {
        name: "Sophia Martinez",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
        location: "Valencia, Spain"
      },
      timeAgo: "2 days ago",
      tripTag: "Amalfi Coast Drive",
      content: "Pro tip for Italian coast driving: Rent a compact hybrid rather than an SUV. The cliffside hairpins between Positano and Ravello get tight when regional buses approach.",
      image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80",
      likes: 64,
      isLiked: false,
      commentsCount: 9,
      comments: []
    }
  ]);

  const toggleLike = (id) => {
    setPosts(posts.map(post => {
      if (post.id === id) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const newPost = {
      id: Date.now(),
      author: {
        name: user.name || "Explorer",
        avatar: user.avatar,
        location: "Global Member"
      },
      timeAgo: "Just now",
      tripTag: "Custom Route Log",
      content: newPostContent,
      image: null,
      likes: 0,
      isLiked: false,
      commentsCount: 0,
      comments: []
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
    setShowCreateModal(false);
  };

  return (
    <div className={`min-h-screen w-full transition-colors duration-500 font-sans ${
      isDarkMode ? 'bg-[#090e15] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
    }`}>

      {/* 1. TOP HEADER (Screen 10 Header) */}
      <header className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-colors ${
        isDarkMode ? 'bg-[#0b121c]/90 border-slate-800/80' : 'bg-white/90 border-slate-200 shadow-xs'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <button 
              onClick={onBackToMain}
              className={`p-2 rounded-xl border transition-all cursor-pointer mr-1 ${
                isDarkMode 
                  ? 'bg-slate-800/70 border-slate-700 hover:bg-slate-700 text-slate-300' 
                  : 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-700'
              }`}
              title="Back"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="p-1.5 rounded-2xl border border-slate-700/80 bg-slate-900 flex items-center justify-center">
              <Logo className="w-7 h-7 text-[#EFE5D8]" />
            </div>
            <div>
              <span className="font-serif text-lg font-bold tracking-wider uppercase">GlobalTrotter</span>
              <p className="text-[9px] uppercase font-mono tracking-widest text-slate-400">Screen 10 — Community Hub</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                isDarkMode 
                  ? 'bg-slate-800/80 border-slate-700 text-amber-300 hover:bg-slate-700' 
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 shadow-xs'
              }`}
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Circular Profile Button */}
            <button
              onClick={onNavigateToProfile}
              className={`relative w-10 h-10 rounded-full border-2 transition-all duration-200 flex items-center justify-center overflow-hidden cursor-pointer hover:scale-105 active:scale-95 shadow-md ${
                isDarkMode 
                  ? 'border-teal-500/50 bg-slate-900 hover:border-teal-400' 
                  : 'border-teal-600/40 bg-white hover:border-teal-600'
              }`}
              title="Open Profile"
            >
              {user.avatar ? (
                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className={`w-5 h-5 ${isDarkMode ? 'text-teal-400' : 'text-teal-600'}`} />
              )}
            </button>
          </div>

        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* 2. CONTROLS BAR: Search, Group by, Filter, Sort by */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          <div className={`relative flex-1 flex items-center rounded-2xl border transition-colors ${
            isDarkMode 
              ? 'bg-[#0f1722]/80 border-slate-800 focus-within:border-teal-400' 
              : 'bg-white border-slate-200 focus-within:border-teal-600 shadow-xs'
          }`}>
            <Search className="w-4 h-4 ml-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search community tips, activities, routes, or members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-3 bg-transparent text-xs sm:text-sm outline-none placeholder-slate-400 font-medium"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <button 
              onClick={() => setGroupBy(groupBy === 'Topic' ? 'Region' : 'Topic')}
              className={`inline-flex items-center gap-2 px-4 py-3 rounded-2xl border text-xs font-medium backdrop-blur-md transition-all cursor-pointer shrink-0 ${
                isDarkMode 
                  ? 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-200' 
                  : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700 shadow-xs'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-teal-400" />
              <span>Group by: {groupBy}</span>
            </button>

            <button 
              className={`inline-flex items-center gap-2 px-4 py-3 rounded-2xl border text-xs font-medium backdrop-blur-md transition-all cursor-pointer shrink-0 ${
                isDarkMode 
                  ? 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-200' 
                  : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700 shadow-xs'
              }`}
            >
              <Filter className="w-3.5 h-3.5 text-amber-400" />
              <span>Filter</span>
            </button>

            <button 
              onClick={() => setSortBy(sortBy === 'Top' ? 'Recent' : 'Top')}
              className={`inline-flex items-center gap-2 px-4 py-3 rounded-2xl border text-xs font-medium backdrop-blur-md transition-all cursor-pointer shrink-0 ${
                isDarkMode 
                  ? 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-200' 
                  : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700 shadow-xs'
              }`}
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-indigo-400" />
              <span>Sort by: {sortBy}</span>
            </button>

            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-medium transition-all cursor-pointer shrink-0 shadow-lg shadow-teal-600/20"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Share Trip Experience</span>
            </button>
          </div>

        </div>

        {/* 3. TWO-COLUMN LAYOUT: Main Feed + Wireframe Annotation Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT/CENTER: Community Feed (Avatar on Left + Post Card on Right) */}
          <div className="lg:col-span-8 space-y-6">
            
            <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-teal-400" />
                <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight">
                  Community tab
                </h2>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {posts.length} Active Stories
              </span>
            </div>

            {/* Posts List */}
            <div className="space-y-6">
              {posts.map((post) => (
                <div key={post.id} className="flex items-start gap-4 sm:gap-5">
                  
                  {/* Left Circle: Author Avatar (Wireframe Circle Stack) */}
                  <div className="shrink-0 pt-1">
                    <div className={`w-11 h-11 sm:w-13 sm:h-13 rounded-full border-2 overflow-hidden flex items-center justify-center shadow-md ${
                      isDarkMode 
                        ? 'border-teal-500/50 bg-slate-900 text-teal-400' 
                        : 'border-teal-600/40 bg-slate-100 text-teal-600'
                    }`}>
                      {post.author.avatar ? (
                        <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-5 h-5" />
                      )}
                    </div>
                  </div>

                  {/* Right Box: Post Card Container (Wireframe Rectangle Box) */}
                  <div className={`flex-1 rounded-3xl border p-5 sm:p-6 transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-[#0f1722]/80 border-slate-800 hover:border-slate-700 shadow-xl' 
                      : 'bg-white border-slate-200 shadow-sm'
                  }`}>
                    
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-800/40">
                      <div>
                        <h4 className="text-sm sm:text-base font-bold font-serif">{post.author.name}</h4>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-amber-400" />
                            {post.author.location}
                          </span>
                          <span>•</span>
                          <span>{post.timeAgo}</span>
                        </div>
                      </div>

                      <span className="px-3 py-1 rounded-full text-[10px] font-mono font-medium border border-teal-500/30 bg-teal-500/10 text-teal-400">
                        {post.tripTag}
                      </span>
                    </div>

                    {/* Post Content */}
                    <p className="mt-3.5 text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                      {post.content}
                    </p>

                    {/* Attached Photo */}
                    {post.image && (
                      <div className="mt-4 h-56 sm:h-64 rounded-2xl overflow-hidden border border-slate-800">
                        <img src={post.image} alt="Trip capture" className="w-full h-full object-cover hover:scale-102 transition-transform duration-500" />
                      </div>
                    )}

                    {/* Post Footer Actions */}
                    <div className="mt-5 pt-3 border-t border-slate-800/50 flex items-center justify-between text-xs text-slate-400">
                      <div className="flex items-center gap-5">
                        <button 
                          onClick={() => toggleLike(post.id)}
                          className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                            post.isLiked ? 'text-rose-500 font-semibold' : 'hover:text-rose-400'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-rose-500' : ''}`} />
                          <span>{post.likes}</span>
                        </button>

                        <button className="flex items-center gap-1.5 hover:text-teal-400 transition-colors cursor-pointer">
                          <MessageSquare className="w-4 h-4" />
                          <span>{post.commentsCount} Comments</span>
                        </button>
                      </div>

                      <button className="hover:text-slate-200 transition-colors cursor-pointer p-1">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>

                </div>
              ))}
            </div>

          </div>

          {/* RIGHT SIDEBAR: Wireframe Annotation & Exploration Guide */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Box matching Wireframe Text Annotation */}
            <div className={`p-6 rounded-3xl border backdrop-blur-xl transition-all ${
              isDarkMode ? 'bg-[#0f1722]/90 border-slate-800 shadow-xl' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="flex items-center gap-2 mb-3 text-teal-400 font-mono text-xs uppercase tracking-widest">
                <Compass className="w-4 h-4" />
                <span>Community Guide</span>
              </div>
              <h3 className="font-serif text-lg font-bold tracking-tight mb-2">
                Shared Expeditions Hub
              </h3>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                Community section where all the users can share their experience about a certain trip or activity. 
                Using the search, group by, or filter and sort by option, the user can narrow down the result that he is looking for.
              </p>
            </div>

            {/* Quick Community Stats Card */}
            <div className={`p-6 rounded-3xl border ${
              isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">Trending Tags</h4>
              <div className="flex flex-wrap gap-2 text-xs">
                {['#AlpineLakes', '#KyotoTeaWalk', '#FjordKayaking', '#SaharaOverland', '#BudgetStops'].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 hover:border-teal-400 cursor-pointer transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* CREATE POST MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className={`w-full max-w-lg rounded-3xl border p-6 shadow-2xl transition-all ${
            isDarkMode ? 'bg-[#0f1722] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <h3 className="text-lg font-serif font-bold mb-3">Share Your Travel Experience</h3>
            <textarea
              rows={4}
              placeholder="Tell fellow explorers about your route, tips, warnings, or recommendations..."
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              className={`w-full p-3 rounded-2xl border text-xs sm:text-sm outline-none resize-none mb-4 ${
                isDarkMode ? 'bg-slate-950 border-slate-800 text-white focus:border-teal-400' : 'bg-slate-50 border-slate-300 focus:border-teal-600'
              }`}
            />
            <div className="flex items-center justify-between">
              <button 
                type="button"
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-teal-400 cursor-pointer"
              >
                <ImageIcon className="w-4 h-4" />
                <span>Attach Photo</span>
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-xs font-medium hover:bg-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCreatePost}
                  className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-medium transition-all cursor-pointer shadow-md shadow-teal-600/20"
                >
                  Publish Log
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CommunityTab;