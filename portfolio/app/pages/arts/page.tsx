"use client"
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const Arts = () => {
    const [headerSize] = useState(1);
    const containerRef = useRef<HTMLDivElement>(null);

    // Handle scroll to horizontal translation
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            container.scrollLeft += e.deltaY;
        };

        container.addEventListener('wheel', handleWheel);
        return () => container.removeEventListener('wheel', handleWheel);
    }, []);

    return ( 
      <div className="min-h-screen bg-[#141414] flex items-start p-8">
        <div className="w-full h-full flex flex-col gap-8">
          {/* Top Section */}
          <div className="w-full md:w-[300px] flex-shrink-0">
            <div className="flex flex-col gap-5">
              <h1 className="text-4xl font-light italic text-white/80 tracking-tighter leading-[120%]"
                  style={{ fontSize: `${4 * headerSize}rem` }}>
                Arts & Photography
              </h1>
              
              <div className="space-y-4 pt-6">
                <div className="h-px bg-white/10 w-full" />
                <div className="h-pix font-light text-xs text-white/60">
                  <div className="md:w-[310px] pl-4">
                    <p className="leading-[200%]">
                      I started drawing when I was 3, and it has been my way of expressing myself.
                      Here you'll find a collection of my artworks, from traditional mediums to digital art.
                      Photography became another passion when I discovered how it could capture moments and emotions
                      in ways that complement my artistic vision.
                      <br />
                      <br />
                      This space showcases selected works from my journey as an artist and photographer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>          

          {/* Horizontal Gallery */}
          <div className="w-full overflow-hidden">
            <div 
              ref={containerRef}
              className="flex overflow-x-auto overflow-y-hidden scrollbar-hide snap-x snap-mandatory"
              style={{ scrollBehavior: 'smooth' }}
            >
              <div className="flex gap-8 p-4">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <div 
                    key={num}
                    className="relative w-[400px] h-[500px] flex-shrink-0 snap-center"
                  >
                    <Image
                      src={`/photo${num}.jpg`}
                      alt={`Photo ${num}`}
                      fill
                      className="object-cover rounded-lg hover:scale-[1.02] transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Arts;