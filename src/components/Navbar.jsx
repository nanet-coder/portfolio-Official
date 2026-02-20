import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [showNavbar, setShowNavbar] = useState(true);

    const menuItems = ["home", "skills", "about", "blog", "projects", "developer", "contact"];

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > scrollY && window.scrollY > 50) {
                setShowNavbar(false);
            } else {
                setShowNavbar(true);
            }
            setScrollY(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [scrollY]);

    return (
        <nav
            className={`fixed top-0 w-full z-50 backdrop-blur-lg bg-black/40 text-white transition-transform duration-500 ease-in-out ${showNavbar ? "translate-y-0 shadow-lg" : "-translate-y-full"}`}
        >
            <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
                <div className="flex items-center space-x-3">
                    {/* Logo Image with Animated Border & Auto Image Change */}
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-4 border-amber-400 shadow-lg animate-borderColor">
                        <img
                            src="https://i.pinimg.com/736x/70/2e/b3/702eb327186a62e6bfab5be1e40a1b77.jpg"
                            alt="Logo"
                            className="w-full h-full object-cover animate-fade"
                        />
                    </div>

                    {/* Texts */}
                    <div className="flex flex-col">
                        <span className="font-bold italic text-xl tracking-widest text-white hover:text-amber-400 transition-colors duration-500 drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]">
                            HOUN
                        </span>
                        <p className="text-sm text-amber-400">Developer</p>
                    </div>

                    {/* Inline Styles for Animations */}
                    <style>{`
                        /* Border color animation */
                        @keyframes borderColor {
                        0% { border-color: #ff3ca6; }
                        25% { border-color: #ffa500; }
                        50% { border-color: #00ff85; }
                        75% { border-color: #00bfff; }
                        100% { border-color: #ff3ca6; }
                        }
                        .animate-borderColor {
                        animation: borderColor 4s infinite;
                        }

                        /* Fade / auto change images placeholder (simple opacity effect) */
                        @keyframes fade {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0.5; }
                        }
                        .animate-fade {
                        animation: fade 3s infinite alternate;
                        }
                    `}</style>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex space-x-6 text-sm uppercase">
                    {menuItems.map((item) => (
                        <a
                            key={item}
                            href={`#${item}`}
                            className="hover:text-amber-400 transition-colors duration-300"
                        >
                            {item.charAt(0).toUpperCase() + item.slice(1)}
                        </a>
                    ))}
                </div>

                {/* Mobile Hamburger */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-white focus:outline-none"
                    >
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden w-full absolute top-full left-0 overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-screen py-4" : "max-h-0"}`}
                style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(15px)" }}
            >
                <div className="flex flex-col items-center space-y-4 uppercase text-lg text-white">
                    {menuItems.map((item) => (
                        <a
                            key={item}
                            href={`#${item}`}
                            onClick={() => setIsOpen(false)}
                            className="hover:text-amber-400 transition-colors duration-300"
                        >
                            {item.charAt(0).toUpperCase() + item.slice(1)}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
}