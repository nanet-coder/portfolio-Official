import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Skills() {
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        const fetchSkills = async () => {
            const { data, error } = await supabase
                .from("skills")
                .select("name, rating, icon_url")
                .order("id", { ascending: true });

            if (error) {
                console.error("Error:", error.message);
            } else {
                setSkills(data || []);
            }
        };
        fetchSkills();
    }, []);

    return (
        <section id="skills" className="py-16 px-4 w-full bg-gray-900 bg-gradient-to-t to-gray-800" >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white">
                My Skills
            </h2>

            <div className="overflow-x-auto scrollbar-none " data-aos="fade-up" data-aos-delay="200">
                <div className="flex gap-6 py-4 min-w-max px-4">
                    {skills.map((skill, index) => (
                        <div
                            key={index}
                            className="relative flex-shrink-0 w-28 h-32 md:w-32 md:h-36
                                       rounded-xl flex flex-col items-center justify-center
                                       bg-white/10 backdrop-blur-md text-white cursor-pointer group transition-all duration-500"
                        >
                            <div className="w-12 h-12 md:w-16 md:h-16 mb-2 animate-spin-slow group-hover:scale-110 transition-all duration-500">
                                <img
                                    src={skill.icon_url}
                                    alt={skill.name}
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            <span className="text-sm md:text-base font-semibold group-hover:text-amber-400">
                                {skill.name}
                            </span>

                            {/* Logic: skill.rating (89) + % string */}
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