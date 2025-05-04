import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionsRef = useRef([]);
  const bodyRef = useRef(null); // Optional: if targeting a wrapper instead of <body>

  const colors = {
    red: "#ef4444",    // Tailwind red-500
    blue: "#3b82f6",   // Tailwind blue-500
    green: "#22c55e"   // Tailwind green-500
  };

  useEffect(() => {
    sectionsRef.current.forEach((section) => {
      const colorKey = section.dataset.color;
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => gsap.to("body", {
          backgroundColor: colors[colorKey],
          duration: 0.5
        }),
        onEnterBack: () => gsap.to("body", {
          backgroundColor: colors[colorKey],
          duration: 0.5
        })
      });
    });

    return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }, []);

  return (
        <section
          data-color={'white'}
          ref={sectionsRef.current}
          className={`h-screen flex items-center justify-center text-4xl font-bold bg-white-500`}
        >
        </section>
      
  );
};

export default Contact;
