import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Zoom } from 'react-awesome-reveal'
import { GetCategoriesList, GetCategoryName } from '../../actions/cardGameActions'
import { RootStore } from '../../app/store'
import LoadingSpinner from '../spinner'
import ServerError from '../../app/serverError'
import GameLobby from './gameLobby'

interface CardItemI {
    title: string
    url: string
}

const CategoryItem: FC<CardItemI> = ({ title, url }) => {
    const dispatch = useDispatch()
    return (
        <Zoom>
            <div className="card"
                onClick = {() => dispatch(GetCategoryName(title))}
            >
                <span className="capitalize">{title}</span>
                <img draggable="false" src={url} alt={title} />
            </div>
        </Zoom>
    )
}

function CategoriesList() {
    const dispatch = useDispatch()
    const cardGameState = useSelector((state: RootStore) => state.cardGameState)
    const { categoriesListLoading, categoriesListLoaded, categoriesList, chosen } = cardGameState

    useEffect(() => {
        dispatch(GetCategoriesList())
    }, [dispatch])

    if (chosen) {
        return <GameLobby />
    }

    if (!categoriesListLoaded) {
        return <ServerError />
    }
    
    if (!categoriesList || !categoriesList.length || categoriesListLoading) {
        return (
            <LoadingSpinner />
        )
    }
    
    return (
        <div className="card_table_wrapper card_selection"> 
            <h3>Please, choose pleasant category</h3>
            <div className="card_table_row"> 
                {categoriesList.map(item => <CategoryItem
                    key={item.id}
                    {...item}
                />)}
            </div>
        </div>
    )
}

export default CategoriesList