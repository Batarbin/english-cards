import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetCategoryCards, GetGameId, GetGameList } from '../../actions/cardGameActions'
import ServerError from '../../app/serverError'
import { RootStore } from '../../app/store'
import LoadingSpinner from '../spinner'
import ResultScreen from './resultScreen'
import ChooseOne from './games/chooseOne'
import WriteIt from './games/writeIt'
import { Zoom } from 'react-awesome-reveal'
import { BackToCategoriesButton } from '../misc/buttons'
import GameHeader from './gameHeader'

interface GameListI {
    title: string
    url: string
    id: number
}

const GameList: FC<GameListI> = ({ title, url, id }) => {
    const dispatch = useDispatch()
    
    return (
        <Zoom>
            <div className="card"
                onClick = {() => dispatch(GetGameId(id))}
            >
                <span className="capitalize">{title}</span>
                <img draggable="false" src={url} alt={title} />
            </div>
        </Zoom>
    )
}

function GameLobby() {
    const dispatch = useDispatch()
    const cardGameState = useSelector((state: RootStore) => state.cardGameState)
    const { categoriesCardList, categoriesCardListLoaded, categoriesCardListLoading, globalCount, gameList, gameId } = cardGameState

    useEffect(() => {
        dispatch(GetCategoryCards())
        dispatch(GetGameList())
    }, [dispatch])

    if (!categoriesCardListLoaded) {
        return <ServerError />
    }
    if(!categoriesCardList || !categoriesCardList.length || categoriesCardListLoading || !gameList || !gameList.length) {
        return <LoadingSpinner />
    }

    if (globalCount === 6) {
        return <ResultScreen />
    }
    if (gameId === 1) {
        return (<>
            <GameHeader keyword="chooseOne" />
            <ChooseOne />
        </>)
    } else if (gameId === 2) {
        return (<>
            <GameHeader keyword="writeIt" />
            <WriteIt />
        </>)
    }

    return (
        <div className="card_table_wrapper card_selection">
            <BackToCategoriesButton />
            <h3>Please, choose game mode</h3>
            <div className="card_table_row"> 
                {gameList.map(games => <GameList key={games.id} {...games}/>)}
            </div>
        </div>
    )
}

export default GameLobby