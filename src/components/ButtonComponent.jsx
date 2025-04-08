import React from 'react';

function ButtonComponent(props) {
    return (
        <button id={props.id} className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black ${props.containerClass}`}>{props.leftIcons}
            <span className={'relative incline-flex overflow-hidden font-general text-xs uppercase'}>{props.title}</span>
            {props.rightIcons}
        </button>
    );
}

export default ButtonComponent;