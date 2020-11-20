import React, { FC, useEffect, useRef, useState } from 'react'

interface OverlayI {
    regexInfo: string
}

export const InputRegExOverlay: FC<OverlayI> = ({ regexInfo }) => {
    return (
        <div className="regex_overlay">
            <p>Should only contains <span>{regexInfo}</span></p>
        </div>
    )
}

export const AboutDictionaryAPIOverlay: FC = () => {
    const [overlay, setOverlay] = useState(false)
    const overlayImg = useRef() as React.MutableRefObject<HTMLImageElement>
    const overlayDiv = useRef() as React.MutableRefObject<HTMLDivElement>
    const overlayParagraph = useRef() as React.MutableRefObject<HTMLParagraphElement>
    useEffect(() => {
        function handleClickOutside(e: Event) {
            if ((overlayImg.current && !overlayImg.current.contains(e.target as Node)) && 
                (overlayDiv.current && !overlayDiv.current.contains(e.target as Node)) &&
                (overlayParagraph.current && !overlayParagraph.current.contains(e.target as Node)) ) {
                handleOverlay()
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    })
    function handleOverlay() {
        setOverlay(!overlay)
    }

    return (
        <div className="dictionary_overlay" ref={overlayDiv}>
            {overlay && 
                <p ref={overlayParagraph}>
                    Information is displayed using <a rel="noopener noreferrer" target="_blank" href="https://www.wordsapi.com"><strong> WordsAPI</strong></a>
                </p>
            }
            <img draggable="false" ref={overlayImg}
                src="/images/question-mark.png" alt="?" onClick={handleOverlay}/>
        </div>
    )
}