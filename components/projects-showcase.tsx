import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const ProjectsShowcase = () => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <Link href="https://claritynotes.co" target="_blank" rel="noopener noreferrer">
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/50 via-slate-800/40 to-slate-900/20 border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-500/5">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-8 right-8 w-32 h-32 rounded-full bg-purple-400/20 blur-3xl"></div>
              <div className="absolute bottom-8 left-8 w-24 h-24 rounded-full bg-emerald-400/20 blur-2xl"></div>
            </div>

            <div className="relative p-6">
              {/* Project Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="px-2 py-1 bg-slate-400/20 text-slate-200 rounded-full text-xs font-light">
                  Web App
                </div>
                <div className="flex items-center gap-2 text-white/40">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                  <span className="text-xs">Live</span>
                </div>
              </div>

              {/* Project Title */}
              <h3 className="text-xl md:text-2xl font-light mb-3 group-hover:text-white/90 transition-colors">
                claritynotes.co
              </h3>

              {/* Project Description */}
              <div className="text-white/80 text-xs leading-relaxed mb-4">
                <p className="mb-2">
                  A clean, distraction-free note-taking application designed for clarity and focus. 
                  Built for scientific notations heavy content.
                </p>
                <ul className="space-y-1">
                  <li className="pt-2 text-white/60">
                    NT$ 300,000 funding, STARTLausanne Semi-Finalist
                  </li>
                  <li className="text-white/60">
                    EPFL Startup Ceremony 1st Runner Up
                  </li>
                </ul>
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1 mb-4">
                {['React', 'Next.js', 'TypeScript', 'Tailwind'].map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-white/10 text-white/70 rounded text-xs">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Project Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <div className="text-xs text-white/50">
                  claritynotes.co
                </div>
                <div className="flex items-center gap-2 text-white/60 group-hover:text-white transition-colors">
                  <span className="text-xs">Visit Site</span>
                  <svg className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Hover Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </Link>
      </motion.div>

      {/* What's Next - Cal.com Link */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        viewport={{ once: true }}
        className="mt-6"
      >
        <Link href="https://cal.com/andersonchen/30min" target="_blank" rel="noopener noreferrer">
          <div className="group p-4 border border-dashed border-white/20 rounded-xl hover:border-white/40 
                         hover:bg-white/5 transition-all duration-300 cursor-pointer">
            <div className="text-center">
              <div className="w-8 h-8 mx-auto mb-3 rounded-full bg-white/5 flex items-center justify-center
                            group-hover:bg-white/10 group-hover:scale-110 transition-all duration-300">
                <svg className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors" 
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h4 className="text-sm font-light text-white/70 mb-1 group-hover:text-white/90 transition-colors">
                What's Next?
              </h4>
              <p className="text-xs text-white/50 group-hover:text-white/70 transition-colors">
                <span className="hidden md:inline">Schedule a chat with me!</span>
                <span className="md:hidden">Click here to schedule a coffee chat!</span>
              </p>
              
              {/* Desktop-only booking CTA */}
              <div className="hidden md:block mt-2 opacity-0 group-hover:opacity-100 
                            transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <div className="inline-flex items-center gap-1 text-emerald-400 text-xs font-light">
                  <span>Book 30min</span>
                  <svg className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform" 
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </div>
  )
}

export default ProjectsShowcase; 