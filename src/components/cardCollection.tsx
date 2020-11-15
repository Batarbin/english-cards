import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Card, CardImg, Collapse } from 'reactstrap'
import { GetCollectionList } from '../actions/cardCollectionActions'
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

function CardCollection() {
    const dispatch = useDispatch()
    const cardListState = useSelector((state: RootStore) => state.cardCollectionState)
    const { cardCollection, cardCollectionLoaded, cardCollectionLoading } = cardListState
    const [showScroll, setShowScroll] = useState(false)
    const [togglerId, setTogglerId] = useState('')

    useEffect(() => {
        dispatch(GetCollectionList())
    }, [dispatch])
    useEffect(() => {
        window.addEventListener('scroll', checkScrollTop)
        function checkScrollTop() {
            if (!showScroll && window.pageYOffset > 400) {
                setShowScroll(true)
            } else if (showScroll && window.pageYOffset <= 400) {
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
    function toggle(i: number) {
        const id = String(i)
        if (!togglerId || id !== togglerId) {
            setTogglerId(id)
            window.scrollTo({top: 0, behavior: 'smooth'})
        } else if (togglerId === id) {
            setTogglerId('')
        }
    }

    if (!cardCollectionLoaded) {
        return <ServerError />
    }
    if (!cardCollection || !cardCollection.length || cardCollectionLoading) {
        return (
            <LoadingSpinner />
        )
    }
    const typeArr = Array.from(new Set (cardCollection.map(item => item.type))) // get unique types (categories) from cards
    
    return (
        <div className="card_list">
            <img draggable="false" src="/images/go-to-top-arrow.png" alt="Scroll to top"
                className="scrollTop" 
                onClick={scrollTop} 
                style={{display: showScroll ? 'flex' : 'none'}}
            />
            <h2 className="text-center">Cards collection</h2>
            {typeArr.map((item, i) => {
                return (<div className="card_list_item" key={i}>
                    <div className="category_title"
                        onClick={() => toggle(i)}
                    >
                        <p className="capitalize">{item}</p>
                        <img draggable="false" src="/images/items-down-arrow.png" className={togglerId === String(i) ? 'rotate' : ''} 
                            alt="Cards toggler" />
                    </div>
                    <Collapse isOpen={togglerId === String(i)}>
                        <Row className="d-flex align-items-center justify-content-center" id={`showCardsItem${i}`}>
                            {cardCollection.filter(x => x.type === item)
                                .map(x => <CardItem
                                    key={x.id}
                                    {...x}
                                />)
                            }
                        </Row>
                    </Collapse>
                </div>)
            })}
            
        </div>
    )
}

export default CardCollection