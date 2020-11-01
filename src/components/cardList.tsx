import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Card, CardImg } from 'reactstrap'
import { GetCardList } from '../actions/cardListActions'
import ServerError from '../app/serverError'
import { RootStore } from '../app/store'
import LoadingSpinner from './spinner'

interface CardItemI {
    title: string
    url: string
    pronunciation: string
    translation: string
}

const CardItem: FC<CardItemI> = ({ title, url, pronunciation, translation }) => {
    return (
        <Card body className="text-center justify-content-center mb-4">
            <p>{title}</p>
            <CardImg draggable="false" src={url} alt={title} />    
            <p>Pronunciation: '{pronunciation}'</p>
            <p>Translation: {translation}</p>
        </Card>
    )
}

function CardList() {
    const dispatch = useDispatch()
    const cardListState = useSelector((state: RootStore) => state.cardListState)
    const { cardList, cardListLoaded, cardListLoading } = cardListState
    const [showScroll, setShowScroll] = useState(false)

    useEffect(() => {
        dispatch(GetCardList())
    }, [dispatch])
    useEffect(() => {
        window.addEventListener('scroll', checkScrollTop)
        function checkScrollTop() {
            if (!showScroll && window.pageYOffset > 400){
                setShowScroll(true)
            } else if (showScroll && window.pageYOffset <= 400){
                setShowScroll(false)
            }
        }
        return () => {
            window.removeEventListener('scroll', checkScrollTop)
        }
    })
    function scrollTop() {
        window.scrollTo({top: 0, behavior: 'smooth'})
    }

    if (!cardListLoaded) {
        return <ServerError />
    }
    if (!cardList || !cardList.length || cardListLoading) {
        return (
            <LoadingSpinner />
        )
    }
    
    return (
        <div className="card_list d-flex flex-column align-items-center justify-content-center">
            <img draggable="false" src="/images/up-arrow.png" alt="scroll to top"
                className="scrollTop" 
                onClick={scrollTop} 
                style={{display: showScroll ? 'flex' : 'none'}}
            />
            <h3 className="text-center">List of cards:</h3>
            <Row className="d-flex align-items-center justify-content-center"> 
                {cardList.map(item => <CardItem
                    key={item.id}
                    {...item}
                />)}
            </Row>
        </div>
    )
}

export default CardList