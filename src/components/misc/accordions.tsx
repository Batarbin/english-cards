import React, { FC, useRef, useState } from 'react'
import { CardTableType } from '../../types/cardGameTypes'
import { CardItem } from '../cardCollection'

interface CardCollectionAccordionI {
    title: string
    contentArr: CardTableType
}

export const CardCollectionAccordion: FC<CardCollectionAccordionI> = ({ title, contentArr }) => {
    const [active, setActive] = useState("")
    const [height, setHeight] = useState("0px")
    const [rotate, setRotate] = useState("accordion__icon")
    const divContent = useRef() as React.MutableRefObject<HTMLDivElement>

    function toggleAccordion() {
        setActive(active === "" ? "active" : "")
        if (divContent.current) {
            setHeight(
                active === "active" ? "0px" : `${divContent.current.scrollHeight}px`
            )
        }
        setRotate(
            active === "active" ? "accordion__icon" : "accordion__icon rotate"
        )
    }
    
    return (
        <div className="card_collection_item">
            <div className="category_title" onClick={toggleAccordion}>
                <p className="capitalize">{title}</p>
                <img draggable="false" src="/images/items-down-arrow.png" className={`${rotate}`} alt="Cards toggler" />
            </div>
          <div ref={divContent} style={{ maxHeight: `${height}` }} className="card_collection_item_content" >
            {contentArr.filter((x) => x.type === title)
                .map((x) => (
                    <CardItem key={x.id} {...x} />
                ))
            }
          </div>
        </div>
    )
}