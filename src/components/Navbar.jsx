import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [showNavbar, setShowNavbar] = useState(true);

    // Detect scroll direction
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > scrollY && window.scrollY > 50) {
                // Scrolling down
                setShowNavbar(false);
            } else {
                // Scrolling up
                setShowNavbar(true);
            }
            setScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [scrollY]);

    const menuItems = ["home", "skills", "about","blog", "projects", "contact"];

    return (
        <nav
            className={`fixed top-0 w-full z-50 backdrop-blur-lg bg-black/40 text-white transition-transform duration-500 ease-in-out ${showNavbar ? "translate-y-0 shadow-lg" : "-translate-y-full"
                }`}
        >
            <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
                {/* Logo */}
                <h1 className="font-bold text-xl tracking-widest">HOUN</h1>

                {/* Desktop Links */}
                <div className="hidden md:flex space-x-6 text-sm uppercase">
                    {menuItems.map((item, index) => (
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
                className={`md:hidden w-full absolute top-full left-0 overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-screen py-4" : "max-h-0"
                    }`}
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
