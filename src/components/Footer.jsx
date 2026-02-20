import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-6 px-4 mt-12">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                {/* Links */}
                <div className="flex gap-4">
                    <a href="#home" className="hover:text-gray-400 transition">
                        Home
                    </a>
                    <a href="#skills" className="hover:text-gray-400 transition">
                        Skills
                    </a>
                    <a href="#about" className="hover:text-gray-400 transition">
                        About
                    </a>
                    <a href="#projects" className="hover:text-gray-400 transition">
                        Projects
                    </a>
                    <a href="#contact" className="hover:text-gray-400 transition">
                        Contact
                    </a>
                </div>

                {/* Social Icons */}
                <div className="flex gap-4 text-xl">
                    <a
                        href="https://github.com/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-400 transition"
                    >
                        <FaGithub />
                    </a>
                    <a
                        href="https://linkedin.com/in/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-400 transition"
                    >
                        <FaLinkedin />
                    </a>
                    <a
                        href="https://twitter.com/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-400 transition"
                    >
                        <FaTwitter />
                    </a>
                </div>
            </div>

            {/* Copyright */}
            <p className="text-sm text-gray-400 mt-4 text-center">
                © 2026 My Portfolio. All rights reserved.
            </p>
        </footer>
    );
}
