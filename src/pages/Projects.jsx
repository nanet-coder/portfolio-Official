import { useEffect, useRef, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import { supabase } from "../supabaseClient";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [openProject, setOpenProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetching, setFetching] = useState(true);
  const modalRef = useRef(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setFetching(true);
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching projects:", error.message);
      } else {
        setProjects(data || []);
      }
      setFetching(false);
    };
    fetchProjects();
  }, []);

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
    return () => window.removeEventListener("keydown", handleEsc);
  }, [openProject]);

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setOpenProject(null);
    }
  };

  if (fetching) return <div className="min-h-screen bg-gray-900" />;

  return (
    /* FIXED: Added relative z-20 to block the rain */
    <section id="projects" className="relative z-20 py-24 px-4 bg-gray-900 text-white overflow-hidden touch-pan-x">
      <div data-aos="zoom-in" data-aos-delay="500">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 
        bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
          Projects
        </h2>

        <div className="md:hidden flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={setOpenProject} mobile />
          ))}
        </div>

        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={setOpenProject} />
          ))}
        </div>
      </div>

      {openProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={handleOutsideClick}>
          <div ref={modalRef} className="bg-gray-900 w-full max-w-6xl h-[85vh] md:h-[90vh] rounded-3xl p-4 md:p-6 relative animate-fadeIn border border-white/10 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl md:text-2xl font-bold truncate pr-4">{openProject.title}</h3>
              <button onClick={() => setOpenProject(null)} className="text-3xl text-white/60 hover:text-white transition-colors">✕</button>
            </div>
            <div className="relative flex-grow rounded-xl overflow-hidden bg-white">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-950">
                  <div className="w-10 h-10 border-4 border-t-white border-white/20 rounded-full animate-spin"></div>
                </div>
              )}
              <iframe src={openProject.project_url} title={openProject.title} className="w-full h-full" onLoad={() => setIsLoading(false)} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}