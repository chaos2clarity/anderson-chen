"use client";
import dynamic from 'next/dynamic';

// Disable SSR for this component since it uses browser APIs
const ProjectsContent = dynamic(() => import('./ProjectsContent'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white/60">Loading...</p>
      </div>
    </div>
  )
});

export default function Projects() {
  return <ProjectsContent />;
}

