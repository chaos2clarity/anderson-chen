"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Currentlyat from "@/app/little-stuff/currentlyat";
import FooterConnect from "@/components/footer-connect";
import ProjectsShowcase from "@/components/projects-showcase";
import BottomEditorialLine from "@/components/ui/bottom-editorial-line";

// Move constants outside component
const PHOTOGRAPHY_INDICES = [3, 11, 0, 2, 4, 6, 7, 8, 9, 12, 1];
const ARTWORKS_INDICES = [1, 2, 3, 4];

// Location mappings for each image
const PHOTOGRAPHY_LOCATIONS: Record<number, string> = {
  0: "Milan, Italy",
  1: "Jungfrau, Switzerland",
  2: "Paris, France",
  3: "Lausanne, Switzerland",
  4: "Paris, France",
  6: "The Alps, Somewhere High Up",
  7: "Oregon, United States",
  8: "Zurich, Switzerland",
  9: "EPFL Campus, Lausanne",
  11: "Yilan, Taiwan",
  12: "Singapore, Singapore"
};

const ARTWORKS_LOCATIONS: Record<number, string> = {
  1: "封建主義 - 女 (2022)",
  2: "封建主義 - 男 (2022)", 
  3: "夜 (2021)",
  4: "地鐵 (2022)"
};

