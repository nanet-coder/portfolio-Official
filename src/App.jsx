import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// នាំចូល supabase client
import { supabase } from "./supabaseClient";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import ChatBot from "./components/ChatBot";
import Skills from "./components/Skills";
import RainThunder from "./components/RainThunder";
import Blog from "./components/Blog";
import DeveloperBox from "./components/DeveloperBox";

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [newUpdate, setNewUpdate] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });

    const fetchAllUpdates = async () => {
      try {
        console.log("🔄 កំពុងឆែករករបស់ថ្មីៗពី Blog, Skill និង Project...");

        // ១. ទាញយករបស់ថ្មីបំផុតពី Table ទាំង ៣ ក្នុងពេលតែមួយ
        const [projects, blogs, skills] = await Promise.all([
          supabase.from("projects").select("*").order("created_at", { ascending: false }).limit(1),
          supabase.from("blogs").select("*").order("created_at", { ascending: false }).limit(1),
          supabase.from("skills").select("*").order("created_at", { ascending: false }).limit(1),
        ]);

        // ២. បង្កើត Array មួយដើម្បីប្រមូលផ្ដុំទិន្នន័យ
        const allLatest = [];
        if (projects.data?.[0]) allLatest.push({ ...projects.data[0], type: "Project" });
        if (blogs.data?.[0]) allLatest.push({ ...blogs.data[0], type: "Blog Post" });
        if (skills.data?.[0]) allLatest.push({ ...skills.data[0], type: "Skill" });

        if (allLatest.length === 0) return;

        // ៣. តម្រៀបរករបស់ណាដែលថ្មីបំផុតក្នុងចំណោម Table ទាំង ៣
        const absoluteNewest = allLatest.sort((a, b) =>
          new Date(b.created_at) - new Date(a.created_at)
        )[0];

        // ៤. ឆែកមើលជាមួយ LocalStorage
        const lastSeenUpdateId = localStorage.getItem("last_seen_update_id");

        if (lastSeenUpdateId !== absoluteNewest.id.toString()) {
          setNewUpdate(absoluteNewest);
          setTimeout(() => setShowPopup(true), 2000);
        }
      } catch (err) {
        console.error("Error fetching updates:", err);
      }
    };

    fetchAllUpdates();
  }, []);

  const closePopup = () => {
    if (newUpdate) {
      localStorage.setItem("last_seen_update_id", newUpdate.id);
    }
    setShowPopup(false);
  };

  return (
    <div className="relative min-h-screen text-white bg-black">

      {/* --- POPUP បង្ហាញរបស់ថ្មី --- */}
      {showPopup && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div
            data-aos="zoom-in"
            className="relative w-full max-w-sm p-8 bg-zinc-900 border-2 border-yellow-500 rounded-3xl shadow-[0_0_50px_rgba(234,179,8,0.3)] text-center"
          >
            <button onClick={closePopup} className="absolute top-4 right-6 text-3xl text-gray-500 hover:text-white">&times;</button>

            <div className="text-6xl mb-4">🔔</div>
            <h2 className="text-2xl font-bold text-yellow-500 mb-1">អ្វីដែលទើបបន្ថែម!</h2>
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">ប្រភេទ: {newUpdate?.type}</p>

            <p className="text-white font-bold text-xl mb-6 italic leading-tight">
              "{newUpdate?.title || newUpdate?.name}"
            </p>

            <button
              onClick={() => {
                if (newUpdate?.link) window.open(newUpdate.link, "_blank");
                closePopup();
              }}
              className="w-full py-3 bg-yellow-500 text-black font-extrabold rounded-xl hover:bg-yellow-400 transition-all active:scale-95 shadow-lg shadow-yellow-500/20"
            >
              ចូលមើលឥឡូវនេះ
            </button>
          </div>
        </div>
      )}

      {/* --- BACKGROUND --- */}
      <div className="fixed inset-0 z-0 bg-black" style={{ backgroundImage: "url('https://i.pinimg.com/736x/cf/ba/5e/cfba5e4691a171b450dfd59adc4a5d59.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div className="fixed inset-0 z-[1] bg-black/60 pointer-events-none" />

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 overflow-x-hidden min-h-screen">
        <RainThunder />
        <Navbar />
        <Hero />
        <Skills />
        <About />
        <Blog />
        <Projects />
        <DeveloperBox />
        <Contact />
        <Footer />
        <ChatBot />
      </div>
    </div>
  );
}

export default App;