import React, { FC, useEffect } from 'react'
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

    useEffect(() => {
        dispatch(GetCardList())
    }, [dispatch])

    if (!cardListLoaded) {
        return <ServerError />
    }
    
    if (!cardList || !cardList.length || cardListLoading) {
        return (
            <LoadingSpinner />
        )
    }
    
    return (
        <div className="card_list_wrapper d-flex flex-column align-items-center justify-content-center">
            <div className="card_list"> 
                <h3 className="text-center">List of cards:</h3>
                <Row className="d-flex align-items-center justify-content-center"> 
                    {cardList.map(item => <CardItem
                        key={item.id}
                        {...item}
                    />)}
                </Row>
            </div>
        </div>
    )
}

export default CardList