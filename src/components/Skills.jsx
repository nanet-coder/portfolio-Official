import {
    SiHtml5, SiCss3, SiJavascript, SiReact, SiTailwindcss,
    SiNodedotjs, SiGit, SiGithub, SiFlutter, SiBootstrap,
    SiMysql, SiSpringboot, SiLaravel, SiPostgresql, SiFigma
} from "react-icons/si";

export default function Skills() {
    const skills = [
        { name: "HTML", icon: <SiHtml5 className="w-10 h-10" />, rating: "80%" },
        { name: "CSS", icon: <SiCss3 className="w-10 h-10" />, rating: "75%" },
        { name: "JavaScript", icon: <SiJavascript className="w-10 h-10 text-yellow-400" />, rating: "85%" },
        { name: "React", icon: <SiReact className="w-10 h-10 text-cyan-400" />, rating: "80%" },
        { name: "Tailwind", icon: <SiTailwindcss className="w-10 h-10 text-sky-400" />, rating: "70%" },
        { name: "Node.js", icon: <SiNodedotjs className="w-10 h-10 text-green-500" />, rating: "65%" },
        { name: "Git", icon: <SiGit className="w-10 h-10 text-red-500" />, rating: "80%" },
        { name: "GitHub", icon: <SiGithub className="w-10 h-10" />, rating: "75%" },
        { name: "Flutter", icon: <SiFlutter className="w-10 h-10 text-blue-400" />, rating: "60%" },
        { name: "Bootstrap", icon: <SiBootstrap className="w-10 h-10 text-purple-500" />, rating: "70%" },
        { name: "MySQL", icon: <SiMysql className="w-10 h-10 text-blue-600" />, rating: "75%" },
        { name: "Spring Boot", icon: <SiSpringboot className="w-10 h-10 text-green-600" />, rating: "65%" },
        { name: "Laravel", icon: <SiLaravel className="w-10 h-10 text-red-600" />, rating: "60%" },
        { name: "PostgreSQL", icon: <SiPostgresql className="w-10 h-10 text-indigo-500" />, rating: "70%" },
        { name: "UX/UI", icon: <SiFigma className="w-10 h-10 text-pink-500" />, rating: "80%" },
    ];

    return (
        <section id="skills" className="py-16 px-4 w-full bg-gray-900 bg-gradient-to-t to-gray-800 bg-gray-900 ">
            <h2 className="text-4xl font-bold text-center mb-12 text-white">
                My Skills
            </h2>

            {/* Scrollable container */}
            <div className="overflow-x-auto scrollbar-none">
                <div className="flex gap-6 py-4 min-w-max">
                    {skills.map((skill, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-28 h-28 md:w-32 md:h-32 rounded-xl flex flex-col items-center justify-center text-white cursor-pointer transition-transform duration-500 transform group animate-slideIn"
                            style={{
                                background: "rgba(255,255,255,0.1)",
                                backdropFilter: "blur(10px)",
                                animationDelay: `${index * 0.1}s`,
                            }}
                        >
                            {/* Icon */}
                            <div className="text-4xl mb-2 transition-all duration-500 group-hover:scale-110 group-hover:text-amber-400">
                                {skill.icon}
                            </div>

                            {/* Skill Name */}
                            <span className="text-center text-sm md:text-base font-semibold transition-colors duration-500 group-hover:text-amber-400">
                                {skill.name}
                            </span>

                            {/* Rating */}
                            <span className="text-xs text-white/80 mt-1">{skill.rating}</span>

                            {/* White glow shadow */}
                            <div
                                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{ boxShadow: "0 0 20px 5px rgba(255,255,255,0.6)" }}
                            ></div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes slideIn {
                    0% { opacity: 0; transform: translateX(100px); }
                    100% { opacity: 1; transform: translateX(0); }
                }
                .animate-slideIn {
                    animation: slideIn 0.8s ease forwards;
                }
                .scrollbar-none::-webkit-scrollbar { display: none; }
                .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </section>
    );
}
