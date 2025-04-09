import React, {useEffect, useRef, useState} from "react";
import ButtonComponent from "./ButtonComponent.jsx";
import {TiLocationArrow} from "react-icons/ti";
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {

  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadedVideo, setLoadedVideo] = useState(0);

  const totalVideos = 4; // Total number of videos

  const nextVdRef = useRef(null);

  const UpcomingVideoIndex = (currentIndex % totalVideos) + 1;
  const handelVideoLoaded = () => {
    setLoadedVideo((prevIndex) => prevIndex + 1);
  };
  const MiniVideoClick = () => {
    setHasClicked(true);

    setCurrentIndex(UpcomingVideoIndex);
  };

  const getVideoSrc = (index) => `/videos/hero-${index}.mp4`;

  useEffect(()=>{
    if(loadedVideo === totalVideos-1){
      setLoading(false)
    }
  }, [loadedVideo])

  useGSAP(()=>{
    if(hasClicked){
      gsap.set("#next-video", {visibility:"visible"})
      gsap.to('#next-video', {
        transformOrigin: 'center center',
        scale: 1,
        width: '100%',
        height: '100%',
        duration:1,
        ease:'power1.inOut',
        onStart: () => nextVdRef.current.play(),
      })
      gsap.from('#current-video', {
        transformOrigin: 'center center',
        scale: 0,
        duration:1.5,
        ease:'power1.inOut',
      })
    }
  },{dependencies:[currentIndex], revertOnUpdate: true})

  useGSAP(() => {
    gsap.set('#video-frame', {
      clipPath: 'polygon(14% 0, 72% 0, 90% 90%, 0% 100%)',
      borderRadius: '0px 0px 40% 10A'
    });
    gsap.from('#video-frame', {
      clipPath: 'polygon(0% 0, 100% 0, 100% 100%, 0% 100%)',
      borderRadius: '0 0 0 0',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: '#video-frame',
        start: 'center center',
        end: 'bottom center',
        scrub: true,
      },
      duration: 1
    })
  });


  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {loading && (
          <div className={'flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50'}>
            <div className={'three-body'}>
              <div className={'three-body__dot'}></div>
              <div className={'three-body__dot'}></div>
              <div className={'three-body__dot'}></div>
            </div>
          </div>
      )}
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              onClick={MiniVideoClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                ref={nextVdRef}
                src={getVideoSrc(UpcomingVideoIndex)}
                loop
                muted
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center"
                onLoadedData={handelVideoLoaded}
              />
            </div>
          </div>
          <video
            ref={nextVdRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size64 object-cover object-center"
            onLoadedData={handelVideoLoaded}
          />
          <video
            src={getVideoSrc(
              currentIndex === totalVideos - 1 ? 1 : currentIndex
            )}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center "
            onLoadedData={handelVideoLoaded}
          />
        </div>
        <div className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          G<b>a</b>ming
        </div>
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className='mt-24 p-5 sm:px-10'>
            <h1 className='special-font hero-heading text-blue-100'>redefi<b>n</b>e</h1>
            <p className={'m-5 max-w-64 font-robert-regular text-blue-100'}>Enter the Mategame Layer<br/>Unlesh the play Economy</p>
            <ButtonComponent id="watch-trailer" title="Watch Trailer" leftIcons={<TiLocationArrow/>} containerClass="bg-yellow-300 flex-center  gap-1"/>
          </div>
        </div>
      </div>
      <div className="special-font hero-heading absolute bottom-5 right-5 text-black">
        G<b>a</b>ming
      </div>
    </div>
  );
}
