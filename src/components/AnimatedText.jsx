import React,{useRef, useEffect} from 'react';
import {gsap} from "gsap";

function AnimatedText(props) {
    const containerRef = useRef(null);
    useEffect(() => {
        const ctx = gsap.context(() => {
            const titleAnimation = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: '100 bottom',
                    end: 'center bottom',
                    scrub: 0.5,
                    toggleActions: 'play none none reverse',
                }
            })
                titleAnimation.to('.animated-word', {
                    opacity: 1,
                    transform: 'translate3d(0px, 0px, 0px) rotateY(0deg) rotateX(0deg)',
                    ease: 'power2.inOut',
                    duration: 0.5,
                    stagger: 0.2
                })
        }, containerRef)
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className={`animated-title ${props.conainerClass}`}>
            {props.title.split('<br/>').map((line, index) => (
                <div key={index} className={'flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3'}>
                    {line.split(' ').map((word, wordIndex) => (
                        <span
                            key={wordIndex}
                            className={`animated-word special-font`}
                            dangerouslySetInnerHTML={{__html: word}}
                        />

                    ))}
                </div>
            ))}
        </div>
    );
}

export default AnimatedText;