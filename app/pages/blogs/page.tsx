"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BlogPost } from "@/lib/blog";
import FooterConnect from "@/components/footer-connect";
import BottomEditorialLine from "@/components/ui/bottom-editorial-line";

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

  const getCategoryColor = (category: string) => {
    const colors = {
      'Gap Year': 'emerald',
      'Career': 'blue', 
      'Life': 'orange',
      'Engineering': 'teal',
      'General': 'purple'
    };
    return colors[category as keyof typeof colors] || 'blue';
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-lg font-light text-white/80 hover:text-white transition-colors">
              ← Anderson Chen
            </Link>
            
            <div className="flex items-center space-x-8">
              <nav className="hidden md:flex space-x-6 text-sm font-light text-white/60">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
                <Link href="/pages/arts" className="hover:text-white transition-colors">Arts</Link>
              </nav>
              
              <div className="text-sm font-light text-white/60">
                <span className="text-blue-300">Blog</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6"
            >
              <span className="italic">Thoughts</span> & Stories
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed"
            >
              Reflections on my journey through engineering, art, sports, and life. 
              Sharing experiences, lessons learned, and thoughts on navigating your twenties.
            </motion.p>
          </div>

          {/* Category Filter */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center mb-12"
          >
            <div className="flex flex-wrap items-center gap-2 bg-white/5 rounded-full p-1 backdrop-blur-sm">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 md:px-6 py-2 md:py-3 rounded-full text-sm font-light transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-white text-black shadow-lg"
                      : "text-white/60 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="px-6 md:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          
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
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="mb-20"
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                    <h2 className="text-xl md:text-2xl font-light text-white/80">Featured Post</h2>
                  </div>
                  
                  <Link href={`/blog/${featuredPost.slug}`}>
                    <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 p-8 md:p-12 hover:border-emerald-500/40 transition-all duration-500">
                      <div className="relative z-10">
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-sm font-light">
                            {featuredPost.category}
                          </span>
                          <span className="text-white/40 text-sm">
                            {new Date(featuredPost.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })} • {featuredPost.readTime} min read
                          </span>
                        </div>
                        
                        <h1 className="text-2xl md:text-4xl font-light mb-4 group-hover:text-emerald-300 transition-colors duration-300">
                          {featuredPost.title}
                        </h1>
                        
                        <p className="text-white/60 text-lg leading-relaxed mb-6 max-w-3xl">
                          {featuredPost.excerpt}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {featuredPost.tags.map((tag) => (
                            <span key={tag} className="px-3 py-1 rounded-full bg-white/5 text-white/50 text-xs">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Decorative Elements */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all duration-500"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-400/5 rounded-full blur-2xl"></div>
                    </div>
                  </Link>
                </motion.div>
              )}

              {/* Regular Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                  {regularPosts.map((post, index) => {
                    const categoryColor = getCategoryColor(post.category);
                    return (
                      <motion.div
                        key={post.slug}
                        layout
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 30 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Link href={`/blog/${post.slug}`}>
                          <div className="group relative h-full">
                            <div className="relative overflow-hidden rounded-2xl border border-white/10 hover:border-white/20 p-6 h-full transition-all duration-500 hover:scale-[1.02] bg-white/5">
                              
                              {/* Liquid Glass Hover Effect */}
                              <div className={`absolute inset-0 bg-gradient-to-br from-${categoryColor}-500/5 via-${categoryColor}-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}></div>
                              <div className={`absolute inset-0 border border-${categoryColor}-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}></div>
                              
                              {/* Date Badge */}
                              <div className="relative z-10 flex justify-between items-start mb-4">
                                <span className={`px-2 py-1 rounded-full bg-${categoryColor}-400/10 text-${categoryColor}-400 text-xs font-medium border border-${categoryColor}-400/20`}>
                                  {post.category}
                                </span>
                                <span className="text-white/40 text-xs">
                                  {new Date(post.date).toLocaleDateString('en-US', { 
                                    month: 'short', 
                                    day: 'numeric' 
                                  })}
                                </span>
                              </div>

                              {/* Content */}
                              <div className="relative z-5 flex-col h-full">
                                <h3 className="text-lg md:text-xl font-light leading-tight mb-3 group-hover:text-white/90 transition-colors flex-grow">
                                  {post.title}
                                </h3>
                                
                                <p className="text-white/60 text-sm leading-relaxed mb-4 line-clamp-3">
                                  {post.excerpt}
                                </p>

                                {/* Footer */}
                                <div className="flex items-center justify-between">
                                  <span className="text-white/40 text-xs">
                                    {post.readTime} min read
                                  </span>
                                  
                                  <div className="flex items-center gap-1 text-white/40 group-hover:text-white/80 transition-colors">
                                    <span className="text-xs">Read more</span>
                                    <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                  </div>
                                </div>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-1 mt-4">
                                  {post.tags.slice(0, 3).map((tag) => (
                                    <span key={tag} className="px-2 py-1 rounded-full bg-white/5 text-white/40 text-xs group-hover:text-white/50 transition-colors">
                                      #{tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              
                              {/* Subtle decorative gradient */}
                              <div className="absolute bottom-0 right-0 w-16 h-16 bg-white/5 rounded-full blur-2xl"></div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
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

      {/* Bottom Editorial Line */}
      
      <BottomEditorialLine />   

      {/* Footer CTA */}
      <section className="mt-10 pt-2 pb-10">
        <FooterConnect /> 
      </section>
    </div>
  );
}

export default Blogs;
