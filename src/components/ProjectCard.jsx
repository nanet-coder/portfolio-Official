export default function ProjectCard({ project, onOpen, mobile }) {
    return (
        <div
            className={`
                group relative overflow-hidden rounded-3xl bg-white/10 border border-white/20 backdrop-blur
                transition-all duration-500 hover:shadow-2xl hover:shadow-white/20 hover:scale-105
                ${mobile ? "min-w-[90%] snap-center" : "w-full"}
            `}
        >
            {/* IMAGE: using image_url from Supabase */}
            <img
                src={project.image_url}
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
                        className="px-5 py-3 rounded-full text-sm md:text-base font-medium
                            bg-white/20 backdrop-blur hover:bg-white hover:text-black
                            translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100
                            transition-all duration-500 delay-300 shadow-lg"
                    >
                        View Project →
                    </button>
                </div>
            </div>
        </div>
    );
}