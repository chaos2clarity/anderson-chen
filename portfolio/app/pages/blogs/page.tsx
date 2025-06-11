"use client"

import { BlogCard } from "@/app/components/blog-card";
import { FilterSidebar } from "@/app/components/filtersidebar";
import Link from "next/link";

export default function Blogs() {
    const posts = [
        {
            id: "1",
            title: "我的 JGP Application 文章 | Gap Year (1)",
            excerpt: "Gap Year Application",
            date: "2025-3-31",
            category: "Gap Year",
            readTime: 5,
            tags: ["gap year", "career", "life"],
            slug: "my-jgp-application-article-gap-year-1"
        },
        {
            id: "2",
            title: "探索20出頭的焦慮 & 設計長期目標 | Gap Year (2)",
            excerpt: "...",
            date: "2025-4-20",
            category: "Gap Year",
            readTime: 8,
            tags: ["gap year", "career", "life"],
            slug: "gap-year-plan-and-reflections"
        },

    ];

    // Get the most recent 3 posts
    const recentPosts = posts.slice(0, 3);

    return (
        <div className="min-h-screen bg-[#141414] flex items-center justify-center p-8">
            <div className="w-full h-full flex flex-col md:flex-row items-start gap-8 md:gap-8">
                {/*Left Section*/}
                <div className="w-[300px] flex-shrink-0">
                    <div className="flex flex-col gap-5">
                        <h1 className="text-4xl md:text-6xl font-light italic text-white/80 tracking-tighter leading-[130%]">
                            Blogs
                        </h1>
                        <div className="space-y-4 pt-6">
                            <div className="h-px bg-white/10 w-full" />
                            <FilterSidebar />
                        </div>
                    </div>
                </div>

                {/*Right Section*/}
                <div className="flex-1">
                    {/* Recent Blogs Section */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-light italic text-white/80 mb-6">
                            Recent Posts
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {recentPosts.map((post) => (
                                <Link 
                                    key={post.id} 
                                    href={`/blogs/${post.slug}`}
                                    className="transform transition-transform hover:scale-[1.02]"
                                >
                                    <BlogCard post={post} />
                                </Link>
                            ))}
                        </div>
                        <div className="h-px bg-white/10 w-full mt-8" />
                    </div>

                    {/* All Blogs Grid */}
                    <div>
                        <h2 className="text-2xl font-light italic text-white/80 mb-6">
                            All Posts
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {posts.map((post) => (
                                <Link 
                                    key={post.id} 
                                    href={`/blogs/${post.slug}`}
                                    className="transform transition-transform hover:scale-[1.02]"
                                >
                                    <BlogCard post={post} />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}