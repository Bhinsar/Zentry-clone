import React, { useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";

const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");

  const itemRef = useRef(null);

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const rotateX = ((clientY - centerY) / height) * 10;
    const rotateY = ((clientX - centerX) / width) * 10;
    setTransformStyle(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
    );
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`bento-tilt ${className}`}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

const BentoCard = ({ src, title, description }) => {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="relative size-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        className="absolute left-0 top-0 size-full object-cover object-center"
      />

      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Features() {
  return (
    <section className="bg-black pb-52">
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32">
          <p className="font-circular-web text-lg text-blue-50">
            Into the Metagame Layer
          </p>
          <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
            Immerse yourself in an IP-rich product universe where players,
            agentic AI and blockchain lead the new economic paradigm.
          </p>
        </div>
        <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
          <div
            className="relative size-full"
          >
            <video
              src="videos/feature-1.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="absolute left-0 top-0 size-full object-cover object-center"
            />

            <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
              <div>
                <h1 className="bento-title special-font">radia<b>n</b>t</h1>
                <p className="mt-3 max-w-64 text-xs md:text-base">
                  The game of games app transforming moments across Web2 & Web3
                  titles into rewards
                </p>
              </div>
            </div>
          </div>
        </BentoTilt>
        <div className="grid h-[135vh] grid-cols-2 grid-rows-3 gap-7">
          <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
            <BentoCard
              src="videos/feature-2.mp4"
              title={
                <>
                  zig<b>m</b>a
                </>
              }
              description="The NFT collection merging Zentry's IP, Al, and gaming— pushing the boundaries of NFT innovation."
            />
          </BentoTilt>
          <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
            <BentoCard
              src="videos/feature-3.mp4"
              title={
                <>
                  N<b>E</b>XUS
                </>
              }
              description="The metagame portal uniting humans & Al to play, compete and earn,"
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 row-span-1 me-32 md:col-span-1 md:me-0">
            <BentoCard
              src="videos/feature-4.mp4"
              title={
                <>
                  AZ<b>U</b>L
                </>
              }
              description="The agent of agents elevating agentic Al experience to be more fun and productive."
            />
          </BentoTilt>
          <BentoTilt className="bento-tilt_2">
            <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
              <h1 className="bento-title special-font max-w-64 text-black">
                M<b>o</b>re Co<b>m</b>ing So<b>o</b>n!
              </h1>
              <TiLocationArrow className="m-5 scale-[5] self-end" size={20} />
            </div>
          </BentoTilt>
          <BentoTilt className="bento-tilt_2">
            <video
              src="videos/feature-5.mp4"
              autoPlay
              muted
              loop
              className=" size-full object-cover object-center"
            />
          </BentoTilt>
        </div>
      </div>
    </section>
  );
}
