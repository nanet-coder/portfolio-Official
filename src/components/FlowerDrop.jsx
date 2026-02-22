import { useState, useEffect, useRef } from "react";

// ================= CAMBODIAN FLOWER DROP COMPONENT =================
const FlowerDrop = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const petals = [];
        const maxPetals = 40; // Fewer but more detailed flowers

        const flowerTypes = ["champei", "champa", "jasmine"];

        for (let i = 0; i < maxPetals; i++) {
            petals.push({
                x: Math.random() * width,
                y: Math.random() * height,
                type: flowerTypes[Math.floor(Math.random() * flowerTypes.length)],
                size: Math.random() * 8 + 6,
                speed: Math.random() * 1.2 + 0.5,
                wind: Math.random() * 1 - 0.5,
                rotation: Math.random() * 360,
                rotationSpeed: Math.random() * 2,
            });
        }

        const drawFlower = (ctx, type, size) => {
            if (type === "champei") {
                // Champei: White petals with yellow centers
                for (let i = 0; i < 5; i++) {
                    ctx.rotate((72 * Math.PI) / 180);
                    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
                    ctx.beginPath();
                    ctx.ellipse(size, 0, size, size / 1.5, 0, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.fillStyle = "rgba(255, 215, 0, 0.6)"; // Yellow center
                    ctx.beginPath();
                    ctx.arc(0, 0, size / 3, 0, Math.PI * 2);
                    ctx.fill();
                }
            } else if (type === "champa") {
                // Champa: Long, slender orange/yellow petals
                ctx.fillStyle = "rgba(255, 165, 0, 0.7)";
                for (let i = 0; i < 8; i++) {
                    ctx.rotate((45 * Math.PI) / 180);
                    ctx.beginPath();
                    ctx.ellipse(size * 1.2, 0, size * 1.5, size / 4, 0, 0, Math.PI * 2);
                    ctx.fill();
                }
            } else {
                // Jasmine: Small, pure white clusters
                ctx.fillStyle = "rgba(245, 255, 250, 0.9)";
                for (let i = 0; i < 6; i++) {
                    ctx.rotate((60 * Math.PI) / 180);
                    ctx.beginPath();
                    ctx.arc(size / 1.5, 0, size / 2, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            petals.forEach((p) => {
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                drawFlower(ctx, p.type, p.size);
                ctx.restore();

                p.y += p.speed;
                p.x += p.wind;
                p.rotation += p.rotationSpeed;

                if (p.y > height) {
                    p.y = -50;
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

// ================= HERO SECTION =================
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
            <FlowerDrop />

            {/* SVG Background Curves */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M0 200 C 300 100, 600 300, 1000 200 S 1800 100, 2400 200"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="3"
                    fill="transparent"
                />
            </svg>

            {/* Content */}
            <div className="relative max-w-3xl text-white space-y-6 z-10">
                <h1 className="logo-font text-5xl md:text-6xl font-bold animate-fadeInUp">Hi! Everyone</h1>
                <h2 className="logo-font text-3xl font-bold text-purple-200 animate-fadeInUp delay-100">
                    Welcome to my Portfolio!
                </h2>
                <h3 className="logo-font text-4xl font-bold text-pink-300 animate-fadeInUp delay-200">I'm Sok Lim Houn</h3>

                <p className="text-xl h-8 relative animate-fadeInUp delay-300">
                    <span className="relative z-10 text-cyan-300">
                        {currentText}
                        <span className="border-r-2 border-cyan-300 animate-blink ml-1"></span>
                    </span>
                    <span
                        className="absolute left-0 top-0 w-full h-full blur-xl opacity-30"
                        style={{ background: "linear-gradient(to right, #00fff7, #00c6ff)", WebkitBackgroundClip: "text", color: "transparent" }}
                    >
                        {currentText}
                    </span>
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6 animate-fadeInUp delay-400">
                    <a href="#projects" className="px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition">
                        View Projects
                    </a>
                    <a href="#contact" className="px-6 py-3 border border-white rounded-full hover:bg-white hover:text-black transition">
                        Contact Me
                    </a>
                </div>
            </div>

            <style>{`
                @keyframes blink { 0%, 50%, 100% { opacity: 1; } 25%, 75% { opacity: 0; } }
                .animate-blink { animation: blink 1s step-start infinite; }
                @keyframes fadeInUp { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
                .animate-fadeInUp { animation: fadeInUp 1s ease forwards; }
                .delay-100 { animation-delay: 0.1s; }
                .delay-200 { animation-delay: 0.2s; }
                .delay-300 { animation-delay: 0.3s; }
                .delay-400 { animation-delay: 0.4s; }
            `}</style>
        </section>
    );
}