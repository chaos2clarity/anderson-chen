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
    <div className="min-h-screen bg-black text-white">
      {/* Minimal Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="group flex items-center gap-2 text-white/60 hover:text-white transition-all duration-300">
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm font-light">Back</span>
            </Link>
            
            <div className="flex items-center gap-8">
              <nav className="hidden md:flex items-center gap-6 text-sm font-light text-white/40">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <Link href="/pages/arts" className="hover:text-white transition-colors">Arts</Link>
              </nav>
              
              <div className="w-1 h-1 rounded-full bg-white/20"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Title with gradient */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight mb-6">
              <span className="bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent">
                Writing
              </span>
            </h1>
            <p className="text-base md:text-lg text-white/40 font-light max-w-xl">
              Thoughts on building, learning, and navigating life
            </p>
          </motion.div>

          {/* Minimal Category Filter */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3 mb-12 overflow-x-auto pb-2"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-xs font-light whitespace-nowrap transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-white/10 text-white border border-white/20"
                    : "text-white/40 hover:text-white/60 border border-transparent"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="px-6 md:px-12 pb-24">
        <div className="max-w-6xl mx-auto">
          
          {isLoading ? (
            <div className="space-y-8">
              <div className="animate-pulse">
                <div className="h-8 bg-white/10 rounded mb-4 w-32"></div>
                <div className="h-32 bg-white/5 rounded"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map(i => (
                  <div key={i} className="animate-pulse">
                    <div className="h-48 bg-white/5 rounded-2xl"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {featuredPost && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-16"
                >
                  <Link href={`/blog/${featuredPost.slug}`}>
                    <div className="group relative border border-white/10 hover:border-white/20 transition-all duration-500 p-8 md:p-12">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="h-px w-8 bg-white/40"></div>
                        <span className="text-xs text-white/40 uppercase tracking-wider">Featured</span>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 text-xs text-white/40">
                          <span>{featuredPost.category}</span>
                          <span>•</span>
                          <span>{new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          <span>•</span>
                          <span>{featuredPost.readTime} min</span>
                        </div>
                        
                        <h2 className="text-3xl md:text-5xl font-light leading-tight group-hover:text-white/80 transition-colors">
                          {featuredPost.title}
                        </h2>
                        
                        <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-3xl">
                          {featuredPost.excerpt}
                        </p>
                        
                        <div className="flex items-center gap-2 text-white/40 group-hover:text-white/60 transition-colors pt-4">
                          <span className="text-sm">Read article</span>
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}

              {/* Regular Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
                <AnimatePresence>
                  {regularPosts.map((post, index) => (
                    <motion.div
                      key={post.slug}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <Link href={`/blog/${post.slug}`}>
                        <div className="group relative bg-black p-8 md:p-10 h-full hover:bg-white/[0.02] transition-all duration-300">
                          <div className="space-y-4">
                            {/* Meta */}
                            <div className="flex items-center gap-3 text-xs text-white/30">
                              <span>{post.category}</span>
                              <span>•</span>
                              <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                            </div>
                            
                            {/* Title */}
                            <h3 className="text-xl md:text-2xl font-light leading-tight group-hover:text-white/80 transition-colors">
                              {post.title}
                            </h3>
                            
                            {/* Excerpt */}
                            <p className="text-white/40 text-sm leading-relaxed line-clamp-2">
                              {post.excerpt}
                            </p>
                            
                            {/* Footer */}
                            <div className="flex items-center justify-between pt-2">
                              <span className="text-xs text-white/30">{post.readTime} min</span>
                              <svg className="w-4 h-4 text-white/20 group-hover:text-white/40 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </div>
                          </div>
                          
                          {/* Hover indicator */}
                          <div className="absolute left-0 top-0 bottom-0 w-px bg-white/0 group-hover:bg-white/20 transition-all duration-300"></div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Empty State */}
              {!isLoading && filteredPosts.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-center py-16"
                >
                  <div className="text-white/40 mb-4">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-light text-white/60 mb-2">No posts found</h3>
                  <p className="text-white/40 text-sm max-w-md mx-auto">
                    {activeCategory === 'All' 
                      ? 'Add some markdown files to the content/blogs/ directory to see posts here.'
                      : `No posts found in the "${activeCategory}" category. Try selecting a different category.`
                    }
                  </p>
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <section className="mt-24 px-6 md:px-12 pb-16">
        <div className="max-w-6xl mx-auto border-t border-white/5 pt-16">
          <FooterConnect /> 
        </div>
      </section>
    </div>
  );
}

export default Blogs;
