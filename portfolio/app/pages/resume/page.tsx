"use client"

export default function Resume() {
  return (
    <div className="min-h-screen bg-[#141414] flex items-center justify-center p-8">
      <div className="w-full h-full flex flex-col md:flex-row items-start gap-8 md:gap-8">
        {/*Left Section*/}
        <div className="w-full md:w-[300px] flex-shrink-0 flex flex-col justify-between h-full">
          <div className="flex flex-col gap-5">
            <h1 className="text-4xl md:text-6xl font-light italic text-white/80 tracking-tighter leading-[130%]">
              Resume & Work
            </h1>
            <div className="space-y-4 pt-6">
              <div className="h-px bg-white/10 w-full" />
              <div className="h-pix font-light text-xs text-white/60">
                <div className="md:w-[310px] pl-4">
                  <p className="leading-[200%]">
                    Here's my resume. I'm currently open to opportunities in software engineering,
                    product design, and chemical engineering.
                    <br />
                    <br />
                    Feel free to download it or reach out to me if you'd like to chat!
                  </p>
                </div>
              </div>
            </div>
            {/* Download Button */}
            <a 
              href="/Anderson-Chen-2025-Feb-16.pdf" 
              download
              className="inline-block px-6 py-3 mt-4 text-white/70 border border-white/20 
                rounded-full font-medium hover:bg-white/5 transition-colors text-center"
            >
              Download PDF
            </a>
          </div>
        </div>

        {/*Right Section - PDF Viewer*/}
        <div className="w-full md:w-[calc(100%-340px)] h-[80vh] bg-zinc-900 rounded-lg overflow-hidden">
          <iframe
            src="/Anderson-Chen-2025-Feb-16.pdf#view=FitH"
            className="w-full h-full"
            style={{ border: 'none' }}
          />
        </div>
      </div>
    </div>
  );
}

