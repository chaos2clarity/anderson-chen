export default function Currentlyat() {
    return ( 
        <div className="space-y-4 p-4">
            {/* Header Section */}
            <h2 className="text-sm font-medium mb-4 text-white/80">What I'm up to:</h2>

            {/* Activity List */}
            <ul className="space-y-3">
                {/* Current Job - Process Engineering */}
                <li className="group flex items-center gap-3">
                    {/* Status Indicator Dot */}
                    <span className="w-2 h-2 rounded-full bg-emerald-400 group-hover:shadow-[0_0_8px_3px_rgba(52,211,153,0.3)] transition-all duration-300"/>
                    {/* Job Description */}
                    <span className="text-sm text-white/80">
                        Process Engineering at {" "}
                        <a href="https://www.shl-medical.com/" 
                           className="hover:text-emerald-400 underline decoration-emerald-400 decoration-2 underline-offset-4 relative z-10">   
                            SHL Medical 
                        </a>
                    </span>
                </li>

                {/* Current Project - Clarity */}
                <li className="group flex items-center gap-3">
                    {/* Status Indicator Dot */}
                    <span className="w-2 h-2 rounded-full bg-violet-300 group-hover:shadow-[0_0_8px_3px_rgba(196,181,253,0.3)] transition-all duration-300"/>
                    {/* Project Description */}
                    <span className="text-sm text-white/80">
                        Self-Learning SWE & Building {" "}
                        <a href="https://www.claritynotes.co/" 
                           className="hover:text-purple-400 underline decoration-purple-400 decoration-2 underline-offset-4 relative z-10">   
                            Clarity 
                        </a>
                    </span>
                </li>

                {/* Future Plans - Gap Year */}
                <li className="group flex items-center gap-3">
                    {/* Status Indicator Dot */}
                    <span className="w-2 h-2 rounded-full bg-yellow-300 group-hover:shadow-[0_0_8px_3px_rgba(253,224,71,0.3)] transition-all duration-300"/>
                    {/* Plan Description */}
                    <span className="text-sm text-white/80">
                        Taking a {" "}
                        <a href="https://www.claritynotes.co/" 
                           className="hover:text-yellow-400 underline decoration-yellow-400 decoration-2 underline-offset-4 relative z-10">   
                            Gap Year from 2025 August
                        </a>
                    </span>
                </li>
            </ul>
        </div>
     );
}


