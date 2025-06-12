import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  readTime: number;
  content: string;
  excerpt: string;
  featured?: boolean;
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blogs');

export function getAllBlogPosts(): BlogPost[] {
  try {
    if (!fs.existsSync(BLOG_DIR)) {
      console.warn('Blog directory not found:', BLOG_DIR);
      return [];
    }

    const fileNames = fs.readdirSync(BLOG_DIR);
    const blogPosts = fileNames
      .filter(fileName => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
      .map(fileName => {
        const slug = fileName.replace(/\.mdx?$/, '');
        const filePath = path.join(BLOG_DIR, fileName);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);

        // Generate excerpt from content (first 150 characters)
        const excerpt = content
          .replace(/^#.*$/gm, '') // Remove headers
          .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove markdown links
          .replace(/[*_`]/g, '') // Remove markdown formatting
          .trim()
          .substring(0, 150) + '...';

        return {
          slug,
          title: data.title || slug,
          date: data.date || new Date().toISOString().split('T')[0],
          category: data.category || 'General',
          tags: data.tags || [],
          readTime: data.readTime || Math.max(1, Math.round(content.split(' ').length / 200)),
          content,
          excerpt: data.excerpt || excerpt,
          featured: data.featured || false
        };
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Set the first post as featured if no featured post exists
    if (blogPosts.length > 0 && !blogPosts.some(post => post.featured)) {
      blogPosts[0].featured = true;
    }

    return blogPosts;
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

export function getBlogPost(slug: string): BlogPost | null {
  const posts = getAllBlogPosts();
  return posts.find(post => post.slug === slug) || null;
}

export function getRecentPosts(limit: number = 3): BlogPost[] {
  const posts = getAllBlogPosts();
  return posts.slice(0, limit);
}

export function getPostsByCategory(category: string): BlogPost[] {
  const posts = getAllBlogPosts();
  if (category === 'All') return posts;
  return posts.filter(post => post.category === category);
}

export function getAllCategories(): string[] {
  const posts = getAllBlogPosts();
  const categories = new Set(posts.map(post => post.category));
  return ['All', ...Array.from(categories)];
}

export function getFeaturedPost(): BlogPost | null {
  const posts = getAllBlogPosts();
  return posts.find(post => post.featured) || posts[0] || null;
} 