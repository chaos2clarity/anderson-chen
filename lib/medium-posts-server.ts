import fs from 'fs';
import path from 'path';

export interface MediumPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  readTime: number;
  tags: string[];
  slug: string;
  featured: boolean;
  color: string;
  mediumUrl: string;
  source: 'medium';
  lastSync: string;
}

// Fallback data in case Medium sync hasn't run yet
const FALLBACK_POSTS: MediumPost[] = [
  {
    id: "fallback-1",
    title: "Welcome to My Blog",
    excerpt: "This is a placeholder post while we sync your Medium articles. The sync system will automatically pull your latest posts from Medium.",
    content: "<p>This is a placeholder post while we sync your Medium articles. The sync system will automatically pull your latest posts from Medium.</p>",
    date: "2025-01-01",
    category: "Life",
    readTime: 2,
    tags: ["welcome", "blog", "medium"],
    slug: "welcome-to-my-blog",
    featured: true,
    color: "blue",
    mediumUrl: "https://medium.com/@andersonchen_2095",
    source: 'medium',
    lastSync: new Date().toISOString()
  }
];

export function getMediumPostsServer(): MediumPost[] {
  try {
    const dataPath = path.join(process.cwd(), 'data/medium-posts.json');
    
    if (fs.existsSync(dataPath)) {
      const data = fs.readFileSync(dataPath, 'utf8');
      const posts = JSON.parse(data);
      
      if (posts && posts.length > 0) {
        return posts;
      }
    }
  } catch (error) {
    console.warn('Could not load Medium posts:', error);
  }
  
  // Return fallback data if no synced posts
  return FALLBACK_POSTS;
}

export function getMediumPostBySlugServer(slug: string): MediumPost | null {
  const posts = getMediumPostsServer();
  return posts.find(post => post.slug === slug) || null;
}

export function getFeaturedPostServer(): MediumPost | null {
  const posts = getMediumPostsServer();
  return posts.find(post => post.featured) || posts[0] || null;
}

export function getRecentPostsServer(limit: number = 3): MediumPost[] {
  const posts = getMediumPostsServer();
  return posts.slice(0, limit);
}

export function getPostsByCategoryServer(category: string): MediumPost[] {
  const posts = getMediumPostsServer();
  if (category === 'All') return posts;
  return posts.filter(post => post.category === category);
}

export function getAllCategoriesServer(): string[] {
  const posts = getMediumPostsServer();
  const categories = new Set(posts.map(post => post.category));
  return ['All', ...Array.from(categories)];
} 