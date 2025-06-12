"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Currentlyat from "@/app/little-stuff/currentlyat";

// Move constants outside component
const PHOTOGRAPHY_INDICES = [3, 0, 1, 2, 4, 6, 7, 8, 9, 11, 12];
const ARTWORKS_INDICES = [1, 2, 3, 4];

// Location mappings for each image
const PHOTOGRAPHY_LOCATIONS: Record<number, string> = {
  0: "Milan, Italy",
  1: "Jungfrau, Switzerland",
  2: "Paris, France",
  3: "Lausanne, Switzerland",
  4: "Paris, France",
  6: "The Alps, Somwhere High Up",
  7: "Oregon, United States",
  8: "Zurich, Switzerland",
  9: "EPFL Campus, Lausanne",
  11: "Yilan, Taiwan",
  12: "Singapore, Singapore"
};

const ARTWORKS_LOCATIONS: Record<number, string> = {
  1: "Studio A",
  2: "Studio B", 
  3: "Studio C",
  4: "Studio D"
};

export default function Projects() {
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
            <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
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
      <section className="relative px-10 md:px-20">
        <div className="max-w-8xl lg:mx-32 md:mx-20 sm:mx-auto">
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
                  <div
                    key={`${activeGallery}-${num}`}
                    className="relative group opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div
                      className="relative w-[20vw] min-w-[280px] max-w-[400px] aspect-[3/4] 
                      flex-shrink-0 snap-center cursor-pointer overflow-hidden rounded-2xl
                      transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-blue-500/30"
                      onClick={() => setSelectedImage({ num, type: activeGallery })}
                    >
                      <Image
                        src={`/${activeGallery === "photography" ? "photo" : "artworks"}${num}.jpg`}
                        alt={`${activeGallery} image ${num}`}
                        fill
                        className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-4 text-white">
                        <p className="text-sm font-light">
                          {activeGallery === "photography" ? PHOTOGRAPHY_LOCATIONS[num] : ARTWORKS_LOCATIONS[num]}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scroll Buttons */}
            <button 
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white/10 p-3 rounded-full 
              hover:bg-white/20 transition-colors z-20 backdrop-blur-sm"
            >
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 bg-white/10 p-3 rounded-full 
              hover:bg-white/20 transition-colors z-20 backdrop-blur-sm"
            >
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="relative px-6 md:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="w-full h-[1px] bg-white/20 mb-12"></div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-light mb-4">
                thoughts & stories
              </h2>
              <p className="text-white/60 text-sm md:text-base max-w-md">
                Latest articles from my blog. Sharing experiences from my journey. 
              </p>
            </div>
            <Link href="/pages/blogs">
              <span className="text-sm font-light text-white/60 hover:text-white transition-colors flex items-center gap-2">
                View all posts
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              // Skeleton loaders
              [1, 2, 3].map(i => (
                <div key={i} className="animate-pulse">
                  <div className="h-48 bg-white/5 rounded-2xl mb-4"></div>
                  <div className="h-4 bg-white/10 rounded w-1/3 mb-2"></div>
                  <div className="h-6 bg-white/10 rounded w-3/4"></div>
                </div>
              ))
            ) : (
              // Actual posts
              recentPosts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="group">
                      <div className="relative overflow-hidden rounded-2xl bg-white/5 mb-4">
                        <div className="aspect-[16/9] bg-cover bg-center" style={{ backgroundImage: `url(${post.image || '/placeholder-image.jpg'})`}}></div>
                      </div>
                      <p className="text-white/40 text-sm mb-1">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      <h3 className="text-lg font-light text-white/90 group-hover:text-white transition-colors">
                        {post.title}
                      </h3>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative px-6 md:px-8 py-20 bg-gradient-to-t from-gray-900/50 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="w-full h-[1px] bg-white/20 mb-12"></div>
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-light mb-4">
              get in touch
            </h2>
            <p className="text-white/60 text-sm md:text-base max-w-md mx-auto mb-8">
              I'm always open to new opportunities and collaborations. 
              Feel free to reach out.
            </p>
            <Link href="/pages/contact">
              <span className="bg-white text-black font-medium px-8 py-4 rounded-full hover:bg-gray-200 transition-colors">
                Contact Me
              </span>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="px-6 md:px-8 py-8 text-center text-white/40 text-sm font-light">
        <p>© {new Date().getFullYear()} Anderson Chen. All rights reserved.</p>
        <p>Built with Next.js, Tailwind CSS, and Framer Motion. Deployed on Vercel.</p>
      </footer>

      {/* Modal for viewing images */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative w-full h-full max-w-3xl max-h-[80vh]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { delay: 0.1 } }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <Image
                src={`/${selectedImage.type === "photography" ? "photo" : "artworks"}${selectedImage.num}.jpg`}
                alt={`${selectedImage.type} image ${selectedImage.num}`}
                fill
                className="object-contain rounded-lg"
              />
            </motion.div>
            
            {/* Close button */}
            <button className="absolute top-6 right-6 text-white text-2xl z-50">
              &times;
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Helper function to get location based on type and number
function getLocation(type: "photography" | "artworks", num: number): string {
  if (type === "photography") {
    return PHOTOGRAPHY_LOCATIONS[num] || "Unknown Location";
  }
  return ARTWORKS_LOCATIONS[num] || "Unknown Studio";
}
