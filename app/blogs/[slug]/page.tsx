"use client"

interface BlogPostParams {
    params: {
        slug: string;
    };
}

export default function BlogPost({ params }: BlogPostParams) {
    return (
        <div className="min-h-screen bg-[#141414] flex items-center justify-center p-8">
            <div className="w-full max-w-3xl">
                <div className="flex flex-col gap-8">
                    <div className="space-y-4">
                        <a 
                            href="/blogs" 
                            className="text-white/60 hover:text-white/90 transition-colors"
                        >
                            ← Back to blogs
                        </a>
                        <h1 className="text-4xl md:text-6xl font-light italic text-white/80 tracking-tighter leading-[130%]">
                            {/* You would fetch the actual blog post data here */}
                            Blog Post Title
                        </h1>
                        <div className="flex gap-4 text-white/60">
                            <span>Date</span>
                            <span>•</span>
                            <span>Read time</span>
                        </div>
                    </div>
                    <div className="prose prose-invert max-w-none">
                        {/* Blog content would go here */}
                        <p>This is where your blog post content would go...</p>
                    </div>
                </div>
            </div>
        </div>
    );
} 