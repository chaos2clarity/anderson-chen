import { NextResponse } from 'next/server';
import { getAllBlogPosts, getPostsByCategory, getAllCategories } from '@/lib/blog';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = searchParams.get('limit');

    let posts = getAllBlogPosts();

    // Filter by category if specified
    if (category && category !== 'All') {
      posts = getPostsByCategory(category);
    }

    // Limit results if specified
    if (limit) {
      posts = posts.slice(0, parseInt(limit));
    }

    const categories = getAllCategories();

    return NextResponse.json({
      posts,
      categories
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
} 