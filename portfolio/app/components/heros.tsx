"use client"
import Image from "next/image";
import { useEffect, useState } from "react";

const Heros = () => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return ( 
        <div className="relative">
            {/* First section with floating island */}
            <section className="min-h-screen flex items-center relative">   
                <div className="container mx-auto">
                    <img 
                        src="/mainisland.png" 
                        alt="island1" 
                        className="max-w-[70%] mx-auto h-auto animate-float-slow transition-transform duration-700"
                        style={{
                            transform: `translateY(-${scrollY * 0.2}px)`, // Reduced scroll speed
                            opacity: Math.max(1 - scrollY / (window.innerHeight * 0.8), 0)
                        }}
                    />     
                </div>
            </section>

            {/* Second section that appears as user scrolls down */}
            <section className="min-h-screen bg-gradient-to-b from-white to-sky-100">
                <div className="container mx-auto px-4 py-20">
                    <h2 className="pixel-text text-2xl text-center mb-10">Welcome to my world</h2>
                    {/* Add more content here */}
                </div>
            </section>

            {/* Third section */}
            <section className="min-h-screen bg-sky-100">
                <div className="container mx-auto px-4 py-20">
                    {/* Add more content here */}
                </div>
            </section>
        </div>
     );
}

export default Heros;