import React, { useEffect, useState } from "react";
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
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Apply dark mode to <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

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
    <div
      className="min-h-screen bg-cover bg-center bg-fixed dark:bg-[#0b0b0b] transition-colors duration-500"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/736x/cf/ba/5e/cfba5e4691a171b450dfd59adc4a5d59.jpg')",
      }}
    >
      <RainThunder />
      <div className="min-h-screen relative z-10 overflow-x-hidden bg-black/60 dark:bg-black/80 text-white dark:text-gray-200 transition-colors duration-500">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

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