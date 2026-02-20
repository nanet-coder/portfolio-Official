import {
    SiHtml5, SiCss3, SiJavascript, SiReact, SiTailwindcss,
    SiNodedotjs, SiGit, SiGithub, SiFlutter, SiBootstrap,
    SiMysql, SiSpringboot, SiLaravel, SiPostgresql, SiFigma
} from "react-icons/si";

export default function Skills() {
    const skills = [
        { name: "HTML", icon: <SiHtml5 />, rating: "80%" },
        { name: "CSS", icon: <SiCss3 />, rating: "75%" },
        { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" />, rating: "85%" },
        { name: "React", icon: <SiReact className="text-cyan-400" />, rating: "80%" },
        { name: "Tailwind", icon: <SiTailwindcss className="text-sky-400" />, rating: "70%" },
        { name: "Node.js", icon: <SiNodedotjs className="text-green-500" />, rating: "65%" },
        { name: "Git", icon: <SiGit className="text-red-500" />, rating: "80%" },
        { name: "GitHub", icon: <SiGithub />, rating: "75%" },
        { name: "Flutter", icon: <SiFlutter className="text-blue-400" />, rating: "60%" },
        { name: "Bootstrap", icon: <SiBootstrap className="text-purple-500" />, rating: "70%" },
        { name: "MySQL", icon: <SiMysql className="text-blue-600" />, rating: "75%" },
        { name: "Spring Boot", icon: <SiSpringboot className="text-green-600" />, rating: "65%" },
        { name: "Laravel", icon: <SiLaravel className="text-red-600" />, rating: "60%" },
        { name: "PostgreSQL", icon: <SiPostgresql className="text-indigo-500" />, rating: "70%" },
        { name: "UX/UI", icon: <SiFigma className="text-pink-500" />, rating: "80%" },
    ];

    return (
        <section id="skills" className="py-16 px-4 w-full bg-gray-900">
            <h2 className="text-4xl font-bold text-center mb-12 text-white">
                My Skills
            </h2>

            {/* Scroll */}
            <div className="overflow-x-auto scrollbar-none">
                <div className="flex gap-6 py-4 min-w-max">
                    {skills.map((skill, index) => (
                        <div
                            key={index}
                            className="relative flex-shrink-0 w-28 h-32 md:w-32 md:h-36
                                       rounded-xl flex flex-col items-center justify-center
                                       bg-white/10 backdrop-blur-md
                                       text-white cursor-pointer group
                                       transition-all duration-500"
                        >
                            {/* ICON */}
                            <div
                                className="text-4xl md:text-5xl mb-2
                                           animate-spin-slow
                                           group-hover:hue-rotate-180
                                           group-hover:scale-110
                                           transition-all duration-500"
                            >
                                {skill.icon}
                            </div>

                            {/* NAME */}
                            <span className="text-sm md:text-base font-semibold
                                             group-hover:text-amber-400
                                             transition-colors duration-500">
                                {skill.name}
                            </span>

                            {/* RATING */}
                            <span className="text-xs text-white/70 mt-1
                                             group-hover:text-white
                                             transition-colors duration-500">
                                {skill.rating}
                            </span>

                            {/* GLOW */}
                            <div
                                className="absolute inset-0 rounded-xl opacity-0
                                           group-hover:opacity-100 transition-opacity duration-500
                                           pointer-events-none"
                                style={{
                                    boxShadow: "0 0 25px 6px rgba(255,255,255,0.6)",
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Animations */}
            <style>{`
                @keyframes spinSlow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spinSlow 12s linear infinite;
                }
                .scrollbar-none::-webkit-scrollbar { display: none; }
                .scrollbar-none { scrollbar-width: none; }
            `}</style>
        </section>
    );
}