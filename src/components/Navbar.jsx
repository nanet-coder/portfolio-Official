import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const [isScrolled, setIsScrolled] = useState(false); // For styling on scroll

    const menuItems = ["home", "skills", "about", "blog", "projects", "developer", "contact"];

    useEffect(() => {
        const handleScroll = () => {
            // 1. Detect if we have scrolled away from the top
            setIsScrolled(window.scrollY > 20);

            // 2. Active Section Detection
            const scrollPosition = window.scrollY + 120;
            menuItems.forEach((item) => {
                const element = document.getElementById(item);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(item);
                    }
                }
            });
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [menuItems]);

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out 
                ${isScrolled
                    ? "backdrop-blur-xl bg-black/80 py-2 shadow-2xl"
                    : "backdrop-blur-md bg-black/40 py-4"
                } text-white`}
        >
            <div className="max-w-6xl mx-auto flex justify-between items-center px-6">
                <div className="flex items-center space-x-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400 shadow-lg animate-borderColor">
                        <img
                            src="https://i.pinimg.com/736x/70/2e/b3/702eb327186a62e6bfab5be1e40a1b77.jpg"
                            alt="Logo"
                            className="w-full h-full object-cover animate-fade"
                        />
                    </div>

                    <div className="flex flex-col">
                        <span className="logo-font font-bold italic text-lg tracking-widest text-white hover:text-amber-400 transition-colors duration-500 drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]">
                            HOUN
                        </span>
                        <p className="text-xs text-amber-400 font-medium">Developer</p>
                    </div>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex space-x-2 text-[12px] uppercase font-bold">
                    {menuItems.map((item) => {
                        const isActive = activeSection === item;

                        return (
                            <a
                                key={item}
                                href={`#${item}`}
                                onClick={() => setActiveSection(item)}
                                className={`relative group px-3 py-2 transition-all duration-300 rounded-md overflow-hidden flex items-center justify-center
                                    ${isActive
                                        ? "bg-gradient-to-r from-amber-300 via-orange-400 to-amber-300 text-white shadow-[0_0_15px_rgba(251,191,36,0.4)]"
                                        : "text-gray-300 hover:text-white"
                                    }`}
                            >
                                {/* The Moving Snake */}
                                <span className={`animate-snake absolute transition-opacity duration-300 pointer-events-none
                                    ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                </span>

                                <span className="relative z-10">{item}</span>
                            </a>
                        );
                    })}
                </div>

                {/* Mobile Hamburger */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-white">
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden w-full absolute top-full left-0 overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-screen py-6 shadow-2xl" : "max-h-0"}`}
                style={{ background: "rgba(0,0,0,0.95)", backdropFilter: "blur(20px)" }}
            >
                <div className="flex flex-col items-center space-y-6 uppercase text-sm font-bold text-white">
                    {menuItems.map((item) => (
                        <a
                            key={item}
                            href={`#${item}`}
                            onClick={() => setIsOpen(false)}
                            className={`transition-colors duration-300 ${activeSection === item ? 'text-amber-400' : 'text-white'}`}
                        >
                            {item}
                        </a>
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes border-trace {
                    0% { offset-distance: 0%; }
                    100% { offset-distance: 100%; }
                }

                .animate-snake {
                    width: 30px;
                    height: 2px;
                    background: linear-gradient(to left, #fff, rgba(255,255,255,0.4), transparent);
                    box-shadow: -4px 0 10px rgba(255, 255, 255, 0.8);
                    offset-path: rect(0% 100% 100% 0% round 6px);
                    offset-rotate: auto;
                    animation: border-trace 2s linear infinite;
                }

                @keyframes borderColor {
                    0% { border-color: #ff3ca6; }
                    25% { border-color: #ffa500; }
                    50% { border-color: #00ff85; }
                    75% { border-color: #00bfff; }
                    100% { border-color: #ff3ca6; }
                }
                .animate-borderColor { animation: borderColor 4s infinite; }

                @keyframes fade {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                .animate-fade { animation: fade 3s infinite alternate; }
            `}</style>
        </nav>
    );
}