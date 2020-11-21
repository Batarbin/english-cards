import React, { FC, useRef, useState } from 'react'
import { CardTableType } from '../../types/cardGameTypes'
import { CardItem } from '../cardCollection'

interface CardCollectionAccordionI {
    title: string
    contentArr: CardTableType
}

export const CardCollectionAccordion: FC<CardCollectionAccordionI> = ({ title, contentArr }) => {
    const [setActive, setActiveState] = useState("")
    const [setHeight, setHeightState] = useState("0px")
    const [setRotate, setRotateState] = useState("accordion__icon")

    const divContent = useRef() as React.MutableRefObject<HTMLDivElement>

    function toggleAccordion() {
        setActiveState(setActive === "" ? "active" : "")
        if (divContent.current) {
            setHeightState(
                setActive === "active" ? "0px" : `${divContent.current.scrollHeight}px`
            )
        }
        setRotateState(
            setActive === "active" ? "accordion__icon" : "accordion__icon rotate"
        )
    }
    return (
        <div className="card_collection_item">
            <div className={`category_title ${setActive}`} onClick={toggleAccordion}>
                <p className="capitalize">{title}</p>
                <img draggable="false" src="/images/items-down-arrow.png" className={`${setRotate}`} alt="Cards toggler" />
            </div>
          <div ref={divContent} style={{ maxHeight: `${setHeight}` }} className="card_collection_item_content" >
            {contentArr.filter((x) => x.type === title)
                .map((x) => (
                    <CardItem key={x.id} {...x} />
                ))
            }
          </div>
        </div>
    )
}