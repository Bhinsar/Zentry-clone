import { useGSAP } from "@gsap/react";
import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import AnimatedText from "./AnimatedText.jsx";
gsap.registerPlugin(ScrollTrigger)

export default function About() {
    useGSAP(()=>{
        const clipAnimation = gsap.timeline({
            scrollTrigger:{
                trigger: "#clip",
                start: 'center center',
                end: '+=800 center',
                scrub:0.5,
                pin:true,
                pinSpacer:true
            }
        })
        clipAnimation.to('.mask-clip-path',({
            width:'100vw',
            height: '100vh',
            borderRadius: 0
        }))
    })
  return (
    <div id="about" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <h2 className="font-general text-sm uppercase md:text-[10px]">
          welcome to zentry
        </h2>
          <AnimatedText title={'Disc<b>o</b>ver the world<br/> l<b>a</b>rgest shared adventure'} conainerClass={'mt-5 !text-black text-center'}/>

        <div className="about-subtext">
          <p>The Metagame begins-your life, now an epic MMORPG</p>
          <p className='text-gray-500'>Zentry is the unified play layer driving attention and contribution Through cross-world AI gamification</p>
        </div>
      </div>
      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image">
            <img
            src="img/about.webp"
            className="absolute left-0 size-full object-cover object-top"
            />
        </div>
      </div>
    </div>
  );
}
