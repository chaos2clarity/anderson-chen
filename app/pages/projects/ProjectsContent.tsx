"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// Move constants outside component
const PHOTOGRAPHY_INDICES = [0, 1, 2, 3, 4, 6, 7, 8, 9, 11, 12];
const ARTWORKS_INDICES = [1, 2, 3, 4];

export default function ProjectsContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<{
    num: number;
    type: "photography" | "artworks";
  } | null>(null);
  const [activeGallery, setActiveGallery] = useState<
    "photography" | "artworks"
  >("photography");
  const [currentIndices, setCurrentIndices] = useState<number[]>(PHOTOGRAPHY_INDICES);

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
            Anderson Chen&apos;s Studio
          </div>
          
          {/* Centered Navigation */}
          <nav className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex space-x-8 text-sm font-light text-white/60">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/pages/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/pages/projects" className="hover:text-white transition-colors">Projects</Link>
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
                    Hi, I&apos;m Anderson, I&apos;m an aspiring artist (or a social science major) who turned chemical engineer because I fell in love with science during my exploration of sports science papers in highschool. 
                    I enjoy creating art pieces, playing basketball, and reading history books.  
                  </p>
                </div>

                {/* Bullet Points - following subtitle */}
                <div className="mt-6 pt-3">
                  <ul className="space-y-4 text-sm md:text-base font-light leading-relaxed text-white/60">
                    <li className="flex items-start gap-4 group">
                      <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0 group-hover:shadow-lg group-hover:shadow-blue-400/50 transition-all duration-300"></div>
                      <p>
                        Chemical Engineering & Business student at{" "}
                        <span className="underline decoration-blue-400 decoration-2 underline-offset-2 text-white/80 font-medium">
                          NTU & EPFL
                        </span>
                      </p>
                    </li>
                    
                    <li className="flex items-start gap-4 group">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0 group-hover:shadow-lg group-hover:shadow-emerald-400/50 transition-all duration-300"></div>
                      <p>
                        Process Engineering Intern at{" "}
                        <span className="underline decoration-emerald-400 decoration-2 underline-offset-2 text-white/80 font-medium">
                          SHL Medical
                        </span>
                      </p>
                    </li>
                    
                    <li className="flex items-start gap-4 group">
                      <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0 group-hover:shadow-lg group-hover:shadow-orange-400/50 transition-all duration-300"></div>
                      <p>
                        <span className="underline decoration-orange-400 decoration-2 underline-offset-2 text-white/80 font-medium">
                          Student Athlete 
                        </span> NTU Varsity Basketball (23-24), FIBA GRIT Asia 3x3 
                      </p>
                    </li>
                    
                    <li className="flex items-start gap-4 group">
                      <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0 group-hover:shadow-lg group-hover:shadow-purple-400/50 transition-all duration-300"></div>
                      <p>
                        Gap Year 2025-2026 |{" "}
                        <span className="underline decoration-purple-400 decoration-2 underline-offset-2 text-white/80 font-medium">
                          JGP Fellow #3
                        </span>
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Illustration */}
              <div className="hidden md:block flex-shrink-0">
                <div className="w-[25vw] h-[35vw] lg:w-[30vw] lg:h-[40vw] relative">
                  <Image
                    src="/anderson-illustration.svg"
                    alt="Anderson Chen illustration"
                    fill
                    className="object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
                    priority
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
              <h2 className="text-3xl md:text-5xl font-light mb-4">
                Creative Works
              </h2>
              <p className="text-white/60 text-sm md:text-base max-w-md">
                A collection of my photography and artistic expressions, 
                capturing moments and creating visual stories.
              </p>
            </div>
            {/* Gallery Toggle */}
            <div className="flex items-center space-x-8">
              <button
                onClick={() => setActiveGallery("photography")}
                className={`text-xl md:text-2xl font-light transition-all duration-300 ${
                  activeGallery === "photography"
                    ? "text-white border-b-2 border-blue-400"
                    : "text-white/40 hover:text-white/80"
                }`}
              >
                Photography
              </button>
              <button
                onClick={() => setActiveGallery("artworks")}
                className={`text-xl md:text-2xl font-light transition-all duration-300 ${
                  activeGallery === "artworks"
                    ? "text-white border-b-2 border-green-400"
                    : "text-white/40 hover:text-white/80"
                }`}
              >
                Artworks
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
                        sizes="(max-width: 768px) 280px, (max-width: 1200px) 20vw, 400px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery Navigation */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={() => scroll("left")}
                className="p-4 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 
                transition-all duration-300 group"
                aria-label="Scroll left"
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
                aria-label="Scroll right"
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
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-[90vw] h-[90vh] max-w-6xl">
            <Image
              src={`/${selectedImage.type === "photography" ? "photo" : "artworks"}${selectedImage.num}.jpg`}
              alt={`${selectedImage.type === "photography" ? "Photo" : "Artwork"} ${selectedImage.num}`}
              fill
              className="object-contain rounded-lg"
              quality={100}
              sizes="90vw"
            />
            <button
              className="absolute -top-12 right-0 text-white/60 hover:text-white 
              text-4xl font-light transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              aria-label="Close modal"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Footer CTA */}
      <section className="relative py-20 px-6 md:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl md:text-4xl font-light mb-6">
            Let&apos;s create something amazing together
          </h3>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <Link
              href="/pages/about"
              className="px-8 py-4 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors text-sm font-medium"
            >
              Get to know me
            </Link>
            <Link
              href="/pages/resume"
              className="px-8 py-4 border border-white/20 hover:bg-white/10 rounded-full transition-colors text-sm font-light"
            >
              View my experience
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 