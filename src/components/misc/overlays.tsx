import React, { FC } from "react"

interface OverlayI {
    type: string
    overlayText: string
}

export const Overlay: FC<OverlayI> = ({ type, overlayText }) => {
    if (type === 'regex') {
        return (
            <div className="regex_overlay">
                <p>Should only contains <span>{overlayText}</span></p>
            </div>
        )
    }
    return null
}