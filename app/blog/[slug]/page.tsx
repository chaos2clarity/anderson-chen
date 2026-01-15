"use client";

import { useState, useEffect, use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BlogPost } from '@/lib/blog';



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
      <div className="min-h-screen bg-background text-white flex items-center justify-center">
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
    <div className="min-h-screen bg-background text-white">
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 p-6 md:p-8 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <Link href="/" className="text-sm font-light text-white/80 hover:text-white transition-colors">
            Anderson Chen
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-light"
          >
             <ReactMarkdown
               remarkPlugins={[remarkGfm]}
               components={{
                 h1: ({node, ...props}) => <h2 className="text-3xl text-white/95 font-light mb-6 mt-12 first:mt-0" {...props} />,
                 h2: ({node, ...props}) => <h3 className="text-2xl text-white/90 font-light mb-4 mt-10" {...props} />,
                 h3: ({node, ...props}) => <h4 className="text-xl text-white/90 font-light mb-3 mt-8" {...props} />,
                 p: ({node, ...props}) => <p className="text-[#B0B0B0] leading-relaxed mb-6 text-lg" {...props} />, // Softer white text
                 ul: ({node, ...props}) => <ul className="list-disc list-outside ml-6 mb-6 text-[#B0B0B0] space-y-2" {...props} />,
                 ol: ({node, ...props}) => <ol className="list-decimal list-outside ml-6 mb-6 text-[#B0B0B0] space-y-2" {...props} />,
                 li: ({node, ...props}) => <li className="pl-1" {...props} />,
                 blockquote: ({node, ...props}) => <blockquote className="border-l-2 border-white/20 pl-6 py-2 my-8 text-white/60 italic leading-relaxed" {...props} />,
                 code: ({node, ...props}: {node?: any, inline?: boolean, className?: string, children?: React.ReactNode} & React.HTMLAttributes<HTMLElement>) => {
                   const match = /language-(\w+)/.exec(props.className || '')
                   const isInline = !match && !String(props.children).includes('\n')
                   return isInline ?
                     <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm text-white/80 font-mono" {...props} /> :
                     <div className="bg-[#151515] p-4 rounded-lg overflow-x-auto mb-6 border border-white/5 my-6">
                       <code className="text-sm font-mono text-white/80" {...props} />
                     </div>
                 },
                 a: ({node, ...props}) => <a className="text-white/90 underline decoration-white/30 underline-offset-4 hover:decoration-white/60 transition-colors" {...props} />,
                 img: ({node, ...props}) => <img className="rounded-lg w-full my-8 border border-white/5" {...props} />,
                 hr: ({node, ...props}) => <hr className="border-white/10 my-10" {...props} />
               }}
             >
               {post.content}
             </ReactMarkdown>
          </motion.div>

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