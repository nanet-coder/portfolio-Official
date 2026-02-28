import { useEffect, useRef, useState } from "react";

// ================= FLOWER DROP COMPONENT =================
const FlowerDrop = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const petals = [];
        const maxPetals = 60; // Adjust for more or fewer flowers

        for (let i = 0; i < maxPetals; i++) {
            petals.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 4 + 3,
                speed: Math.random() * 1.5 + 0.5,
                wind: Math.random() * 1 - 0.5,
                rotation: Math.random() * 360,
                rotationSpeed: Math.random() * 1.5,
                // Soft pinks and purples to match your hero colors
                color: `rgba(${220 + Math.random() * 35}, ${160 + Math.random() * 40}, ${230 + Math.random() * 25}, 0.6)`
            });
        }

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            petals.forEach((p) => {
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);

                ctx.beginPath();
                ctx.fillStyle = p.color;
                // Oval petal shape
                ctx.ellipse(0, 0, p.size, p.size / 1.8, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();

                p.y += p.speed;
                p.x += p.wind;
                p.rotation += p.rotationSpeed;

                if (p.y > height) {
                    p.y = -20;
                    p.x = Math.random() * width;
                }
            });
            requestAnimationFrame(draw);
        };

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", handleResize);
        draw();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
        />
    );
};

// ================= HERO SECTION COMPONENT =================
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
            {/* 1. Falling Flowers Layer */}
            <FlowerDrop />

            {/* 2. Background Curves Layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
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
            </svg>

            {/* 3. Main Content Layer */}
            <div className="relative max-w-3xl text-white space-y-6 z-10">
                <h1 className="logo-font text-5xl md:text-6xl font-bold animate-fadeInUp">Hi! Everyone</h1>
                <h2 className="logo-font text-3xl font-bold text-purple-200 animate-fadeInUp delay-100">
                    Welcome to my Portfolio!
                </h2>
                <h3 className="logo-font text-4xl font-bold text-pink-300 animate-fadeInUp delay-200">I'm Sok Lim Houn</h3>

                {/* Typing text with neon glow */}
                <p className="text-xl h-8 relative animate-fadeInUp delay-300">
                    <span className="relative z-10 text-cyan-300">
                        {currentText}
                        <span className="border-r-2 border-cyan-300 animate-blink ml-1"></span>
                    </span>

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
                        className="relative inline-flex items-center justify-center px-8 py-4 
               bg-transparent hover:bg-gradient-to-r hover:from-amber-300 hover:via-orange-400 hover:to-amber-300 
               bg-[length:200%_auto] bg-left hover:bg-right
               text-amber-500 hover:text-white 
               rounded-md border border-amber-500/30 hover:border-transparent
               overflow-hidden transition-all duration-500 ease-in-out
               hover:shadow-[0_0_30px_rgba(251,191,36,0.4)] 
               group"
                    >
                        {/* The Moving Gradient Snake (Running even before hover) */}
                        <span className="animate-snake"></span>

                        {/* Content */}
                        <span className="relative z-10 font-bold tracking-widest uppercase text-sm">
                            View Project
                        </span>
                    </a>

                    <a
                        href="#contact"
                        className="relative inline-flex items-center justify-center px-8 py-4 
               bg-gradient-to-r from-amber-300 via-orange-400 to-amber-300 
               bg-[length:200%_auto] bg-left hover:bg-right
               text-white rounded-md border-none overflow-hidden 
               transition-all duration-700 ease-in-out
               hover:shadow-[0_0_30px_rgba(251,191,36,0.6)] 
               group"
                    >
                        {/* The Moving Gradient Snake */}
                        <span className="animate-snake"></span>

                        {/* Content */}
                        <span className="relative z-10 font-bold tracking-widest uppercase text-sm">
                            Contact Me
                        </span>
                    </a>
                </div>
            </div>

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