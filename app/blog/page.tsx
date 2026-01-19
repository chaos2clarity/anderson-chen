"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import BlogCard from "@/components/blog-card";
import { BlogPost } from "@/lib/blog";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'main' | 'micro'>('all');

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await fetch('/api/blog');
        const data = await response.json();
        setPosts(data.posts || []);
      } catch (error) {
        console.error('Error loading blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadPosts();
  }, []);

  const filteredPosts = posts.filter(post => {
    if (filter === 'all') return true;
    if (filter === 'micro') return post.category === 'Lifelong Learner';
    return post.category !== 'Lifelong Learner';
  });

  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center text-white/40 hover:text-white transition-colors mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-5xl font-light text-white mb-4">
                Writing
              </h1>
              <p className="text-white/60 font-light max-w-xl">
                Thoughts on engineering, design, and life as a lifelong learner.
              </p>
            </div>

            {/* Filter Toggle */}
            <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-md text-sm transition-all ${
                  filter === 'all' 
                    ? 'bg-white/10 text-white shadow-sm' 
                    : 'text-white/40 hover:text-white/60'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('main')}
                className={`px-4 py-2 rounded-md text-sm transition-all ${
                  filter === 'main' 
                    ? 'bg-white/10 text-white shadow-sm' 
                    : 'text-white/40 hover:text-white/60'
                }`}
              >
                Essays
              </button>
              <button
                onClick={() => setFilter('micro')}
                className={`px-4 py-2 rounded-md text-sm transition-all ${
                  filter === 'micro' 
                    ? 'bg-white/10 text-white shadow-sm' 
                    : 'text-white/40 hover:text-white/60'
                }`}
              >
                Lifelong Learner
              </button>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {isLoading ? (
            [1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 bg-white/5 rounded-lg animate-pulse border border-white/5 col-span-2"></div>
            ))
          ) : filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`${
                  post.category === 'Lifelong Learner' 
                    ? 'col-span-1' 
                    : 'col-span-2'
                }`}
              >
                <BlogCard post={post} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-white/40">
              No posts found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
