import { useEffect, useState, useRef } from "react";

export default function Projects() {
    const projects = [
        {
            title: "Portfolio Website",
            desc: "Personal portfolio built with React and Tailwind CSS",
            img: "https://images.unsplash.com/photo-1605902711622-cfb43c4439b9?auto=format&fit=crop&w=800&q=80",
            url: "https://systemcafe.vercel.app/#",
        },
        {
            title: "Money Saving System",
            desc: "Finance management system with clean UI",
            img: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=800&q=80",
            url: "https://system-my-finance.vercel.app/",
        },
        {
            title: "Social Media UI",
            desc: "Facebook-like frontend interface",
            img: "https://images.unsplash.com/photo-1523475496153-3bcd0fdf7b37?auto=format&fit=crop&w=800&q=80",
            url: "https://webs-lyart-nine.vercel.app/",
        },
        {
            title: "Personal Website",
            desc: "Modern personal website with animations",
            img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
            url: "https://cvpersonal.vercel.app/",
        },
        {
            title: "Blog Platform",
            desc: "Full-stack blog using React and Node.js",
            img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
            url: "https://testapp-nine-black.vercel.app/",
        },
        {
            title: "Personal Blog",
            desc: "Minimal blog with modern UI",
            img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
            url: "https://personal-wine-five.vercel.app/",
        },
    ];

    const [openProject, setOpenProject] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const modalRef = useRef(null);

    // Handle ESC key and Body Scroll Lock
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") setOpenProject(null);
        };

        if (openProject) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleEsc);
            setIsLoading(true);
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            window.removeEventListener("keydown", handleEsc);
        };
    }, [openProject]);

    // Handle clicking outside the modal
    const handleOutsideClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setOpenProject(null);
        }
    };

    return (
        <section
            id="projects"
            className="py-24 px-4 bg-gray-900 text-white overflow-hidden"
        >
            {/* AOS ANIMATED CONTENT CONTAINER */}
            <div data-aos="zoom-in" data-aos-delay="500">
                {/* TITLE */}
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                    Projects
                </h2>

                {/* ===== MOBILE: HORIZONTAL SCROLL ===== */}
                <div className="md:hidden flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={index}
                            project={project}
                            onOpen={setOpenProject}
                            mobile
                        />
                    ))}
                </div>

                {/* ===== DESKTOP: GRID ===== */}
                <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={index}
                            project={project}
                            onOpen={setOpenProject}
                        />
                    ))}
                </div>
            </div>

            {/* ===== MODAL (OUTSIDE AOS CONTAINER) ===== */}
            {openProject && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    onClick={handleOutsideClick}
                >
                    <div
                        ref={modalRef}
                        className="bg-gray-900 w-full max-w-6xl h-[85vh] md:h-[90vh] rounded-3xl p-4 md:p-6 relative animate-fadeIn border border-white/10 flex flex-col"
                    >
                        {/* Header & Close Button */}
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl md:text-2xl font-bold truncate pr-4">
                                {openProject.title}
                            </h3>
                            <button
                                onClick={() => setOpenProject(null)}
                                className="text-3xl text-white/60 hover:text-white transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Iframe & Loader Container */}
                        <div className="relative flex-grow rounded-xl overflow-hidden bg-white">
                            {isLoading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-950">
                                    <div className="w-10 h-10 border-4 border-t-white border-white/20 rounded-full animate-spin"></div>
                                </div>
                            )}
                            <iframe
                                src={openProject.url}
                                title={openProject.title}
                                className="w-full h-full"
                                onLoad={() => setIsLoading(false)}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* ANIMATIONS & STYLES */}
            <style>{`
                .scrollbar-none::-webkit-scrollbar { display: none; }
                .scrollbar-none { scrollbar-width: none; }

                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out forwards;
                }
            `}</style>
        </section>
    );
}

/* ================= PROJECT CARD ================= */
function ProjectCard({ project, onOpen, mobile }) {
    return (
        <div
            className={`
                group relative overflow-hidden rounded-3xl bg-white/10 border border-white/20 backdrop-blur
                transition-all duration-500 hover:shadow-2xl hover:shadow-white/20 hover:scale-105
                ${mobile ? "min-w-[90%] snap-center" : ""}
            `}
        >
            {/* IMAGE */}
            <img
                src={project.img}
                alt={project.title}
                className="w-full h-80 md:h-96 object-cover transition-transform duration-700 group-hover:scale-110 rounded-t-3xl"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-500 rounded-3xl" />

            {/* CONTENT */}
            <div className="absolute inset-0 flex items-end">
                <div className="p-6 w-full">
                    <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white
                        translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                        {project.title}
                    </h3>

                    <p className="text-sm md:text-base text-gray-300 mb-4
                        translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                        {project.desc}
                    </p>

                    <button
                        onClick={() => onOpen(project)}
                        className="
                            px-5 py-3 rounded-full text-sm md:text-base font-medium
                            bg-white/20 backdrop-blur hover:bg-white hover:text-black
                            translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100
                            transition-all duration-500 delay-300
                        "
                    >
                        View Project →
                    </button>
                </div>
            </div>
        </div>
    );
}