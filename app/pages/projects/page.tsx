"use client";
import { useState, useRef, useEffect } from "react";
import Currentlyat from "@/app/little-stuff/currentlyat";
import DynamicFrameLayout from "@/designcomposnent/DynamicFrameLayout";
import Folder from "@/app/designcomponents/folder";
import Image from "next/image";
import Link from "next/link";

export default function Projects() {
  const [headerSize, setHeaderSize] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<{
    num: number;
    type: "photography" | "artworks";
  } | null>(null);
  const [activeGallery, setActiveGallery] = useState<
    "photography" | "artworks"
  >("photography");
  const [currentIndices, setCurrentIndices] = useState<number[]>([]);

  const photographyIndices = [3, 0, 1, 2, 4, 6, 7, 8, 9, 11, 12];
  const artworksIndices = [1, 2, 3, 4];

  useEffect(() => {
    const currentIndices =
      activeGallery === "photography" ? photographyIndices : artworksIndices;
    setCurrentIndices(currentIndices);
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
    <div className="min-h-screen bg-[#141414] flex items-center justify-center p-8">
      <div className="w-full h-full flex flex-col md:flex-row items-start gap-8 md:gap-8">
        {/*Left Section*/}
        <div className="w-full md:w-[300px] flex-shrink-0 flex flex-col justify-between h-full">
          <div className="flex flex-col gap-5">
            <h1
              className="text-4xl md:text-6xl font-light 
            space-y-4 italic text-white/80 tracking-tighter leading-[130%]"
              style={{ fontSize: `${4 * headerSize}rem` }}
            >
              Anderson Chen
            </h1>
            <h2 className="text-sm font-light text-white/80 text-center pt-6">
              <b>Chemical Engineering & Business</b> at{" "}
              <p className="hover:text-red-400">
                Nanyang Technological University & EPFL
              </p>
            </h2>
            <div className="space-y-4 pt-6">
              <div className="h-px bg-white/10 w-full" />
              <Currentlyat />
            </div>
            <div className="h-pix font-light text-xs text-white/60">
              <div className="md:w-[310px] pl-4">
                <p className="leading-[200%]">
                  Hi! I'm Anderson, I was an aspiring artist who decided to
                  pursue a career in chemical engineering 5 months before high
                  school graduation because I fell in love with differential
                  equation and biology. In college, I had to study classes like
                  organic chemistry, physics with no prior knowledge from high
                  school, but these experiences helped me to build a system for
                  learning and adapting to new knowledge fast. I'm currently
                  teaching myself how to code and design things people want.
                  Taking a gap year from 2025 July to 2026 July to fully invest
                  myself in the world of tech!
                  <br />
                  <br />
                  In my spare time, I like to {""}{" "}
                  <a
                    href="https://youtu.be/G4VDvKo2B8U"
                    className="text-red-400 hover:text-red-200"
                  >
                    <b>listen & make podcasts</b>
                  </a>
                  , read history books, play basketball. and talk to different
                  people. Sometimes I yap on my blog. Feel free to reach out to
                  me :D
                </p>
              </div>
            </div>
          </div>
        </div>

        {/*Right Section*/}
        <div className="w-full md:w-[calc(100%-340px)] lg:w-[calc(100%-340px)] flex flex-col gap-8">
          <div className="flex flex-row flex-start h-[29vh] gap-5">
            <div className="flex flex-col gap-5">
              {/* Sections*/}
              <a
                className="text-white/60 hover:text-white/80 font text-3xl italic"
                href="/pages/arts & photography"
              >
                chemical engineering
              </a>
              <a
                className="text-white/60 hover:text-white/80 font text-3xl italic"
                href="/pages/blogs"
              >
                blogs
              </a>
              <a
                className="text-white/60 hover:text-white/80 font text-3xl italic"
                href="/pages/projects"
              >
                arts & photography
              </a>
            </div>
            <div className="justify-between gap-5">
              
            </div>
          </div>
          {/* top right section*/}

          {/* Horizontal Gallery with Navigation */}
          <div className="relative w-full mt-40">
            <div className="items-center flex relative justify-center">
              <Link
                className="text-sm text-white/60 hover:text-white/90 transition-colors"
                href="/pages/arts"
              >
                see full gallery
              </Link>
            </div>

            <div
              ref={containerRef}
              className="flex overflow-x-auto overflow-y-hidden scrollbar-hide snap-x snap-mandatory w-full"
              style={{ scrollBehavior: "smooth" }}
            >
              <div className="flex gap-6 p-4 min-w-max">
                {currentIndices.map((num) => (
                  <div
                    key={num}
                    className="relative w-[17vw] 
                    min-w-[260px] max-w-[400px] aspect-[3/4] flex-shrink-0 snap-center cursor-pointer"
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
                      className="object-cover rounded-lg hover:scale-[1.02] transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Image Modal */}
            {selectedImage !== null && (
              <div
                className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
                onClick={() => setSelectedImage(null)}
              >
                <div className="relative w-[80vw] h-[80vh]">
                  <Image
                    src={`/${selectedImage.type === "photography" ? "photo" : "artworks"}${selectedImage.num}.jpg`}
                    alt={`${selectedImage.type === "photography" ? "Photo" : "Artwork"} ${selectedImage.num}`}
                    fill
                    className="object-contain"
                    quality={100}
                  />
                  <button
                    className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(null);
                    }}
                  >
                    ×
                  </button>
                </div>
              </div>
            )}

            {/* Navigation Arrows */}
            <div className="flex justify-between w-full mt-4">
              <button
                onClick={() => scroll("left")}
                className="px-4 py-2 text-white/60 hover:text-white/90 transition-colors text-2xl"
              >
                ←
              </button>
              <div className="">
                <button
                  onClick={() => setActiveGallery("photography")}
                  className={`px-4 py-2 font-light 
                    ${
                      activeGallery === "photography"
                        ? "text-white/90"
                        : "text-white/60"
                    } hover:text-white/90 transition-colors sm:text-sm md:text-xl`}
                >
                  photography.
                </button>

                <button
                  onClick={() => setActiveGallery("artworks")}
                  className={`px-4 py-2 font-light 
                    ${
                      activeGallery === "artworks"
                        ? "text-white/90"
                        : "text-white/60"
                    } hover:text-white/90 transition-colors sm:text-sm md:text-xl`}
                >
                  artworks.
                </button>
              </div>
              <button
                onClick={() => scroll("right")}
                className="px-4 py-2 text-white/60 font-light hover:text-white/90 transition-colors sm:text-sm md:text-xl"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
