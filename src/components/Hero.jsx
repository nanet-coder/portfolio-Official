import { useState, useEffect } from "react";

export default function Hero() {
    const texts = [
        "Frontend Developer",
        "React Enthusiast",
        "Tailwind CSS Designer",
        "Building Modern Web Apps",
    ];

    const [currentText, setCurrentText] = useState("");
    const [textIndex, setTextIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [speed, setSpeed] = useState(150);

    useEffect(() => {
        const type = () => {
            const fullText = texts[textIndex];

            if (isDeleting) {
                setCurrentText(fullText.substring(0, currentText.length - 1));
            } else {
                setCurrentText(fullText.substring(0, currentText.length + 1));
            }

            setSpeed(isDeleting ? 75 : 150);

            if (!isDeleting && currentText === fullText) {
                setTimeout(() => setIsDeleting(true), 1000);
            } else if (isDeleting && currentText === "") {
                setIsDeleting(false);
                setTextIndex((prev) => (prev + 1) % texts.length);
            }
        };

        const timer = setTimeout(type, speed);
        return () => clearTimeout(timer);
    }, [currentText, isDeleting, textIndex]);

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center px-6 text-center overflow-hidden bg-gradient-to-b from-purple-900 via-pink-900 to-gray-800"
        >
            {/* ================= BACKGROUND CURVES ================= */}
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#7f00ff" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#e100ff" stopOpacity="0.2" />
                    </linearGradient>
                </defs>

                <path
                    d="M0 200 C 300 100, 600 300, 1000 200 S 1800 100, 2400 200"
                    stroke="url(#grad)"
                    strokeWidth="3"
                    fill="transparent"
                >
                    <animate
                        attributeName="d"
                        dur="12s"
                        repeatCount="indefinite"
                        values="
              M0 200 C 300 100, 600 300, 1000 200 S 1800 100, 2400 200;
              M0 220 C 300 120, 600 280, 1000 220 S 1800 120, 2400 220;
              M0 200 C 300 100, 600 300, 1000 200 S 1800 100, 2400 200
            "
                    />
                </path>

                <path
                    d="M0 300 C 400 200, 800 400, 1200 300 S 2000 200, 2400 300"
                    stroke="url(#grad)"
                    strokeWidth="2"
                    fill="transparent"
                >
                    <animate
                        attributeName="d"
                        dur="15s"
                        repeatCount="indefinite"
                        values="
              M0 300 C 400 200, 800 400, 1200 300 S 2000 200, 2400 300;
              M0 320 C 400 220, 800 380, 1200 320 S 2000 220, 2400 320;
              M0 300 C 400 200, 800 400, 1200 300 S 2000 200, 2400 300
            "
                    />
                </path>
            </svg>

            {/* ================= CONTENT ================= */}
            <div className="relative max-w-3xl text-white space-y-6 z-10">
                <h1 className="text-5xl md:text-6xl font-bold animate-fadeInUp">Hi! Everyone</h1>
                <h2 className="text-3xl font-bold text-purple-200 animate-fadeInUp delay-100">
                    Welcome to my Portfolio!
                </h2>
                <h3 className="text-4xl font-bold text-pink-300 animate-fadeInUp delay-200">I'm Sok Lim Houn</h3>

                {/* Typing text with neon glow */}
                <p className="text-xl h-8 relative animate-fadeInUp delay-300">
                    <span className="relative z-10 text-cyan-300">
                        {currentText}
                        <span className="border-r-2 border-cyan-300 animate-blink ml-1"></span>
                    </span>

                    {/* Neon glow effect */}
                    <span
                        className="absolute left-0 top-0 w-full h-full blur-xl opacity-50"
                        style={{
                            background: "linear-gradient(to right, #00fff7, #00c6ff, #00fff7)",
                            WebkitBackgroundClip: "text",
                            color: "transparent",
                            mixBlendMode: "screen",
                        }}
                    >
                        {currentText}
                    </span>
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6 animate-fadeInUp delay-400">
                    <a
                        href="#projects"
                        className="px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition"
                    >
                        View Projects
                    </a>

                    <a
                        href="#contact"
                        className="px-6 py-3 border border-white rounded-full hover:bg-white hover:text-black transition"
                    >
                        Contact Me
                    </a>
                </div>
            </div>

            {/* ================= ANIMATIONS ================= */}
            <style>{`
        @keyframes blink {
          0%, 50%, 100% { opacity: 1; }
          25%, 75% { opacity: 0; }
        }
        .animate-blink { animation: blink 1s step-start infinite; }

        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 1s ease forwards; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
      `}</style>
        </section>
    );
}
