"use client"
import Image from "next/image";

const Heros = () => {
    return ( 
        <section className="min-h-screen">   
            <div className="container mx-auto relative">
                <img 
                    src="/mainisland.png" 
                    alt="island1" 
                    className="w-auto h-auto animate-float-slow" 
                />     
            </div>
        </section>
       
    
     );
}

export default Heros;