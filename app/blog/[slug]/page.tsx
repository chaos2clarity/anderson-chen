"use client";

import { useState, useEffect, use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { marked } from 'marked';
import { BlogPost } from '@/lib/blog';

// Configure marked options
marked.setOptions({
  breaks: true,
  gfm: true,
});

// We'll need to make an API call since this is client-side
async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const response = await fetch(`/api/blog/${slug}`);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  // Unwrap the params Promise using React.use()
  const resolvedParams = use(params);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
      const blogPost = await getBlogPost(resolvedParams.slug);
      if (!blogPost) {
        notFound();
      }
      setPost(blogPost);
      setLoading(false);
    }
    loadPost();
  }, [resolvedParams.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-400"></div>
      </div>
    );
  }

  if (!post) return notFound();

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

  const categoryColor = getCategoryColor(post.category);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 p-6 md:p-8 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <Link href="/" className="text-sm font-light text-white/80 hover:text-white transition-colors">
            Anderson Chen's Studio
          </Link>
          
          <Link 
            href="/pages/blogs" 
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm">Back to Blog</span>
          </Link>
        </div>
      </header>

      {/* Blog Content */}
      <main className="pt-32 pb-16 px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            {/* Category Badge */}
            <div className="mb-6">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-${categoryColor}-400/10 text-${categoryColor}-400 border border-${categoryColor}-400/20`}>
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-8">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-white/60 mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{post.readTime} min read</span>
              </div>
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 text-white/50 text-sm border border-white/10"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </motion.div>

          {/* Article Content */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-invert prose-lg max-w-none"
          >
            {/* Custom Prose Styles */}
            <div 
              className="prose-headings:font-light prose-headings:text-white 
                         prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-12
                         prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-10 prose-h2:text-white/90
                         prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-8 prose-h3:text-white/80
                         prose-p:text-white/70 prose-p:leading-relaxed prose-p:mb-6
                         prose-strong:text-white prose-strong:font-medium
                         prose-em:text-white/80
                         prose-blockquote:border-l-emerald-400 prose-blockquote:bg-emerald-400/5 
                         prose-blockquote:p-4 prose-blockquote:rounded-r-lg prose-blockquote:my-8
                         prose-code:bg-white/10 prose-code:px-2 prose-code:py-1 prose-code:rounded 
                         prose-code:text-emerald-300 prose-code:text-sm
                         prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-lg
                         prose-ul:text-white/70 prose-ol:text-white/70
                         prose-li:mb-2
                         prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline prose-a:transition-all"
              dangerouslySetInnerHTML={{ 
                __html: marked(post.content.replace(/^# /gm, '## ')) // Convert markdown to HTML, and convert H1 to H2
              }}
            />
          </motion.article>

          {/* Footer Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 pt-8 border-t border-white/10"
          >
            <div className="flex justify-between items-center">
              <Link 
                href="/pages/blogs"
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>All Posts</span>
              </Link>
              
              <div className="text-white/40 text-sm">
                Published {new Date(post.date).toLocaleDateString()}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
} 