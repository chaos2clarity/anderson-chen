"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Header = () => {
    const pathname = usePathname()
    
    return (
        <header className="fixed w-full bg-white/80 backdrop-blur-sm z-50">
            <nav className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="pixel-text text-md">
                        Anderson C.
                    </Link>
                    
                    <div className="flex gap-6">
                        <Link 
                            href="/pages/about"
                            className={`pixel-text text-sm hover:text-sky-500 transition-colors ${pathname === '/pages/about' ? 'text-sky-500' : ''}`}
                        >
                            About Me 
                        </Link>
                        <Link 
                            href="/pages/projects"
                            className={`pixel-text text-sm hover:text-sky-500 transition-colors ${pathname === '/pages/projects' ? 'text-sky-500' : ''}`}
                        >
                            Arts/Photography
                        </Link>
                        <Link 
                            href="/pages/contact"
                            className={`pixel-text text-sm hover:text-sky-500 transition-colors ${pathname === '/pages/contact' ? 'text-sky-500' : ''}`}
                        >
                            Projects
                        </Link>
                        <Link 
                            href="/pages/blogs"
                            className={`pixel-text text-sm hover:text-sky-500 transition-colors ${pathname === '/pages/blogs' ? 'text-sky-500' : ''}`} 
                        >
                            Blogs
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;