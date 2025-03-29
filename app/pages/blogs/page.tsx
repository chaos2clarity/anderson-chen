"use client"

import { BlogCard } from "@/app/components/blog-card";
import { FilterSidebar } from "@/app/components/filtersidebar";
import Link from "next/link";

export default function Blogs() {
    const posts = [
        {
            id: "1",
            title: "Why am I taking a year off?",
            excerpt: "My blueprint for the upcoming gap year - exploring software engineering, design, and personal growth.",
            date: "2024-02-20",
            category: "Life",
            readTime: 5,
            tags: ["gap year", "career", "life"],
            slug: "why-am-i-taking-a-year-off"
        },
        {
            id: "2",
            title: "Learning Chemical Engineering Without Prior Knowledge",
            excerpt: "How I adapted to studying complex science subjects with no background - my learning framework and experiences.",
            date: "2024-02-15",
            category: "Engineering",
            readTime: 8,
            tags: ["chemical engineering", "learning", "education"],
            slug: "learning-chemical-engineering"
        },
        {
            id: "3",
            title: "Building My Portfolio Website with Next.js",
            excerpt: "A deep dive into my process of designing and developing this website using modern web technologies.",
            date: "2024-02-10",
            category: "Tech",
            readTime: 10,
            tags: ["web development", "next.js", "design"],
            slug: "building-portfolio-website"
        },
        {
            id: "4",
            title: "From Art to Engineering: My Journey",
            excerpt: "The unexpected path that led me from being an aspiring artist to pursuing chemical engineering.",
            date: "2024-02-05",
            category: "Life",
            readTime: 6,
            tags: ["career change", "art", "engineering"],
            slug: "from-art-to-engineering"
        }
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