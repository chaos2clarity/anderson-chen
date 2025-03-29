"use client"
/* 
Filter Sidebar Structure 

const categoryFilters 
const readtimeFilters 
const dateFilters 
const resetFilters 

*/

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FilterSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export function FilterSidebar({ className }: FilterSidebarProps) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight text-white/80">
            Filter By
          </h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start text-white/60 hover:text-white/90">
              <span>All Posts</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start text-white/60 hover:text-white/90">
              <span>Engineering</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start text-white/60 hover:text-white/90">
              <span>Design</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start text-white/60 hover:text-white/90">
              <span>Life</span>
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight text-white/80">
            Sort By
          </h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start text-white/60 hover:text-white/90">
              <span>Latest</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start text-white/60 hover:text-white/90">
              <span>Oldest</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

