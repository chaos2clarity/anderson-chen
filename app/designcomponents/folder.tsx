import React from "react";

interface FolderProps {
  name?: string;
  primaryColor?: string;
  secondaryColor?: string;
  perspective?: number;
}

const Folder: React.FC<FolderProps> = ({
  name = "projects folder",
  primaryColor = "bg-zinc-200",
  secondaryColor = "bg-zinc-100",
  perspective = 1500,
}) => {

  return (
    <section className="relative group flex flex-col items-center justify-center w-full h-full">
      <div className={`file relative w-40 h-28 cursor-pointer origin-bottom [perspective:${perspective}px] z-50`}>
        <div className={`work-5 ${primaryColor} w-full h-full origin-top rounded-2xl rounded-tl-none group-hover:shadow-[0_20px_40px_rgba(0,0,0,.1)] transition-all ease duration-300 relative after:absolute after:content-[''] after:bottom-[99%] after:left-0 after:w-14 after:h-3 after:${primaryColor} after:rounded-t-2xl before:absolute before:content-[''] before:-top-[12px] before:left-[52px] before:w-3 before:h-3 before:${primaryColor} before:[clip-path:polygon(0_35%,0%_100%,50%_100%)]`}></div>
        <div className={`work-4 absolute inset-1 ${secondaryColor} rounded-2xl transition-all ease duration-300 origin-bottom select-none group-hover:[transform:rotateX(-20deg)]`}></div>
        <div className={`work-3 absolute inset-1 bg-zinc-100 rounded-2xl transition-all ease duration-300 origin-bottom group-hover:[transform:rotateX(-30deg)]`}></div>
        <div className={`work-2 absolute inset-1 bg-zinc-50 rounded-2xl transition-all ease duration-300 origin-bottom group-hover:[transform:rotateX(-38deg)]`}></div>
        <div className={`work-1 absolute bottom-0 bg-gradient-to-t from-zinc-200 to-zinc-100 w-full h-[108px] rounded-2xl rounded-tr-none after:absolute after:content-[''] after:bottom-[99%] after:right-0 after:w-[100px] after:h-[12px] after:bg-zinc-100 after:rounded-t-2xl before:absolute before:content-[''] before:-top-[8px] before:right-[96px] before:size-2 before:bg-zinc-100 before:[clip-path:polygon(100%_14%,50%_100%,100%_100%)] transition-all ease duration-300 origin-bottom flex items-end group-hover:shadow-[inset_0_20px_40px_#f4f4f5,_inset_0_-20px_40px_#e4e4e7] group-hover:[transform:rotateX(-46deg)_translateY(1px)]`}></div>
      </div>
      <p className="text-sm pt-4 text-white">{name}</p>
    </section>
  );
};

export default Folder;
