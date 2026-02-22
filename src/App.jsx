import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

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
  // AOS animations
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
      mirror: true,
      anchorPlacement: "top-bottom",
    });
    AOS.refresh();
  }, []);

  return (
    <div className="relative min-h-screen text-white">
      {/* 1. FIXED BACKGROUND LAYER (Solves iPhone Zoom Issue) */}
      <div
        className="fixed inset-0 z-0 w-full h-full bg-black"
        style={{
          backgroundImage: "url('https://i.pinimg.com/736x/cf/ba/5e/cfba5e4691a171b450dfd59adc4a5d59.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover", // Use "cover" to fill the screen or "contain" to see the whole image
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* 2. OVERLAY LAYER (Darkness filter) */}
      <div className="fixed inset-0 z-[1] bg-black/60 pointer-events-none" />

      {/* 3. CONTENT LAYER */}
      <div className="relative z-10 overflow-x-hidden min-h-screen">
        <RainThunder />
        <Navbar />

        <div data-aos="fade-down" data-aos-delay="100">
          <Hero />
        </div>

        <div data-aos="fade-right" data-aos-delay="200">
          <Skills />
        </div>

        <div data-aos="fade-left" data-aos-delay="300">
          <About />
        </div>

        <div data-aos="fade-up" data-aos-delay="400">
          <Blog />
        </div>

        <Projects />

        <div data-aos="fade-right" data-aos-delay="200">
          <DeveloperBox />
        </div>

        <div data-aos="flip-up" data-aos-delay="600">
          <Contact />
        </div>

        <Footer />
        <ChatBot />
      </div>
    </div>
  );
}

export default App;