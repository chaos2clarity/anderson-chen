import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const ProjectsShowcase = () => {
  return (
    <>
      {/* 1. ClarityNotes Project */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
      >
        <Link href="https://claritynotes.xyz" target="_blank" rel="noopener noreferrer" className="block group">
           <div className="space-y-3">
             {/* Image Area */}
             <div className="relative aspect-[14/10] w-full overflow-hidden rounded-md border border-white/10 bg-[#1C1C1C]">
                <Image 
                   src="/claritycursor.png"
                   alt="Clarity Editor"
                   fill
                   className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                 />
             </div>

             {/* Text Area - Wispr Style */}
             <div>
                <div className="flex items-baseline justify-between mb-1">
                   <h3 className="text-base font-medium text-[#EDEDED] group-hover:text-white group-hover:underline decoration-white/30 underline-offset-4 transition-colors">
                      Clarity
                   </h3>
                   <span className="text-xs text-[#808080] font-mono">2025-Present</span>
                </div>
                <p className="text-sm text-[#A1A1A1] leading-relaxed line-clamp-2">
                   Cursor for LaTeX. Pivoted from a note-taking app. <br className="hidden md:block"/>
                   Received a ~$10k grant from NTUitive.
                </p>
             </div>
           </div>
        </Link>
      </motion.div>

      {/* 2. NPM Package Project */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <Link href="https://www.npmjs.com/package/@anderson120912091209/mathlive-custom" target="_blank" rel="noopener noreferrer" className="block group">
           <div className="space-y-3">
             {/* Image Area */}
             <div className="relative aspect-[14/10] w-full overflow-hidden rounded-md border border-white/10 bg-[#1C1C1C]">
                <Image 
                   src="/mathlive-custom.png"
                   alt="Mathlive Custom"
                   fill
                   className="object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                 />
             </div>

             {/* Text Area */}
             <div>
                <div className="flex items-baseline justify-between mb-1">
                   <h3 className="text-base font-medium text-[#EDEDED] group-hover:text-white group-hover:underline decoration-white/30 underline-offset-4 transition-colors">
                      mathlive-custom
                   </h3>
                   <span className="text-xs text-[#808080] font-mono">2025</span>
                </div>
                <p className="text-sm text-[#A1A1A1] leading-relaxed line-clamp-2">
                   Visual math editor with good UX, forked from MathLive. <br className="hidden md:block"/>
                   Try npm install @anderson120912091209/mathlive-custom.
                </p>
             </div>
           </div>
        </Link>
      </motion.div>
    </>
  )
}

export default ProjectsShowcase 