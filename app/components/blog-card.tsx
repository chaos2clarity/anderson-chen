/*
Blog Card Structure, 
Blog card need to contain information tags 
Blog card need to have id to be filtered out 
Blog card need to have dates 
Blog card need to have title 
Blog card need to have a short description 
Blog card need to have read time 
Blog card need to have image within the content 
Blog card need to be able to be opened 

*/
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

//Blog Card Interface 
interface BlogPost {
    id: string;
    title: string;
    excerpt: string; 
    date: string;
    category: string;
    readTime: number;
    slug: string;
}

interface BlogCardProps {
    post: BlogPost;
}

export function BlogCard({post}: BlogCardProps) {
    return (
        <Card className="flex-col flex h-full bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900 transition-colors duration-200">
            <CardHeader className="space-y-4">
                <div className="flex justify-between items-center text-xs text-white/40">
                    <span>{post.category}</span>
                    <span>{post.readTime} min read</span>
                </div>
                <CardTitle className="text-lg font-normal text-white/90">
                    {post.title}
                </CardTitle>
                <CardDescription className="text-sm text-white/60 line-clamp-2">
                    {post.excerpt}
                </CardDescription>
                <div className="text-xs text-white/40 pt-2">
                    {post.date}
                </div>
            </CardHeader>
        </Card>
    )
}
//Blog Card State Management 
//Blog Card Component 

