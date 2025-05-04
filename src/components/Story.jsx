import React, { useRef } from "react";
import AnimatedText from "./AnimatedText";
import gsap from "gsap";
import ButtonComponent from "./ButtonComponent";

export default function Story() {
  const frameRef = useRef(null);

  const handleMouseLeave = () => {
    const element = frameRef.current;
    gsap.to(element, {
      duration: 0.5,
      rotationX: 0,
      rotationY: 0,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  };
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;
    const rect = element.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const cneterX = rect.width / 2;
    const cneterY = rect.height / 2;
    const rotateX = ((y - cneterY) / cneterY) * -10;
    const rotateY = ((x - cneterX) / cneterX) * 10;

    gsap.to(element, {
      duration: 0.5,
      rotationX: rotateX,
      rotationY: rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  };
  return (
    <section id="story" className="min-h-dvh w-screen  text-blue-50">
      <div className="flex size-full flex-col items-center py-10 pb-24">
        <p className="font-general text-sm uppercase md:text-[10px]">
          The Multiversal IP world
        </p>
        <div className="relative size-full">
          <AnimatedText
            title="the st<b>o</b>ry of<br/> an hidden real<b>m</b>"
            sectionId="#story"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
          />
          <div className="story-img-container">
            <div className="story-img-mask">
              <div className="story-img-content">
                <img
                  ref={frameRef}
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseLeave}
                  onMouseEnter={handleMouseLeave}
                  onMouseMove={handleMouseMove}
                  src="/img/entrance.webp"
                  alt="story"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="-mt-8 flex w-full justify-center md:-mt-64 md:me-54 md:justify-end">
          <div className="flex h-full w-fit flex-col items-center md:items-start">
            <p className="mt-3 max-w-sm text-center font-circular-web text-violet-50 md:text-start">
              The Open IP Universe The story of a hidden realm Where realms
              converge, lies Zentry and the boundless pillar. Discover its
              secrets and shape your fate amidst infinite opportunities.
            </p>
            <ButtonComponent
            id='realm-button'
              title="discover prologue"
              containerClass="mt-5"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
