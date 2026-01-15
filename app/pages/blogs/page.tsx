"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BlogPost } from "@/lib/blog";
import FooterConnect from "@/components/footer-connect";

const Blogs = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/blog');
        const data = await response.json();
        setPosts(data.posts || []);
        setCategories(data.categories || ['All']);
      } catch (error) {
        console.error('Error loading blog posts:', error);
        setPosts([]);
        setCategories(['All']);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const getFilteredPosts = () => {
    if (activeCategory === 'All') return posts;
    return posts.filter(post => post.category === activeCategory);
  };

  const filteredPosts = getFilteredPosts();
  const featuredPost = filteredPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/20">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-6 flex justify-between items-center pointer-events-none">
        <Link href="/" className="pointer-events-auto flex items-center gap-2 text-white/40 hover:text-white transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-sm font-light">Back</span>
        </Link>
      </nav>

      {/* Main Content */}
      <main className="pt-32 md:pt-48 px-6 md:px-12 max-w-7xl mx-auto pb-24">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <h1 className="text-6xl md:text-8xl font-light text-white tracking-tight mb-8">
            Writing
          </h1>
          <p className="text-xl text-[#A1A1A1] font-light">
            Thoughts on building, learning, and navigating life
          </p>
        </motion.div>

        {/* Categories */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex gap-4 mb-16 overflow-x-auto no-scrollbar"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`
                px-6 py-2 rounded-full text-sm font-light transition-all duration-300 border
                ${activeCategory === category 
                  ? "bg-white/10 text-white border-white/20" 
                  : "bg-transparent text-[#808080] border-white/5 hover:border-white/20 hover:text-white"}
              `}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Content Area */}
        {isLoading ? (
             <div className="space-y-8 animate-pulse">
               <div className="h-[400px] bg-white/5 rounded-lg border border-white/5"></div>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {[1,2,3].map(i => <div key={i} className="h-64 bg-white/5 rounded-lg border border-white/5"></div>)}
               </div>
             </div>
        ) : (
          <div className="space-y-12">
            
            {/* Featured Post */}
            {featuredPost && (activeCategory === 'All' || featuredPost.category === activeCategory) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Link href={`/blog/${featuredPost.slug}`} className="block group">
                  <div className="border border-white/10 rounded-lg p-8 md:p-12 transition-colors duration-500 hover:border-white/20 bg-[#050505]">
                    
                    {/* Featured Label */}
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-8 h-[1px] bg-[#404040]"></div>
                      <span className="text-xs tracking-widest text-[#808080] uppercase">Featured</span>
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-3 text-sm text-[#808080] mb-6 font-mono">
                      <span>{featuredPost.category}</span>
                      <span>•</span>
                      <span>{new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span>•</span>
                      <span>{featuredPost.readTime} min</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl md:text-5xl font-light text-white mb-6 group-hover:text-white/90 transition-colors">
                      {featuredPost.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-[#A1A1A1] text-lg leading-relaxed max-w-3xl mb-12 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>

                    {/* Read More */}
                    <div className="flex items-center gap-2 text-white/60 group-hover:text-white transition-colors">
                      <span className="text-sm">Read article</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:translate-x-1 transition-transform">
                        <path d="M5 12h14m-6-6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Other Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {regularPosts.map((post, index) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + (index * 0.05) }}
                  >
                    <Link href={`/blog/${post.slug}`} className="block group h-full">
                      <div className="h-full border border-white/10 rounded-lg p-6 md:p-8 hover:border-white/20 bg-[#050505] transition-colors duration-300 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 text-xs text-[#808080] mb-4 font-mono">
                             <span>{post.category}</span>
                             <span>•</span>
                             <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                          </div>
                          
                          <h3 className="text-xl md:text-2xl font-light text-white mb-3 group-hover:text-white/90 transition-colors">
                            {post.title}
                          </h3>
                          
                          <p className="text-[#A1A1A1] text-sm leading-relaxed line-clamp-2">
                            {post.excerpt}
                          </p>
                        </div>

                        <div className="mt-8 flex items-center justify-between">
                           <span className="text-xs text-[#606060] font-mono">{post.readTime} min</span>
                           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/20 group-hover:text-white/60 transition-colors">
                             <path d="M5 12h14m-6-6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
                           </svg>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Empty State */}
            {!isLoading && filteredPosts.length === 0 && (
                 <div className="text-center py-24 border border-white/5 rounded-lg bg-white/[0.02]">
                    <p className="text-white/40 font-light">No posts found.</p>
                 </div>
            )}

          </div>
        )}
      </main>
    </div>
  );
}

export default Blogs;
