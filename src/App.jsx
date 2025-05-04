import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import About from "./components/About";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Features from './components/Features';
import Story from './components/Story';
import Contact from './components/Contact';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const sectionsRef = useRef([]);

  const bgColors = {
    other: "#fff",    // tailwind gray-900
    story: "#000000",    // tailwind gray-900
    contact: "#ecfccb",  // tailwind lime-100
  };

  useEffect(() => {
    const sectionKeys = Object.keys(bgColors);
    sectionKeys.forEach((key, i) => {
      const section = sectionsRef.current[i];
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom en",
        onEnter: () => gsap.to("body", {
          backgroundColor: bgColors[key],
          duration: 0.5
        }),
        onEnterBack: () => gsap.to("body", {
          backgroundColor: bgColors[key],
          duration: 0.5
        }),
      });
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <div ref={el => sectionsRef.current[0] = el}><Features /></div>
      <div ref={el => sectionsRef.current[1] = el}><Story /></div>
      <div ref={el => sectionsRef.current[2] = el}><Contact /></div>
    </main>
  );
}

export default App;
