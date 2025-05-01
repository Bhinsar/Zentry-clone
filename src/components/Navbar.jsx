import React, { useRef, useState, useEffect } from "react";
import ButtonComponent from "./ButtonComponent.jsx";
import { TiLocationArrow } from "react-icons/ti";
import gsap from "gsap";
import { useWindowScroll } from "react-use";

const NavItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];

const Navbar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [active, setActive] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  const NavContainerRef = useRef(null);
  const audioRef = useRef(null);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
    setIsAudioPlaying((prev) => !prev);
    setActive((prev) => !prev);
  };
  

  const {y: currentY} = useWindowScroll();

  useEffect(()=>{
    if(currentY === 0){
      setIsNavbarVisible(true);
      NavContainerRef.current.classList.remove("floating-nav");
    }else if(currentY > lastScrollY){
      setIsNavbarVisible(false);
      NavContainerRef.current.classList.add("floating-nav");
    }else if(currentY < lastScrollY){
      setIsNavbarVisible(true);
      NavContainerRef.current.classList.add("floating-nav");
    }
    setLastScrollY(currentY);
  },[currentY, lastScrollY])


  useEffect(() => {
    gsap.to(NavContainerRef.current, {
      y: isNavbarVisible ? 0 : -100,
      opacity: isNavbarVisible ? 1 : 0,
      duration: 0.1,
    });
  }, [isNavbarVisible]);  

  return (
    <div
      ref={NavContainerRef}
      className={
        "fixed  inset-x-0 top-4 z-50  h-16 border-none transition duration-700 sm:inset-x-6"
      }
    >
      <header className={"absolute top-1/2 w-full -translate-y-1/2"}>
        <nav className={"flex size-full items-center justify-between p-4"}>
          <div className={"flex items-center gap-7"}>
            <img src={"/img/logo.png"} alt={"logo"} className={"w-10"} />
            <ButtonComponent
              id={"product-button"}
              title={"Product"}
              rightIcon={<TiLocationArrow />}
              containerClass={
                "bg-blue-50 md:flex hidden items-center gap-2 justify-center"
              }
            />
          </div>
          <div className={"flex h-full items-center"}>
            <div className={"hidden md:block"}>
              {NavItems.map((items, index) => (
                <a key={index} className={"nav-hover-btn"}>
                  {items}
                </a>
              ))}
            </div>
            <button
              className="ml-10 flex items-center gap-2 cursor-pointer"
              onClick={toggleAudio}
            >
              <audio
                ref={audioRef}
                src={"/audio/loop.mp3"}
                className="hidden"
                loop
              />
              {[1, 2, 3, 4].map((item, index) => (
                <div
                  key={index}
                  className={`indicator-line ${active ? "active" : ""}`}
                  style={{ animationDelay: `${item * 0.1}s` }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
