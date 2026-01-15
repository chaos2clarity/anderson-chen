import Link from "next/link";
import { BlogPost } from "@/lib/blog";

interface BlogCardProps {
  post: BlogPost;
  onClick?: (post: BlogPost) => void;
}

export default function BlogCard({ post, onClick }: BlogCardProps) {
  const CardContent = () => (
    <div className="group h-full p-6 bg-[#121212] rounded-md 
    border border-white/5 hover:border-white/10 transition-colors 
    duration-200 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-medium text-[#EDEDED]
        group-hover:text-white mb-4 truncate">
          {post.title}
        </h3>
        <p className="text-sm text-[#A1A1A1] line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>
      </div>
      
      <div className="flex items-center gap-3 mt-6">
        <div className="flex flex-col">
          <span className="text-xs font-medium text-[#EDEDED]">Anderson Chen</span>
          <span className="text-[11px] text-[#808080]">
              {new Date(post.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </div>
  );

  if (onClick) {
    return (
      <div onClick={() => onClick(post)} className="block h-full cursor-pointer">
        <CardContent />
      </div>
    );
  }

  return (
    <Link href={`/blog/${post.slug}`} className="block h-full">
      <CardContent />
    </Link>
  );
}
