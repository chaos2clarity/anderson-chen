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

// Client-side API calls
export async function getMediumPosts(): Promise<MediumPost[]> {
  try {
    const response = await fetch('/api/medium-posts');
    const data = await response.json();
    return data.posts || [];
  } catch (error) {
    console.error('Error fetching Medium posts:', error);
    return [];
  }
}

export async function getAllCategories(): Promise<string[]> {
  try {
    const response = await fetch('/api/medium-posts');
    const data = await response.json();
    return data.categories || ['All'];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return ['All'];
  }
}

export async function getPostsByCategory(category: string): Promise<MediumPost[]> {
  try {
    const response = await fetch(`/api/medium-posts?category=${encodeURIComponent(category)}`);
    const posts = await response.json();
    return posts || [];
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    return [];
  }
}

export async function getRecentPosts(limit: number = 3): Promise<MediumPost[]> {
  try {
    const response = await fetch(`/api/medium-posts?limit=${limit}`);
    const posts = await response.json();
    return posts || [];
  } catch (error) {
    console.error('Error fetching recent posts:', error);
    return [];
  }
}

export function getMediumPostBySlug(posts: MediumPost[], slug: string): MediumPost | null {
  return posts.find(post => post.slug === slug) || null;
}

export function getFeaturedPost(posts: MediumPost[]): MediumPost | null {
  return posts.find(post => post.featured) || posts[0] || null;
} 