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
  const [unseenQueue, setUnseenQueue] = useState([]); // ផ្ទុករបស់ថ្មីៗទាំងអស់
  const [currentIndex, setCurrentIndex] = useState(0); // លេខរៀងដែលកំពុងបង្ហាញ

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });

    const fetchAllUpdates = async () => {
      try {
        // ១. ទាញយករបស់ថ្មីបំផុត (៥ ចុងក្រោយ) ពី Table ទាំង ៣
        const [projects, blogs, skills] = await Promise.all([
          supabase.from("projects").select("*").order("created_at", { ascending: false }).limit(5),
          supabase.from("blogs").select("*").order("created_at", { ascending: false }).limit(5),
          supabase.from("skills").select("*").order("created_at", { ascending: false }).limit(5),
        ]);

        // ២. បង្កើត Unique ID (Global ID) ដើម្បីកុំអោយច្រឡំ ID រវាង Table
        let allRecent = [
          ...(projects.data || []).map(i => ({ ...i, type: "Project", gId: `p_${i.id}` })),
          ...(blogs.data || []).map(i => ({ ...i, type: "Blog Post", gId: `b_${i.id}` })),
          ...(skills.data || []).map(i => ({ ...i, type: "Skill", gId: `s_${i.id}` }))
        ];

        // ៣. ឆែកមើលក្នុង LocalStorage ថាធ្លាប់ឃើញ ID ទាំងនេះឬនៅ?
        const seenIds = JSON.parse(localStorage.getItem("seen_updates_list") || "[]");

        // ៤. ចម្រាញ់យកតែរបស់ដែលមិនទាន់បានឃើញ (Unseen)
        const newItems = allRecent.filter(item => !seenIds.includes(item.gId));

        if (newItems.length > 0) {
          // តម្រៀបតាមថ្ងៃខែ (ថ្មីបំផុតនៅមុន)
          newItems.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

          setUnseenQueue(newItems);
          // បង្ហាញ Popup បន្ទាប់ពី ២ វិនាទី
          setTimeout(() => setShowPopup(true), 2000);
        }
      } catch (err) {
        console.error("Error fetching updates:", err);
      }
    };

    fetchAllUpdates();
  }, []);

  // មុខងារពេលចុច "បន្ទាប់" ឬ "យល់ព្រម"
  const handleNext = () => {
    const currentItem = unseenQueue[currentIndex];

    // រក្សាទុក ID ចូល LocalStorage ដើម្បីកុំអោយលោតមកទៀតលើកក្រោយ
    const seenIds = JSON.parse(localStorage.getItem("seen_updates_list") || "[]");
    if (!seenIds.includes(currentItem.gId)) {
      seenIds.push(currentItem.gId);
      localStorage.setItem("seen_updates_list", JSON.stringify(seenIds));
    }

    if (currentIndex < unseenQueue.length - 1) {
      setCurrentIndex(prev => prev + 1); // ទៅរបស់បន្ទាប់
    } else {
      setShowPopup(false); // បិទ Popup តែម្តង
      setUnseenQueue([]);
    }
  };

  // មុខងារចុចខ្វែង (Skip All)
  const skipAll = () => {
    const seenIds = JSON.parse(localStorage.getItem("seen_updates_list") || "[]");
    const newIds = unseenQueue.map(item => item.gId);
    const updatedSeen = [...new Set([...seenIds, ...newIds])];

    localStorage.setItem("seen_updates_list", JSON.stringify(updatedSeen));
    setShowPopup(false);
  };

  const currentUpdate = unseenQueue[currentIndex];

  return (
    <div className="relative min-h-screen text-white bg-black font-sans">

      {/* --- POPUP បង្ហាញរបស់ថ្មីៗ (QUEUE) --- */}
      {showPopup && currentUpdate && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div
            key={currentUpdate.gId} // បង្ខំអោយ React Re-render Animation ពេលដូរ Item
            data-aos="zoom-in"
            className="relative w-full max-w-sm p-8 bg-zinc-900 border-2 border-yellow-500 rounded-3xl shadow-[0_0_50px_rgba(234,179,8,0.3)] text-center"
          >
            {/* បង្ហាញចំនួនរបស់ថ្មី */}
            <div className="absolute top-4 left-6 text-[10px] text-yellow-500 font-mono tracking-widest opacity-70">
              NEW {currentIndex + 1} / {unseenQueue.length}
            </div>

            <button onClick={skipAll} className="absolute top-4 right-6 text-2xl text-gray-500 hover:text-white transition-colors">&times;</button>

            <div className="text-6xl mb-4 mt-2">🔔</div>
            <h2 className="text-2xl font-bold text-yellow-500 mb-1">អ្វីដែលទើបបន្ថែម!</h2>
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-4 italic">
              ប្រភេទ: {currentUpdate.type}
            </p>

            <p className="text-white font-bold text-xl mb-8 leading-tight min-h-[3rem] flex items-center justify-center">
              "{currentUpdate.title || currentUpdate.name}"
            </p>

            <div className="space-y-3">
              <button
                onClick={() => {
                  if (currentUpdate.link) window.open(currentUpdate.link, "_blank");
                  handleNext();
                }}
                className="w-full py-3 bg-yellow-500 text-black font-extrabold rounded-xl hover:bg-yellow-400 transition-all active:scale-95 shadow-lg shadow-yellow-500/20"
              >
                ចូលមើលឥឡូវនេះ
              </button>

              <button
                onClick={handleNext}
                className="w-full py-2 text-gray-400 hover:text-white text-sm font-medium transition-all"
              >
                {currentIndex < unseenQueue.length - 1 ? "មើលបន្ទាប់ទៀត ➔" : "យល់ព្រម"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- BACKGROUND LAYER --- */}
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