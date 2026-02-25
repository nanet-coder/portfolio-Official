import { useEffect, useRef, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Skills() {
    const [skills, setSkills] = useState([]);
    const containerRef = useRef(null);
    const rowRef = useRef(null);
    const [centerDesktop, setCenterDesktop] = useState(false);

    // Fetch skills from Supabase
    useEffect(() => {
        const fetchSkills = async () => {
            const { data, error } = await supabase
                .from("skills")
                .select("name, rating, icon_url")
                .order("id", { ascending: true });

            if (!error) setSkills(data || []);
        };
        fetchSkills();
    }, []);

    // Check if row should be centered (desktop)
    useEffect(() => {
        const checkCenter = () => {
            if (!containerRef.current || !rowRef.current) return;
            const isDesktop = window.innerWidth >= 1024;
            if (!isDesktop) {
                setCenterDesktop(false);
                return;
            }
            const containerWidth = containerRef.current.offsetWidth;
            const rowWidth = rowRef.current.scrollWidth;
            setCenterDesktop(rowWidth < containerWidth);
        };

        checkCenter();
        window.addEventListener("resize", checkCenter);
        return () => window.removeEventListener("resize", checkCenter);
    }, [skills]);

    // Auto-scroll (horizontal marquee)
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let scrollAmount = 0;
        let direction = 1; // 1 = forward, -1 = backward
        const speed = 0.5; // px per frame

        const animate = () => {
            if (!container) return;
            const maxScroll = container.scrollWidth - container.clientWidth;
            if (scrollAmount >= maxScroll) direction = -1;
            if (scrollAmount <= 0) direction = 1;

            scrollAmount += speed * direction;
            container.scrollLeft = scrollAmount;

            requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    }, [skills]);

    return (
        <section
            id="skills"
            className="py-16 px-4 w-full bg-gray-900 bg-gradient-to-t to-gray-800"
        >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white">
                My Skills
            </h2>

            <div
                ref={containerRef}
                className="overflow-x-auto scrollbar-none max-w-6xl mx-auto "
                data-aos="fade-up" data-aos-delay="200"
            >
                <div
                    ref={rowRef}
                    className={`flex gap-6 py-4 px-4 flex-nowrap ${centerDesktop ? "justify-center inline-flex" : "flex-nowrap"
                        }`}
                >
                    {skills.map((skill, index) => (
                        <div
                            key={index}
                            className="relative flex-shrink-0 w-28 h-32 md:w-32 md:h-36
                         rounded-xl flex flex-col items-center justify-center
                         bg-white/10 backdrop-blur-md text-white
                         cursor-pointer group transition-all duration-500"
                        >
                            <div className="w-12 h-12 md:w-16 md:h-16 mb-2 animate-spin-slow group-hover:scale-110 transition-all duration-500">
                                {skill.icon_url ? (
                                    <img
                                        src={skill.icon_url}
                                        alt={skill.name}
                                        className="w-full h-full object-contain"
                                    />
                                ) : (
                                    <div className="w-full h-full rounded-full bg-gray-700" />
                                )}
                            </div>

                            <span className="text-sm md:text-base font-semibold group-hover:text-amber-400 text-center">
                                {skill.name}
                            </span>

                            <span className="text-xs md:text-sm font-bold text-amber-400 mt-1">
                                {skill.rating}%
                            </span>

                            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[0_0_25px_rgba(251,191,36,0.3)]" />
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spinSlow 12s linear infinite; }
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { scrollbar-width: none; }
      `}</style>
        </section>
    );
}