export default function Page() {
  const [headerSize] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<{
    num: number;
    type: "photography" | "artworks";
  } | null>(null);
  const [activeGallery, setActiveGallery] = useState<
    "photography" | "artworks"
  >("photography");
  const [currentIndices, setCurrentIndices] = useState<number[]>([]);
  
  // Load recent blog posts
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const transition = {
    duration: 0.3,
    delay: 0.2,
    ease: [0, 0.71, 0.29, 1],
  };

  useEffect(() => {
    // Load recent blog posts
    const loadPosts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/blog?limit=3');
        const data = await response.json();
        setRecentPosts(data.posts || []);
      } catch (error) {
        console.error('Error loading blog posts:', error);
        // Set fallback posts if API fails
        setRecentPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  useEffect(() => {
    setCurrentIndices(activeGallery === "photography" ? PHOTOGRAPHY_INDICES : ARTWORKS_INDICES);
  }, [activeGallery]);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = 300;
      const newScrollPosition =
        containerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      containerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 p-6 md:p-8">
        <div className="flex justify-between items-center">
          <div className="text-sm font-light text-white/80">
            Anderson Chen's Studio
          </div>
          
          {/* Centered Navigation */}
          <nav className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex space-x-8 text-sm font-light text-white/60">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/pages/projects" className="hover:text-white transition-colors">Projects</Link>
            <Link href="/pages/arts" className="hover:text-white transition-colors">Arts</Link>
            <Link href="/pages/blogs" className="hover:text-white transition-colors">Blog</Link>
          </nav>
          
          <div className="text-sm font-light text-white/60">
            Currently in Singapore • <span className="text-emerald-300 animate-pulse font-medium">Taipei</span> • Beijing 
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-5 pb-16 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Main Title */}
          <div className="relative mb-4">
            <div className="flex items-start justify-center gap-12">
              <div className="flex-1 max-w-none">
                <h1 className="text-[18vw] sm:text-[16vw] md:text-[15vw] lg:text-[14vw] xl:text-[12vw] leading-[0.8] 
                tracking-tighter font-light" style={{ marginTop: '10vh' }}>
                  <span className="block">anderson</span>
                  <span className="block">chen.</span>
                </h1>
                
                {/* Subtitle - directly below name */}
                <div className="mt-4 pt-8">
                  <p className="text-base sm:text-lg md:text-xl lg:text-xl xl:text-xl font-light leading-relaxed text-white/60">
                    Hi, I'm Anderson, I'm an aspiring artist (or a social science major) who turned chemical engineer because I fell in love with science during my exploration of some PubMed papers in highschool. 
                    I enjoy creating art pieces & designs, playing basketball, and reading history books.  
                  </p>
                </div>

                {/* Bullet Points - following subtitle */}
                <div className="mt-6 pt-3">
                  <ul className="space-y-8 text-sm md:text-base font-light leading-relaxed text-white/60">
                    <Link href="" target="_blank" rel="noopener noreferrer">
                      <li className="flex pt-2 items-start gap-4 group cursor-pointer">
                        <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0 group-hover:shadow-lg group-hover:shadow-blue-400/50 transition-all duration-300"></div>
                        <p className="group-hover:text-white/80 transition-colors duration-300">
                          Chemical Engineering & Business student at{" "}
                          <span className="underline decoration-blue-400 decoration-2 underline-offset-2 text-white/80 font-medium group-hover:text-blue-400 transition-colors duration-300">
                            NTU & EPFL
                          </span>
                        </p>
                      </li>
                    </Link>
                    
                    <Link href="https://www.shl-medical.com" target="_blank" rel="noopener noreferrer">
                      <li className="flex pt-2 items-start gap-4 group cursor-pointer">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0 group-hover:shadow-lg group-hover:shadow-emerald-400/50 transition-all duration-300"></div>
                        <p className="group-hover:text-white/80 transition-colors duration-300">
                          Process Engineering Intern at{" "}
                          <span className="underline decoration-emerald-400 decoration-2 underline-offset-2 text-white/80 font-medium group-hover:text-emerald-400 transition-colors duration-300">
                            SHL Medical
                          </span>
                        </p>
                      </li>
                    </Link>
                    
                    <Link href="/" target="_blank" rel="noopener noreferrer">
                      <li className="flex items-start gap-4 pt-2 group cursor-pointer">
                        <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0 group-hover:shadow-lg group-hover:shadow-orange-400/50 transition-all duration-300"></div>
                        <p className="group-hover:text-white/80 transition-colors duration-300">
                          <span className="underline decoration-orange-400 decoration-2 underline-offset-2 text-white/80 font-medium group-hover:text-orange-400 transition-colors duration-300">
                            Student Athlete 
                          </span> NTU Varsity Basketball (aka bench-warmer), FIBA GRIT Asia 3x3 
                        </p>
                      </li>
                    </Link>
                    
                    <Link href="https://www.gapyear.tw/" target="_blank" rel="noopener noreferrer">
                      <li className="flex pt-2 items-start gap-4 group cursor-pointer">
                        <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0 group-hover:shadow-lg group-hover:shadow-purple-400/50 transition-all duration-300"></div>
                        <p className="group-hover:text-white/80 transition-colors duration-300">
                          Gap Year 2025 Aug - 2026 Aug |{" "}
                          <span className="underline decoration-purple-400 decoration-2 underline-offset-2 text-white/80 font-medium group-hover:text-purple-400 transition-colors duration-300">
                            JGP Fellow #3
                          </span>
                        </p>
                      </li>
                    </Link>
                  </ul>
                </div>
              </div>
              {/* Illustration */}
              <div className="hidden md:block flex-shrink-0">
                <div className="w-[25vw] h-[35vw] lg:w-[30vw] lg:h-[40vw] relative">
                  <Image
                    src="/anderson-draw.jpg"  
                    alt="Anderson Chen illustration"
                    fill
                    className="object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="relative px-6 lg:px-28">
        <div className="max-w-8xl mx-auto">
          <div className="w-full h-[1px] bg-white/20 mb-12"></div>
          {/* Gallery Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-light mb-4">
                creative works
              </h2>
              <p className="text-white/60 text-sm md:text-base max-w-md">
                Canon G11 & Nikon D750 <br />
                I like wandering around with my camera. 
              </p>
            </div>
            {/* Gallery Toggle */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setActiveGallery("photography")}
                className={`text-xl md:text-2xl font-light transition-all duration-300 ${
                  activeGallery === "photography"
                    ? "text-white border-b-2 border-blue-400"
                    : "text-white/40 hover:text-white/80"
                }`}
              >
                photography
              </button>
              <button
                onClick={() => setActiveGallery("artworks")}
                className={`text-xl md:text-2xl font-light transition-all duration-300 ${
                  activeGallery === "artworks"
                    ? "text-white border-b-2 border-green-400"
                    : "text-white/40 hover:text-white/80"
                }`}
              >
                artworks
              </button>
            </div>
          </div>

          {/* Gallery Container */}
          <div className="relative">
            <div
              ref={containerRef}
              className="flex overflow-x-auto overflow-y-hidden scrollbar-hide snap-x snap-mandatory"
              style={{ scrollBehavior: "smooth" }}
            >
              <div className="flex gap-6 p-4 min-w-max">
                {currentIndices.map((num, index) => (
                  <motion.div
                    key={num}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative group"
                  >
                    <div
                      className="relative w-[20vw] min-w-[280px] max-w-[400px] aspect-[3/4] 
                      flex-shrink-0 snap-center cursor-pointer overflow-hidden rounded-2xl
                      hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500"
                      onClick={() =>
                        setSelectedImage({
                          num,
                          type: activeGallery,
                        })
                      }
                    >
                      <Image
                        src={`/${activeGallery === "photography" ? "photo" : "artworks"}${num}.jpg`}
                        alt={`${activeGallery === "photography" ? "Photo" : "Artwork"} ${num}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Location overlay */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 
                        transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2">
                          <p className="text-white text-sm font-light tracking-wide">
                            {activeGallery === "photography" 
                              ? PHOTOGRAPHY_LOCATIONS[num] 
                              : ARTWORKS_LOCATIONS[num]
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Gallery Navigation */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={() => scroll("left")}
                className="p-4 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 
                transition-all duration-300 group"
              >
                <svg className="w-6 h-6 group-hover:scale-110 transition-transform" 
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <Link
                href="/pages/arts"
                className="px-6 py-3 border border-white/20 rounded-full hover:bg-white/10 
                transition-all duration-300 text-sm font-light"
              >
                View Full Gallery
              </Link>

              <button
                onClick={() => scroll("right")}
                className="p-4 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 
                transition-all duration-300 group"
              >
                <svg className="w-6 h-6 group-hover:scale-110 transition-transform" 
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-[90vw] h-[90vh] max-w-6xl"
            >
              <Image
                src={`/${selectedImage.type === "photography" ? "photo" : "artworks"}${selectedImage.num}.jpg`}
                alt={`${selectedImage.type === "photography" ? "Photo" : "Artwork"} ${selectedImage.num}`}
                fill
                className="object-contain rounded-lg"
                quality={100}
              />
              <button
                className="absolute -top-12 right-0 text-white/60 hover:text-white 
                text-4xl font-light transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side-by-Side: Magazine Blog & Projects */}
      <section className="relative py-24 px-6 lg:px-28">
        <div className="max-w-8xl mx-auto">
          <div className="w-full h-[1px] bg-white/20 mb-16"></div>
          
          {/* Two-Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 xl:gap-16">
            
            {/* Blog Section - Left Column (3/5 width) */}
            <div className="md:col-span-3">
              {/* Editorial Header */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <div className="flex items-end justify-between mb-8">
                  <div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-light leading-tight mb-2">
                      blogs & thoughts
                    </h2>
                    <p className="text-white/60 text-base md:text-lg font-light">
                      thoughts on gap year, career, life, and random stuff
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-white/40 mb-1">Issue #1</div>
                    <div className="text-sm text-white/40">2025</div>
                  </div>
                </div>
                <div className="w-24 h-[2px] bg-white/80"></div>
              </motion.div>

              {/* Magazine Grid Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                
                {/* Featured Article */}
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="lg:col-span-12"
                >
                  {isLoading ? (
                    <div className="animate-pulse">
                      <div className="h-8 bg-white/10 rounded mb-4"></div>
                      <div className="h-6 bg-white/5 rounded mb-2"></div>
                      <div className="h-4 bg-white/5 rounded w-3/4"></div>
                    </div>
                  ) : recentPosts && recentPosts.length > 0 ? (
                    <Link href={`/blog/${recentPosts[0].slug}`}>
                      <article className="group relative overflow-hidden mb-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-8 ${
                              recentPosts[0].category === 'Gap Year' ? 'bg-emerald-400' :
                              recentPosts[0].category === 'Career' ? 'bg-blue-400' :
                              recentPosts[0].category === 'Life' ? 'bg-orange-400' :
                              recentPosts[0].category === 'Engineering' ? 'bg-teal-400' :
                              'bg-purple-400'
                            }`}></div>
                            <div className="space-y-1">
                              <div className="text-xs text-white/60 uppercase tracking-wider">
                                {recentPosts[0].category}
                              </div>
                              <div className="text-xs text-white/40">
                                {new Date(recentPosts[0].date).toLocaleDateString('en-US', { 
                                  month: 'long', 
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </div>
                            </div>
                          </div>

                          <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-light leading-tight group-hover:text-white/90 transition-colors duration-300">
                            {recentPosts[0].title}
                          </h1>

                          <p className="text-sm md:text-base lg:text-lg text-white/70 leading-relaxed font-light">
                            {recentPosts[0].excerpt.substring(0, 150)}...
                          </p>

                          <div className="flex items-center gap-4 pt-2">
                            <div className="text-xs text-white/60">
                              {recentPosts[0].readTime} min read
                            </div>
                            <div className="flex items-center gap-2 text-white/60 group-hover:text-white transition-colors">
                              <span className="text-xs">Continue reading</span>
                              <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </article>
                    </Link>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-white/60 mb-4">No blog posts found</p>
                      <div className="text-xs text-white/40">
                        Add markdown files to <code className="bg-white/10 px-2 py-1 rounded">content/blogs/</code> to see posts here
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Side Articles */}
                <div className="lg:col-span-12 grid grid-cols-1 gap-6">
                  
                  {/* Second Article */}
                  {recentPosts && recentPosts.length > 1 && (
                    <motion.div 
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <Link href={`/blog/${recentPosts[1].slug}`}>
                        <article className="group relative border-l-2 border-white/10 pl-4 hover:border-blue-400/50 transition-colors duration-300">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-white/50 uppercase tracking-wider">
                                {recentPosts[1].category}
                              </span>
                              <span className="text-xs text-white/40">
                                {new Date(recentPosts[1].date).toLocaleDateString('en-US', { 
                                  month: 'short', 
                                  day: 'numeric' 
                                })}
                              </span>
                            </div>
                            
                            <h3 className="text-sm md:text-base lg:text-lg font-light leading-tight group-hover:text-white/90 transition-colors">
                              {recentPosts[1].title}
                            </h3>
                            
                            <div className="flex items-center justify-between pt-1">
                              <span className="text-xs text-white/50">{recentPosts[1].readTime} min</span>
                              <div className="w-6 h-[1px] bg-white/30 group-hover:bg-blue-400/60 transition-colors"></div>
                            </div>
                          </div>
                        </article>
                      </Link>
                    </motion.div>
                  )}

                  {/* Third Article */}
                  {recentPosts && recentPosts.length > 2 && (
                    <motion.div 
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <Link href={`/blog/${recentPosts[2].slug}`}>
                        <article className="group relative border-l-2 border-white/10 pl-4 hover:border-purple-400/50 transition-colors duration-300">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-white/50 uppercase tracking-wider">
                                {recentPosts[2].category}
                              </span>
                              <span className="text-xs text-white/40">
                                {new Date(recentPosts[2].date).toLocaleDateString('en-US', { 
                                  month: 'short', 
                                  day: 'numeric' 
                                })}
                              </span>
                            </div>
                            
                            <h3 className="text-sm md:text-base lg:text-lg font-light leading-tight group-hover:text-white/90 transition-colors">
                              {recentPosts[2].title}
                            </h3>
                            
                            <div className="flex items-center justify-between pt-1">
                              <span className="text-xs text-white/50">{recentPosts[2].readTime} min</span>
                              <div className="w-6 h-[1px] bg-white/30 group-hover:bg-purple-400/60 transition-colors"></div>
                            </div>
                          </div>
                        </article>
                      </Link>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Blog Archive Link */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
                className="mt-6 pt-4"
              >
                <Link href="/pages/blogs" className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors">
                  <div className="w-6 h-[1px] bg-white/40 group-hover:bg-white transition-colors"></div>
                  <span className="text-xs font-light">View all articles</span>
                  <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            </div>

            {/* Projects Section - Right Column (2/5 width) */}
            <div className="md:col-span-2">
              {/* Projects Header */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-light leading-tight mb-2">
                      projects 
                    </h2>
                    <p className="text-white/60 text-sm md:text-base font-light">
                      projects and experiments 
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-white/40 mb-1">01</div>
                    <div className="text-xs text-white/40">Active</div>
                  </div>
                </div>
                <div className="w-12 h-[2px] bg-white/80"></div>
              </motion.div>

              {/* ClarityNotes Project Card */}
              <ProjectsShowcase />
            </div>
          </div>

          {/* Bottom Editorial Line */}
          
            <BottomEditorialLine />
          
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative py-20 px-6 md:px-8 border-t border-white/10">
        <FooterConnect />
      </section>
    </div>
  );
} 