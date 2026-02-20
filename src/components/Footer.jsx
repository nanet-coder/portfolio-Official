import { FaGithub, FaLinkedin, FaTwitter, FaMapMarkerAlt } from "react-icons/fa";
import { FaHome, FaCode, FaUser, FaProjectDiagram, FaEnvelope } from "react-icons/fa";

export default function Footer() {
    const links = [
        { name: "home", icon: FaHome },
        { name: "skills", icon: FaCode },
        { name: "about", icon: FaUser },
        { name: "projects", icon: FaProjectDiagram },
        { name: "contact", icon: FaEnvelope },
    ];

    return (
        <footer
            data-aos="fade-right"
            data-aos-delay="500"
            className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-10 px-6"
        >
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 items-start">

                {/* Quick Links */}
                <div className="flex flex-col space-y-3">
                    <h3 className="text-lg font-semibold mb-2 text-amber-400">Quick Links</h3>
                    {links.map((item) => {
                        const Icon = item.icon;
                        return (
                            <a
                                key={item.name}
                                href={`#${item.name}`} // ✅ Correct link
                                className="flex items-center gap-2 hover:text-amber-400 transition-colors duration-300"
                            >
                                <Icon className="text-amber-400" />
                                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                            </a>
                        );
                    })}
                </div>

                {/* Location */}
                <div className="flex flex-col items-center md:items-start space-y-2">
                    <h3 className="text-lg font-semibold mb-2">Location</h3>
                    <div className="flex items-center gap-2 text-gray-400">
                        <FaMapMarkerAlt className="text-amber-400" />
                        <span>St 51, Langka Temple, District Bengkeng, Phnom Penh, Cambodia</span>
                    </div>
                </div>

                {/* Social Icons */}
                <div className="flex flex-col items-center md:items-end space-y-3">
                    <h3 className="text-lg font-semibold mb-2">Follow Me</h3>
                    <div className="flex gap-4 text-2xl">
                        {[FaGithub, FaLinkedin, FaTwitter].map((Icon, idx) => (
                            <a
                                key={idx}
                                href="#" // replace # with your social link
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-amber-400 transition-colors duration-300 transform hover:scale-110"
                            >
                                <Icon />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-700 mt-8"></div>

            {/* Copyright */}
            <p className="text-gray-500 text-sm mt-4 text-center">
                © 2026 My Portfolio. All rights reserved.
            </p>
        </footer>
    );
}