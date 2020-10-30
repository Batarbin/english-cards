import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Card, CardImg } from 'reactstrap'
import { Zoom } from 'react-awesome-reveal'
import { GetCategoriesList, GetCategoryCards } from '../actions/cardGameActions'
import { RootStore } from '../app/store'
import LoadingSpinner from './spinner'
import CardTable from './cardTable'

interface CardItemI {
    title: string
    url: string
}

const CategoryItem: FC<CardItemI> = ({ title, url }) => {
    const dispatch = useDispatch()
    return (
        <Zoom>
            <Card body className="text-center justify-content-center pointer"
                onClick = {() => dispatch(GetCategoryCards(title))}
            >
                <span className="capitalize">{title}</span>
                <CardImg draggable="false" src={url} alt={title} />
            </Card>
        </Zoom>
    )
}

function CategoriesList() {
    const dispatch = useDispatch()
    const cardGameState = useSelector((state: RootStore) => state.cardGameState)
    const { categoriesCardsList, categoriesList, chosen } = cardGameState

    useEffect(() => {
        dispatch(GetCategoriesList())
    }, [dispatch])

    if (chosen) {
        if(!categoriesCardsList || !categoriesCardsList.length) {
            return <LoadingSpinner />
        }
        return <CardTable />
    }
    
    if (!categoriesList || !categoriesList.length) {
        return (
            <LoadingSpinner />
        )
    }
    return (
        <div className="cat_cards"> 
            <h3 className="text-center">Please, choose pleasant category</h3>
            <Row> 
                {categoriesList.map(item => <CategoryItem
                    key={item.id}
                    {...item}
                />)}
            </Row>
        </div>
    )
}

export default CategoriesList