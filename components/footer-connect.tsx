import React from 'react'
import Link from 'next/link'

const FooterConnect = () => {
  return (
    <div className="max-w-7xl mx-auto text-center"> 
          <h3 className="text-2xl md:text-4xl font-light mb-8">
            Let&apos;s <span className="underline decoration-emerald-400 decoration-3 underline-offset-2 text-white/80 font-medium">connect</span>
          </h3>
          <div className="flex justify-center items-center gap-8">
            {/* LinkedIn */}
            <Link
              href="https://www.linkedin.com/in/anderson-chen-2b6941216/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 
                         transition-all duration-300 group hover:scale-110"
            >
              <svg className="w-6 h-6 text-white/70 group-hover:text-blue-400 transition-colors" 
                   fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </Link>

            {/* YouTube */}
            <Link
              href="https://www.youtube.com/@andersonchen-7"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 
                         transition-all duration-300 group hover:scale-110"
            >
              <svg className="w-6 h-6 text-white/70 group-hover:text-red-400 transition-colors" 
                   fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </Link>

            {/* Medium */}
            <Link
              href="https://medium.com/@andersonchen_2095"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 
                         transition-all duration-300 group hover:scale-110"
            >
              <svg className="w-6 h-6 text-white/70 group-hover:text-green-400 transition-colors" 
                   fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
              </svg>
            </Link>

            {/* Instagram */}
            <Link
              href="https://www.instagram.com/andersonchen_7/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 
                         transition-all duration-300 group hover:scale-110"
            >
              <svg className="w-6 h-6 text-white/70 group-hover:text-pink-400 transition-colors" 
                   fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.281-.059 1.689-.073 4.849-.073zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </Link>
          </div>
          
          <p className="text-white/40 text-sm mt-8 font-light">
            Pretty active on these platforms, feel free to connect with me!
          </p>
        </div>
  )
}

export default FooterConnect;