"use client"
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import BottomEditorialLine from "@/components/ui/bottom-editorial-line";
import FooterConnect from "@/components/footer-connect";

// Location mappings from main page
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

// Image data with categories and locations
const photography_template = [
  { id: 0, category: "people", aspect: "portrait" },
  { id: 1, category: "nature", aspect: "landscape" },
  { id: 2, category: "urban", aspect: "portrait" },
  { id: 3, category: "nature", aspect: "landscape" },
  { id: 4, category: "urban", aspect: "portrait" },
  { id: 6, category: "nature", aspect: "landscape" },
  { id: 7, category: "people", aspect: "portrait" },
  { id: 8, category: "urban", aspect: "landscape" },
  { id: 9, category: "nature", aspect: "portrait" },
  { id: 11, category: "people", aspect: "landscape" },
  { id: 12, category: "urban", aspect: "portrait" },
];

const PHOTOGRAPHY_IMAGES = photography_template.map(img => ({
  ...img,
  location: PHOTOGRAPHY_LOCATIONS[img.id] || "Unknown Location"
}));

const ARTWORK_IMAGES = [
  { id: 1, location: "封建社會 - 女 (2022)", category: "mixed", aspect: "square" },
  { id: 2, location: "封建社會 - 男 (2022)", category: "mixed", aspect: "portrait" },
  { id: 3, location: "夜 (2022)", category: "traditional", aspect: "landscape" },
  { id: 4, location: "地鐵 (2022)", category: "traditional", aspect: "square" },
];

const Arts = () => {
  const [activeCategory, setActiveCategory] = useState<"all" | "photography" | "artworks">("all");
  const [selectedImage, setSelectedImage] = useState<{
    id: number;
    type: "photography" | "artworks";
    location: string;
  } | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const getFilteredImages = () => {
    let images: any[] = [];
    
    if (activeCategory === "all" || activeCategory === "photography") {
      images = [...images, ...PHOTOGRAPHY_IMAGES.map(img => ({ ...img, type: "photography" }))];
    }
    
    if (activeCategory === "all" || activeCategory === "artworks") {
      images = [...images, ...ARTWORK_IMAGES.map(img => ({ ...img, type: "artworks" }))];
    }

    if (filter === "all") return images;
    return images.filter(img => img.category === filter);
  };

  const filteredImages = getFilteredImages();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-lg font-light text-white/80 hover:text-white transition-colors">
              ← Anderson Chen
            </Link>
            
            <div className="flex items-center space-x-8">
              <nav className="hidden md:flex space-x-6 text-sm font-light text-white/60">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <Link href="/pages/projects" className="hover:text-white transition-colors">Projects</Link>
                <Link href="/pages/blogs" className="hover:text-white transition-colors">Blogs</Link>
              </nav>
              
              <div className="text-sm font-light text-white/60">
                <span className="text-emerald-300">Gallery</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6"
            >
              Arts & <span className="italic">Photography</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed"
            >
              A visual journey through my creative expression — from the streets of Asia 
              to the quiet corners of my studio, capturing moments and creating worlds.
            </motion.p>
          </div>

          {/* Category Toggle */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center mb-8"
          >
            <div className="flex items-center space-x-1 bg-white/5 rounded-full p-1 backdrop-blur-sm">
              {["all", "photography", "artworks"].map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category as any);
                    setFilter("all");
                  }}
                  className={`px-6 py-3 rounded-full text-sm font-light transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-white text-black shadow-lg"
                      : "text-white/60 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Sub-filters */}
          {activeCategory !== "all" && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="flex justify-center mb-12"
            >
              <div className="flex flex-wrap justify-center gap-3">
                {["all", "urban", "nature", "people", "digital", "traditional", "mixed"].map((filterOption) => (
                  <button
                    key={filterOption}
                    onClick={() => setFilter(filterOption)}
                    className={`px-4 py-2 rounded-full text-xs font-light border transition-all duration-300 ${
                      filter === filterOption
                        ? "border-blue-400 text-blue-400 bg-blue-400/10"
                        : "border-white/20 text-white/40 hover:text-white/80 hover:border-white/40"
                    }`}
                  >
                    {filterOption}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Masonry Gallery */}
      <section className="px-6 md:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            layout
            className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
          >
            <AnimatePresence>
              {filteredImages.map((image, index) => (
                <motion.div
                  key={`${image.type}-${image.id}`}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="break-inside-avoid mb-6 group cursor-pointer"
                  onClick={() => setSelectedImage({
                    id: image.id,
                    type: image.type as "photography" | "artworks",
                    location: image.location
                  })}
                >
                  <div className="relative overflow-hidden rounded-2xl bg-white/5">
                    <div className={`relative ${
                      image.aspect === "portrait" ? "aspect-[3/4]" : 
                      image.aspect === "landscape" ? "aspect-[4/3]" : 
                      "aspect-square"
                    }`}>
                      <Image
                        src={`/${image.type === "photography" ? "photo" : "artworks"}${image.id}.jpg`}
                        alt={`${image.type} ${image.id}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        
                        {/* Location */}
                        <div className="absolute top-4 right-4">
                          <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2">
                            <p className="text-white text-sm font-light">
                              {image.location}
                            </p>
                          </div>
                        </div>

                        {/* Category Badge */}
                        <div className="absolute bottom-4 left-4">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              image.type === "photography" ? "bg-blue-400" : "bg-emerald-400"
                            }`}></div>
                            <span className="text-white/80 text-sm font-light capitalize">
                              {image.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredImages.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-white/40 text-lg">No images found for the selected filter</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-7xl max-h-[90vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={`/${selectedImage.type === "photography" ? "photo" : "artworks"}${selectedImage.id}.jpg`}
                alt={`${selectedImage.type} ${selectedImage.id}`}
                fill
                className="object-contain rounded-lg"
                quality={100}
              />
              
              {/* Info Bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <div className="flex justify-between items-center text-white">
                  <div>
                    <h3 className="text-xl font-light mb-1">
                      {selectedImage.type === "photography" ? "Photography" : "Artwork"} #{selectedImage.id}
                    </h3>
                    <p className="text-white/60">{selectedImage.location}</p>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    selectedImage.type === "photography" ? "bg-blue-400" : "bg-emerald-400"
                  }`}></div>
                </div>
              </div>

              {/* Close Button */}
              <button
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm 
                  flex items-center justify-center text-white/60 hover:text-white hover:bg-black/70 
                  transition-all duration-300"
                onClick={() => setSelectedImage(null)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      
      {/* Bottom Editorial Line */}
      
      <BottomEditorialLine />   

      {/* Footer CTA */}
      <section className="mt-10 pt-2 pb-10">
        <FooterConnect /> 
      </section>
      
    </div>
  );
};

export default Arts;
