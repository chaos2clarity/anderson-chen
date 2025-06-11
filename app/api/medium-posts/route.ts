import { NextResponse } from 'next/server';
import { getMediumPostsServer, getAllCategoriesServer, getPostsByCategoryServer } from '@/lib/medium-posts-server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = searchParams.get('limit');

    if (category) {
      const posts = getPostsByCategoryServer(category);
      return NextResponse.json(posts);
    }

    if (limit) {
      const posts = getMediumPostsServer().slice(0, parseInt(limit));
      return NextResponse.json(posts);
    }

    const posts = getMediumPostsServer();
    const categories = getAllCategoriesServer();

    return NextResponse.json({
      posts,
      categories
    });
  } catch (error) {
    console.error('Error fetching Medium posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Medium posts' },
      { status: 500 }
    );
  }
} 