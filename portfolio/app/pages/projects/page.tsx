'use client'
import { useState } from 'react';
import Currentlyat from '@/app/little-stuff/currentlyat';

export default function Projects() {
  const [headerSize, setHeaderSize] = useState(1);
  return (
    <div className="min-h-screen bg-[#141414] flex items-center justify-center p-8">
      <div className="w-full h-full flex flex-col md:flex-row items-start gap-8 md:gap-8">
        {/*Left Section*/}
        <div className="w-full md:w-[300px] flex-shrink-0 flex flex-col justify-between h-full">
          <div className="flex flex-col gap-5">
            <h1 className="text-4xl md:text-6xl font-light 
            space-y-4 italic text-white/80 tracking-tighter leading-[130%]"
              style={{fontSize: `${4*headerSize}rem`}}>
                Anderson Chen
            </h1>
            <h2 className="text-sm font-light text-white/80 text-center pt-6">
            <b>Chemical Engineering & Business</b> at <p className="hover:text-red-400">Nanyang Technological University & EPFL</p>
            </h2>
            <div className="space-y-4 pt-6">
              <div className="h-px bg-white/10 w-full"/>
              <Currentlyat />
            </div>
            <div className="h-pix font-light text-xs text-white/60">
              <div className="md:w-[310px] pl-4">
                <p className="leading-[200%]">
                  Hi! I'm Anderson, 
                  I was an aspiring artist who decided to pursue a career in 
                  chemical engineering 5 months before high school graduation because 
                  I fell in love with differential equation and biology. 
                  In college, I had to study classes like organic chemistry, physics with 
                  no prior knowledge from high school, but these experiences helped me to 
                  build a system for learning and adapting to new knowledge fast.
                  I'm currently teaching myself how to code and design things people want. 
                  Taking a gap year from 2025 July to 2026 July to fully invest myself in the world of tech! 
                  <br/>
                  <br/>

                  In my spare time, I like to {""} <a href="https://youtu.be/G4VDvKo2B8U" className="text-red-400 hover:text-red-200">  
                  <b>listen & make podcasts</b></a>, read history books, play basketball. 
                  and talk to different people. Sometimes I yap on my blog. Feel free to reach out to me :D
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*Right Section*/}
    </div>   
  )
}   
