import { useEffect, useRef, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import coffee from "../assets/img/coffee.png";
import ecommerce from "../assets/img/ecommerce.png";
import midEcommerce from "../assets/img/midEcommerce.png";
import money from "../assets/img/money.png";
import per1 from "../assets/img/per1.png";
import per2 from "../assets/img/per2.png";

export default function Projects() {
  const projects = [
    {
      title: "System POS",
      desc: "This for Coffee System POS",
      img: coffee,
      url: "https://systemcafe.vercel.app/#",
    },
    {
      title: "Money Saving System",
      desc: "Finance management system with clean UI",
      img: money,
      url: "https://system-my-finance.vercel.app/",
    },
    {
      title: "Webesite Ecommerce",
      desc: "Ecommerce for buy Clothes",
      img: ecommerce,
      url: "https://webs-lyart-nine.vercel.app/",
    },
    {
      title: "Personal Website",
      desc: "UI Using React with Tailwind",
      img: per1,
      url: "https://cvpersonal.vercel.app/",
    },
    {
      title: "Personal Blog",
      desc: "Frontend blog using React",
      img: midEcommerce,
      url: "https://testapp-nine-black.vercel.app/",
    },
    {
      title: "Personal Portfolio",
      desc: "Modern personal website with animations",
      img: per2,
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

    return () => window.removeEventListener("keydown", handleEsc);
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
      className="py-24 px-4 bg-gray-900 text-white overflow-hidden touch-pan-x"
    >
      {/* TITLE */}
      <div data-aos="zoom-in" data-aos-delay="500">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 
        bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
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

      {/* ===== MODAL ===== */}
      {openProject && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={handleOutsideClick}
        >
          <div
            ref={modalRef}
            className="bg-gray-900 w-full max-w-6xl h-[85vh] md:h-[90vh] rounded-3xl p-4 md:p-6 relative animate-fadeIn border border-white/10 flex flex-col"
          >
            {/* Header & Close */}
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

            {/* Iframe & Loader */}
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

      {/* Styles */}
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