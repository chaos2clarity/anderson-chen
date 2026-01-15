"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Calendar, Clock, Tag, X, ArrowLeft, ArrowRight } from 'lucide-react';
import { BlogPost } from "@/lib/blog";
import Currentlyat from "@/app/little-stuff/currentlyat";
import FooterConnect from "@/components/footer-connect";
import ProjectsShowcase from "@/components/projects-showcase";
import BottomEditorialLine from "@/components/ui/bottom-editorial-line";
import BlogCard from "@/components/blog-card";

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
  
  const [selectedSideQuest, setSelectedSideQuest] = useState<string | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
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
        
        if (!response.ok) {
          console.error('Blog API response not ok:', response.status, response.statusText);
          setRecentPosts([]);
          return;
        }
        
        const text = await response.text();
        let data;
        
        try {
          data = JSON.parse(text);
        } catch (parseError) {
          console.error('Failed to parse blog API response as JSON:', text.substring(0, 200));
          setRecentPosts([]);
          return;
        }
        
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
      // Responsive scroll amount based on screen size
      const isMobile = window.innerWidth < 640; // sm breakpoint
      const isTablet = window.innerWidth < 768; // md breakpoint
      
      let scrollAmount = 300; // desktop default
      if (isMobile) {
        scrollAmount = 180; // smaller scroll for mobile to show multiple images
      } else if (isTablet) {
        scrollAmount = 240; // medium scroll for tablet
      }
      
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
      <header className="fixed top-0 left-0 right-0 z-40 p-4 md:p-6 lg:p-8">
        <div className="flex justify-between items-center">
          {/* Left: Studio Name */}
          <div className="text-xs sm:text-sm font-light text-white/80 truncate">
            Anderson Chen
          </div>
          
          {/* Center: Desktop Navigation */}
          <nav className="absolute left-1/2 transform -translate-x-1/2 hidden lg:flex space-x-8 text-sm font-light text-white/60">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/pages/arts" className="hover:text-white transition-colors">Arts</Link>
          </nav>
          
          {/* Right: Location - Responsive */}
          <div className="text-xs sm:text-sm font-light text-white/60 text-right">
            {/* Mobile: Just current location */}
            <div className="sm:hidden flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-emerald-300">Now -</span>
              <span className="text-emerald-300">Taipei</span>
            </div>
            {/* Desktop: Full location text */}
          
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 md:pt-5 pb-16 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Main Title */}
          <div className="relative mb-4">
            <div className="max-w-4xl">
              <div className="flex-1">
                {/* Subtitle - directly below name */}
                <div className="mt-32">
                  <p className="text-xs sm:text-sm md:text-base lg:text-base xl:text-base font-light leading-relaxed text-white/60 max-w-2xl">
                    I'm taking a gap year and building <Link 
                    className="text-white transition-colors"
                    href="https://claritynotes.co">clarity</Link>, an AI-powered collaborative LaTeX editor for researchers.
                    <br/>
                    
                  </p>
                </div>

                {/* Bullet Points - following subtitle */}
                <div className="mt-6 pt-3">
                  <ul className="space-y-4 text-sm md:text-base font-light leading-relaxed text-white/60">
                    <Link href="" target="_blank" rel="noopener noreferrer">
                      <li className="flex items-center gap-3 transition-colors hover:text-white">
                        <span className="text-white/20">•</span>
                        <p>
                          Chemical Engineering & Business student at{" "}
                          <span className="text-white decoration-white/30 underline underline-offset-4">
                            NTU-sg & EPFL
                          </span>
                        </p>
                      </li>
                    </Link>
                    
                    <Link href="https://www.shl-medical.com" target="_blank" rel="noopener noreferrer">
                      <li className="flex items-center gap-3 transition-colors hover:text-white">
                        <span className="text-white/20">•</span>
                        <p>
                          Prev. Process Engineering at{" "}
                          <span className="text-white decoration-white/30 underline underline-offset-4">
                            SHL Medical
                          </span>
                        </p>
                      </li>
                    </Link>
                    
                    <Link href="/" target="https://www.ntu.edu.sg" rel="noopener noreferrer">
                      <li className="flex items-center gap-3 transition-colors hover:text-white">
                        <span className="text-white/20">•</span>
                        <p>
                          <span className="text-white decoration-white/30 underline underline-offset-4">
                            Basketball 
                          </span> at NTU (aka bench warmer), FIBA GRIT Asia 3x3 
                        </p>
                      </li>
                    </Link>
                    
                    <Link href="https://www.gapyear.tw/" target="_blank" rel="noopener noreferrer">
                      <li className="flex items-center gap-3 transition-colors hover:text-white">
                        <span className="text-white/20">•</span>
                        <p>
                          Gap Year 2025 Aug - 2026 Aug |{" "}
                          <span className="text-white decoration-white/30 underline underline-offset-4">
                            JGP Fellow #3
                          </span>
                        </p>
                      </li>
                    </Link>
                    
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="relative px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
           {/* Section Header */}
           <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="flex items-end justify-between mb-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-light text-white mb-2">
                   Creative works
                </h2>
                <p className="text-white/60 text-sm md:text-base font-light">
                  Canon G11 & Nikon D750. Wandering with a camera.
                </p>
              </div>
              
               {/* Minimal Toggles */}
              <div className="flex items-center gap-6">
                <button
                  onClick={() => setActiveGallery("photography")}
                  className={`text-sm transition-colors duration-200 ${
                    activeGallery === "photography"
                      ? "text-white"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  Photography
                </button>
                <button
                  onClick={() => setActiveGallery("artworks")}
                  className={`text-sm transition-colors duration-200 ${
                    activeGallery === "artworks"
                      ? "text-white"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  Artworks
                </button>
              </div>
            </div>
          </motion.div>

          {/* Gallery Container */}
          <div className="relative">
            <div
              ref={containerRef}
              className="flex overflow-x-auto overflow-y-hidden scrollbar-hide snap-x snap-mandatory"
              style={{ scrollBehavior: "smooth" }}
            >
              <div className="flex gap-4 min-w-max pb-1"> {/* Bottom padding for hover effects if needed, or just spacing */}
                {currentIndices.map((num, index) => (
                  <motion.div
                    key={num}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative group pb-2" // grouping for hover
                  >
                    <div
                      className="relative 
                      w-[280px] sm:w-[320px] md:w-[360px]
                      aspect-[3/4] 
                      flex-shrink-0 snap-center cursor-pointer overflow-hidden rounded-lg
                      border border-white/5 hover:border-white/10 transition-colors duration-300"
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
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    
                    {/* Caption Below Image */}
                    <div className="mt-3 px-1">
                       <span className="text-[11px] text-[#808080]">
                          {activeGallery === "photography" 
                            ? PHOTOGRAPHY_LOCATIONS[num] 
                            : ARTWORKS_LOCATIONS[num]
                          }
                       </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Gallery Navigation - Simplified */}
            <div className="flex justify-center items-center gap-12 mt-1">
              <button
                onClick={() => scroll("left")}
                className="p-2 text-white/40 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-6 h-6 font-light" strokeWidth={1} />
              </button>

              <button
                onClick={() => scroll("right")}
                className="p-2 text-white/40 hover:text-white transition-colors"
              >
                <ArrowRight className="w-6 h-6 font-light" strokeWidth={1} />
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

      {/* Side Quest Modal */}
      <AnimatePresence>
        {selectedSideQuest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedSideQuest(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg bg-black border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Content for VC */}
              {selectedSideQuest === 'vc' && (
                <div className="p-6 md:p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-light text-white">
                        VC Scout @ Family Office
                      </h2>
                    </div>
                    <button
                      onClick={() => setSelectedSideQuest(null)}
                      className="text-white/40 hover:text-white transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Image */}
                    <div className="relative aspect-[2/1] mb-6 rounded-xl bg-white flex items-center justify-center">
                      <span className="text-4xl md:text-5xl font-light text-black">
                        VC
                      </span>
                    </div>

                  {/* Content */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-light text-white mb-3">Deals screened</h3>
                      <p className="text-white/80 leading-relaxed">
                      
                        - AI surgery + robotics  ($100M raised in prev round)
                        <br/>
                        - Data center services company, invested by multiple chinese tech giants
                        <br/>
                        - Luxury travel & hospitality services startup
                        <br/>
                        - Entertaiment parks project in a SEA country
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-light text-white mb-3">What I'm doing</h3>
                      <p className="text-white/80 leading-relaxed">
                        - I ask good questions to founders and 
                        make things understandable for the chairman. 
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Modal Content for Host */}
              {selectedSideQuest === 'host' && (
                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-light text-white">
                        Bilingual Host
                      </h2>
                    </div>
                    <button
                      onClick={() => setSelectedSideQuest(null)}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Host Images Gallery */}
                  <div className="mb-6">
                    {/* Main Image */}
                    <div className="relative aspect-[2/1] mb-4 rounded-xl overflow-hidden">
                      <Image
                        src="/sidequests/sidequest-host.JPG"
                        alt="Bilingual Host Performance"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                    
                    {/* Additional Images */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative aspect-[3/2] rounded-lg overflow-hidden">
                        <Image
                          src="/sidequests/sidequest-host2.JPG"
                          alt="Host Performance 2"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="relative aspect-[3/2] rounded-lg overflow-hidden">
                        <Image
                          src="/sidequests/sidequesthost-3.JPG"
                          alt="Host Performance 3"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-light text-white mb-3">About the role</h3>
                      <p className="text-white/80 leading-relaxed">
                        I was the host for italian musicians Luca Pincini and Gilda Butta, we performed at over 10+ cities in China, including ByteDance, Peking University (Main), Macau University of Sciences and Technology, GuangZhou Opera and many others.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-light text-white mb-3">Upcoming</h3>
                      <p className="text-white/80 leading-relaxed">
                       Performing again in China and Italy in November 2025! Learned a lot about executing a big event with the team. 
                      </p>
                    </div>

                  </div>
                </div>
              )}

              {/* Modal Content for Sports */}
              {selectedSideQuest === 'sports' && (
                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-light text-white">
                        CAS Sports Science
                      </h2>
                    </div>
                    <button
                      onClick={() => setSelectedSideQuest(null)}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="relative aspect-[2/1] mb-6 rounded-xl overflow-hidden">
                    <Image
                      src="/sidequests/sidequest-sports.jpg"
                      alt="CAS Sports Science"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-light text-white mb-3">The project</h3>
                      <p className="text-white/80 leading-relaxed">
                        Building a science-based jump training program while documenting my personal dunk journey. 
                        Combining sports science research with practical application and content creation.
                        <Link href="https://www.instagram.com/cas.sports.science/" className="text-blue-200 hover:text-blue-100 transition-colors"> @cas.sports.science</Link>
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-light text-white mb-3">Personal motivation</h3>
                      <p className="text-white/80 leading-relaxed">
                        My interest in science was sparked by reading kinesiology papers in highschool because 
                        I was desperately wanting to dunk and had no idea how to improve. After I discovered 
                        science based training through <Link href="https://www.pjfperformance.com" className="text-blue-200 hover:text-blue-100 transition-colors">PJF Performance</Link> and <Link href="https://www.atgonlinecoaching.com" className="text-blue-200 hover:text-blue-100 transition-colors">KOT</Link>, 
                        I was able to improve my vertical jump by a lot (height boost did play a role lol). I wanted to replicate 
                        this experience for others in the mandarin speaking environment.

                      </p>
                    </div>

                  </div>
                </div>
              )}

              {/* Modal Content for Minerva */}
              {selectedSideQuest === 'minerva' && (
                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-light text-white">
                        Mathy
                      </h2>
                    </div>
                    <button
                      onClick={() => setSelectedSideQuest(null)}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="relative aspect-[2/1] mb-6 rounded-xl overflow-hidden">
                    <Image
                      src="/sidequests/Group 6.png"
                      alt="Minerva Application"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-light text-white mb-3">Mathy</h3>
                      <p className="text-white/80 leading-relaxed">
                        Building leetcode for math. 
                        I started a tutoring business in Aug 2024 and scaled it a business that runs automaticaly 
                        and generates $3,000 MRR. I decided to leverage this experience to build something more meaningful. 
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-light text-white mb-3">Personal motivation</h3>
                      <p className="text-white/80 leading-relaxed">
                        We want to change the way people learn maths in Taiwan. 
                      </p>
                    </div>

                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blog Post Modal */}
      <AnimatePresence>
        {selectedBlog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedBlog(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg bg-[#101010] border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8 md:p-12">
                 {/* Close Button */}
                <div className="absolute top-4 right-4 z-10">
                  <button
                    onClick={() => setSelectedBlog(null)}
                    className="text-white/40 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" strokeWidth={1.5} />
                  </button>
                </div>

                {/* Header */}
                <div className="mb-10">
                   {/* Category Badge */}
                   <div className="mb-6">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium 
                      ${selectedBlog.category === 'Gap Year' ? 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20' :
                        selectedBlog.category === 'Career' ? 'bg-blue-400/10 text-blue-400 border-blue-400/20' :
                        selectedBlog.category === 'Life' ? 'bg-orange-400/10 text-orange-400 border-orange-400/20' :
                        'bg-purple-400/10 text-purple-400 border-purple-400/20'} border`}>
                      {selectedBlog.category}
                    </span>
                  </div>

                  <h1 className="text-3xl md:text-5xl font-light leading-tight mb-6 text-white">
                    {selectedBlog.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-6 text-white/50">
                    <div className="flex items-center gap-2">
                       <Calendar className="w-4 h-4" />
                       <span className="text-sm">
                        {new Date(selectedBlog.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                       </span>
                    </div>
                    {selectedBlog.readTime && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{selectedBlog.readTime} min read</span>
                      </div>
                    )}
                  </div>
                </div>
                
                 {/* Content */}
                {/* Content */}
                 <div className="font-light">
                   <ReactMarkdown
                     remarkPlugins={[remarkGfm]}
                     components={{
                       h1: ({node, ...props}) => <h2 className="text-3xl text-white/95 font-light mb-6 mt-12 first:mt-0" {...props} />,
                       h2: ({node, ...props}) => <h3 className="text-2xl text-white/90 font-light mb-4 mt-10" {...props} />,
                       h3: ({node, ...props}) => <h4 className="text-xl text-white/90 font-light mb-3 mt-8" {...props} />,
                       p: ({node, ...props}) => <p className="text-[#B0B0B0] leading-relaxed mb-6 text-lg" {...props} />, // Softer white text
                       ul: ({node, ...props}) => <ul className="list-disc list-outside ml-6 mb-6 text-[#B0B0B0] space-y-2" {...props} />,
                       ol: ({node, ...props}) => <ol className="list-decimal list-outside ml-6 mb-6 text-[#B0B0B0] space-y-2" {...props} />,
                       li: ({node, ...props}) => <li className="pl-1" {...props} />,
                       blockquote: ({node, ...props}) => <blockquote className="border-l-2 border-white/20 pl-6 py-2 my-8 text-white/60 italic leading-relaxed" {...props} />,
                       code: ({node, ...props}: {node?: any, inline?: boolean, className?: string, children?: React.ReactNode} & React.HTMLAttributes<HTMLElement>) => {
                         const match = /language-(\w+)/.exec(props.className || '')
                         const isInline = !match && !String(props.children).includes('\n')
                         return isInline ?
                           <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm text-white/80 font-mono" {...props} /> :
                           <div className="bg-[#151515] p-4 rounded-lg overflow-x-auto mb-6 border border-white/5 my-6">
                             <code className="text-sm font-mono text-white/80" {...props} />
                           </div>
                       },
                       a: ({node, ...props}) => <a className="text-white/90 underline decoration-white/30 underline-offset-4 hover:decoration-white/60 transition-colors" {...props} />,
                       img: ({node, ...props}) => <img className="rounded-lg w-full my-8 border border-white/5" {...props} />,
                       hr: ({node, ...props}) => <hr className="border-white/10 my-10" {...props} />
                     }}
                   >
                     {selectedBlog.content}
                   </ReactMarkdown>
                 </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side-by-Side: Magazine Blog & Projects */}
      <section className="relative py-24 px-6 lg:px-28">
        <div className="max-w-8xl mx-auto">

          
          {/* Vertical Layout: Blogs then Projects */}
          <div className="space-y-32">
            
            {/* Blog Section */}
            <div>
              {/* Header */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-light text-white mb-2">
                       Latest thoughts
                    </h2>
                    <p className="text-white/60 text-sm md:text-base font-light">
                      Writing about tech, life, and the in-between.
                    </p>
                  </div>
                  <Link href="/pages/blogs" className="text-sm text-white/40 hover:text-white transition-colors border-b border-white/10 pb-1 hover:border-white">
                    View all posts →
                  </Link>
                </div>
              </motion.div>

              {/* Cursor-style Grid Layout - 3 Columns now since it is full width */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                   // Loading Skeletons
                  [1, 2, 3].map((i) => (
                    <div key={i} className="h-64 bg-white/5 rounded-lg animate-pulse border border-white/5"></div>
                  ))
                ) : recentPosts && recentPosts.length > 0 ? (
                  recentPosts.map((post: any, index: number) => (
                    <motion.div
                      key={post.slug}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="h-full"
                    >
                      <BlogCard post={post} onClick={(post) => setSelectedBlog(post)} />
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12 text-white/40 bg-white/5 rounded-lg border border-white/5">
                    <p>No blog posts found.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Projects Section */}
            <div className="relative">
              {/* Projects Header */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-light leading-tight mb-2">
                      Selected projects 
                    </h2>
                    <p className="text-white/60 text-sm md:text-base font-light">
                      Stuff I've built.
                    </p>
                  </div>
                </div>
              </motion.div>
              {/* ClarityNotes Project Card */}

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 <ProjectsShowcase />
               </div>

                {/* Side Quests Section - Unified (Mobile & Desktop) */}
                {/* Removed duplicate mobile section in favor of unified list below */}
            </div>
          </div>


          
        </div>
      </section>

      {/* Side Quests List - Desktop Only */}
      <section className="relative py-24 px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Minimal Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12 flex items-baseline justify-between border-b border-white/10 pb-4"
          >
             <h2 className="text-2xl font-light text-white tracking-tight">
                Side quests
             </h2>
             <span className="text-sm text-white/40 font-mono">
                Experiments & Explorations
             </span>
          </motion.div>

          {/* List Container */}
          <div className="space-y-0">
             {/* Mathy */}
             <motion.div
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.5, delay: 0.1 }}
               viewport={{ once: true }}
               onClick={() => setSelectedSideQuest('minerva')}
               className="group flex items-center justify-between py-6 border-b border-white/5 cursor-pointer hover:bg-white/[0.02] transition-colors px-2"
             >
                <div>
                   <h3 className="text-lg font-light text-white/90 group-hover:text-white transition-colors">
                      Mathy
                   </h3>
                   <p className="text-sm text-white/40 mt-1 font-light group-hover:text-white/60 transition-colors">
                      Building leetcode for math.
                   </p>
                </div>
                <ArrowRight className="w-5 h-5 text-white/10 group-hover:text-white/60 transition-colors transform group-hover:translate-x-1" strokeWidth={1} />
             </motion.div>

             {/* Bilingual Host */}
             <motion.div
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.5, delay: 0.2 }}
               viewport={{ once: true }}
               onClick={() => setSelectedSideQuest('host')}
               className="group flex items-center justify-between py-6 border-b border-white/5 cursor-pointer hover:bg-white/[0.02] transition-colors px-2"
             >
                <div>
                   <h3 className="text-lg font-light text-white/90 group-hover:text-white transition-colors">
                      Bilingual Host
                   </h3>
                   <p className="text-sm text-white/40 mt-1 font-light group-hover:text-white/60 transition-colors">
                      Hosting Italian musicians Luca Pincini & Gilda Butta across 10+ cities in China.
                   </p>
                </div>
                <ArrowRight className="w-5 h-5 text-white/10 group-hover:text-white/60 transition-colors transform group-hover:translate-x-1" strokeWidth={1} />
             </motion.div>

             {/* CAS Sports Science */}
             <motion.div
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.5, delay: 0.3 }}
               viewport={{ once: true }}
               onClick={() => setSelectedSideQuest('sports')}
               className="group flex items-center justify-between py-6 border-b border-white/5 cursor-pointer hover:bg-white/[0.02] transition-colors px-2"
             >
                <div>
                   <h3 className="text-lg font-light text-white/90 group-hover:text-white transition-colors">
                      CAS Sports Science
                   </h3>
                   <p className="text-sm text-white/40 mt-1 font-light group-hover:text-white/60 transition-colors">
                      Science-based jump training program & dunk journey documentation.
                   </p>
                </div>
                <ArrowRight className="w-5 h-5 text-white/10 group-hover:text-white/60 transition-colors transform group-hover:translate-x-1" strokeWidth={1} />
             </motion.div>

             {/* VC Scout */}
             <motion.div
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.5, delay: 0.4 }}
               viewport={{ once: true }}
               onClick={() => setSelectedSideQuest('vc')}
               className="group flex items-center justify-between py-6 border-b border-white/5 cursor-pointer hover:bg-white/[0.02] transition-colors px-2"
             >
                <div>
                   <h3 className="text-lg font-light text-white/90 group-hover:text-white transition-colors">
                      Scout @ Family Office
                   </h3>
                   <p className="text-sm text-white/40 mt-1 font-light group-hover:text-white/60 transition-colors">
                      Late stage VC investments in tech & infrastructure.
                   </p>
                </div>
                <ArrowRight className="w-5 h-5 text-white/10 group-hover:text-white/60 transition-colors transform group-hover:translate-x-1" strokeWidth={1} />
             </motion.div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative py-20 px-6 md:px-8 border-t border-white/10">
        <FooterConnect />
      </section>
    </div>
  );
} 