"use client"

export default function Resume() {
  return (
    <div className="min-h-screen bg-[#141414] flex items-center justify-center p-8">
      <div className="w-full h-full flex flex-col md:flex-row items-start gap-8 md:gap-8">
        {/*Left Section*/}
        <div className="w-full md:w-[300px] flex-shrink-0 flex flex-col justify-between h-full">
          <div className="flex flex-col gap-5">
            <h1 className="text-4xl md:text-6xl font-light italic text-white/80 tracking-tighter leading-[130%]">
              About Me 
            </h1>
            <div className="space-y-4 pt-6">
              <div className="h-px bg-white/10 w-full" />
              <div className="h-pix font-light text-xs text-white/60">
                <div className="md:w-[310px] pl-4">
                  <p className="leading-[200%]">
                    Hi there, I&apos;m Anderson. 
                    <br />
                    <br />
                    
                  </p>
                </div>
              </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

