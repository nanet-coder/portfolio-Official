import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import About from "./pages/About";
import Projects from "./pages/Projects"; // Removed AOS wrapper from here
import Contact from "./pages/Contact";
import ChatBot from "./components/ChatBot";
import Skills from "./components/Skills";
import RainThunder from "./components/RainThunder";
import Blob from "./components/Blog";

function App() {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: false,
      mirror: true,
      anchorPlacement: 'top-bottom',
    });
    AOS.refresh();
  }, []);

  return (
    <div
      className="bg-fixed bg-cover bg-center min-h-screen relative"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/736x/cf/ba/5e/cfba5e4691a171b450dfd59adc4a5d59.jpg')",
      }}
    >
      <RainThunder />

      <div className="bg-black/60 min-h-screen text-white relative z-10 overflow-x-hidden">
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
          <Blob />
        </div>

        {/* --- Projects Section: AOS Wrapper Removed --- */}
        <Projects />

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