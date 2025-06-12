"use client"
import Link from 'next/link'

interface BlogPostParams {
    params: Promise<{
        slug: string;
    }>;
}

export default async function BlogPost({ params }: BlogPostParams) {
    // Await the params promise to get the slug
    const { slug } = await params;

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header Navigation */}
            <header className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 md:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <Link href="/pages/blogs" className="text-lg font-light text-white/80 hover:text-white transition-colors">
                            ← Back to Blog
                        </Link>
                        
                        <div className="flex items-center space-x-8">
                            <nav className="hidden md:flex space-x-6 text-sm font-light text-white/60">
                                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                                <Link href="/pages/about" className="hover:text-white transition-colors">About</Link>
                                <Link href="/pages/arts" className="hover:text-white transition-colors">Arts</Link>
                            </nav>
                            
                            <div className="text-sm font-light text-white/60">
                                <span className="text-blue-300">Article</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Blog Post Content */}
            <main className="pt-24 pb-20 px-6 md:px-8">
                <div className="max-w-4xl mx-auto">
                    <article className="space-y-8">
                        {/* Article Header */}
                        <header className="text-center space-y-6">
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight">
                                {slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </h1>
                            
                            <div className="flex flex-wrap justify-center items-center gap-4 text-white/60">
                                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm">
                                    Gap Year
                                </span>
                                <span>March 31, 2025</span>
                                <span>•</span>
                                <span>5 min read</span>
                            </div>
                        </header>

                        {/* Article Content */}
                        <div className="prose prose-lg prose-invert max-w-none">
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
                                <h2 className="text-2xl font-light mb-4 text-white/90">Coming Soon</h2>
                                <p className="text-white/70 leading-relaxed">
                                    This blog post is currently being written. I'm working on sharing detailed insights about my journey, 
                                    experiences, and lessons learned. Check back soon for the full article!
                                </p>
                                <p className="text-white/70 leading-relaxed mt-4">
                                    In the meantime, feel free to explore my other content or connect with me through the links on my homepage.
                                </p>
                            </div>

                            {/* Preview of what's coming */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-light text-white/90">What to Expect</h3>
                                <ul className="space-y-3 text-white/70">
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                                        <span>Personal reflections on my gap year journey</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                                        <span>Insights from my JGP Fellowship application process</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                                        <span>Lessons learned about career planning and life goals</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0"></div>
                                        <span>Tips for navigating uncertainty in your twenties</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </article>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-white/10 py-12 px-6 md:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <Link 
                            href="/pages/blogs" 
                            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to All Posts
                        </Link>
                        
                        <p className="text-white/40 text-sm">
                            © 2024 Anderson Chen
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
} 